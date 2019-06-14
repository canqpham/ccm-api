import IssueRepository from "../repositories/issue.repository";
import AssignIssueRepository from "../repositories/assignIssue.repository";
import WorkflowRepository from "../repositories/workflow.repository";
import UserRepository from "../repositories/user.repository";
import ProjectRepository from "../repositories/project.repository";
import { RequestResponse } from "../utils/common";
import ActivityRepository from "../repositories/activity.repository";
import LabelRepository from "../repositories/label.repository";
import StoryPointRepository from "../repositories/storyPoint.repository";

import helper from "../utils/helper";
import _ from "lodash";
import SprintRepository from "../repositories/sprint.repository";

const issueRepository = new IssueRepository();
const workflowRepository = new WorkflowRepository();
const userRepository = new UserRepository();
const assignIssueRepository = new AssignIssueRepository();
const projectRepository = new ProjectRepository();
const activityRepository = new ActivityRepository();
const sprintRepository = new SprintRepository();
const labelRepository = new LabelRepository();
const storyPointRepository = new StoryPointRepository();


class IssueController {
  create = async (req, res, next) => {
    let data = req.body;
    let userId = req.userId;
    try {
      //handler login
      const user = await userRepository.getUserInfo(userId);
      const project = await projectRepository.getProjectById(data.project);
      if (!project)
        throw new Error("Project is not exist or your project id is invalid.");
      const listIssueCreated = await issueRepository.getListIssueByParams({
        project: data.project
      });
      let issueKey = "";

      //set issue key
      if (!listIssueCreated || _.isEmpty(listIssueCreated)) {
        issueKey = project.key + "-1";
      } else {
        const temp = listIssueCreated[listIssueCreated.length - 1].issueKey;
        issueKey = temp
          ? project.key +
            "-" +
            (Number(_.split(temp, "-")[_.split(temp, "-").length - 1]) + 1)
          : project.key + "-" + (listIssueCreated.length + 1);
      }

      // check user exist
      if (!user) throw new Error("Your account can't create issue.");

      const workflow = await workflowRepository.getWorkflow({ type: "TODO", project: data.project });

      let sprintHistory = data.sprintHistory || []
      if(data.sprint && sprintHistory[sprintHistory.length - 1] != data.sprint) {
        sprintHistory.push(data.sprint)
      }

      data = {
        ...data,
        creator: user._id,
        workflow: workflow._id,
        issueKey,
        sprintHistory
      };

      let issue = await issueRepository.create(data);
      if (!issue) throw new Error("Can't create issue.");

      if(issue.subTaskOfIssue) {
        this.mapSubTaskSprint(issue._id, issue.subTaskOfIssue, null)
      }

      helper.updateProject(data.project);

      if(!_.isEmpty(data.label)) {
        data.label.map( async item => {
          if(item) {
            const isLabelExist = await labelRepository.getLabel({name: item, project: issue.project})
            !isLabelExist && labelRepository.create({name: item, project: issue.project})
          }
        })
      }

      if (Number(data.storyPoints)) {
        const isStoryPointExist = await storyPointRepository.getStoryPoint({point: data.storyPoints, project: data.project})
        !isStoryPointExist && storyPointRepository.create({point: data.storyPoints, project: data.project})
      }

      

      const paramsActivity = {
        issue: issue._id,
        content: `<b>${user.displayName}</b> created issue <b>${issue.issueKey}</b> `
      };
      activityRepository.create(paramsActivity); // create activity

      // _.map(data, async (v, k) => {
      //   switch (k) {
      //     case "sprint":
      //       if (!_.isEmpty(v)) {
      //         const sprint = await sprintRepository.getSprintById(v);
      //         const paramsActivity = {
      //           issue: issue._id,
      //           content: `${user.displayName} updated issue ${
      //             issue.issueKey
      //           } to sprint ${sprint.name}`
      //         };
      //         activityRepository.create(paramsActivity); // create activity
      //       }
      //       break;
      //     default:
      //       break;
      //   }
      // });
      //Initialize token
      // let token = await this._signToken(user)
      return res.json(
        new RequestResponse({
          statusCode: 200,
          data: issue
        })
      );
    } catch (error) {
      res.json(
        new RequestResponse({
          statusCode: 500,
          success: 500,
          error
        })
      );
    }
  };

  getListIssue = async (req, res, next) => {
    // console.log(req)
    const params = req.query;
    const userId = req.userId;
    // console.log(JSON.parse(params.query))
    try {
      const populate = JSON.stringify({
        path: "sprint workflow issueType priority version",
        select: "type iconUrl name level released",
      });
      const paramsQuery = {
        ...params,
        query: params.query || "",
        populate: params.populate || populate,
        pageSize: params.pageSize,
        pageNumber: params.pageNumber || 1
      };
      let [issues, count] = await issueRepository.getListByParams(paramsQuery);
      if (!issues) throw new Error("Can't get all issue");
      return res.json(
        new RequestResponse({
          statusCode: 200,
          data: issues,
          meta: {
            total: count,
            pages: Math.ceil(count / paramsQuery.pageSize),
            pageSize: Number(paramsQuery.pageSize),
            page: Number(paramsQuery.pageNumber)
          }
        })
      );
    } catch (error) {
      return res.json(
        new RequestResponse({
          statusCode: 400,
          succes: false,
          error
        })
      );
    }
  };

  getIssueInfo = async (req, res, next) => {
    const id = req.params.id;
    let userId = req.userId;
    // console.log(req)
    // req.io.on('get_issue', () => {
    //   console.log('issue get info')
    // })
    try {
      let issue = await issueRepository.getIssueInfo(id);
      if (!issue) throw new Error("Issue is not found");
      // let assignIssue = await assignIssueRepository.getListAssignByIssue(id)
      // let assignees = await assignIssue.map(item => _.omit(item.assignee, ['password']))
      // const result = await _.assign({...issue._doc}, {assignees})
      // issue = {
      //   ...issue.toObject(),
      //   assignees
      // }
      return res.json(
        new RequestResponse({
          statusCode: 200,
          data: issue
        })
      );
    } catch (error) {
      return res.json(
        new RequestResponse({
          statusCode: 500,
          success: true,
          error
        })
      );
    }
  };

  update = async (req, res, next) => {
    const data = req.body;
    const id = req.params.id;
    const userId = req.userId;
    try {
      let issue = {}
      if(data.sprint) {
        const issueTemp = await issueRepository.getIssueInfo(id)
        let sprintHistory = issueTemp.sprintHistory || []
        if(sprintHistory[sprintHistory.length - 1] != data.sprint) {
          sprintHistory.push(data.sprint)
          issue = await issueRepository.update(id, {...data, sprintHistory });
        }
      } else {
        issue = await issueRepository.update(id, data);
      }

      const user = await userRepository.getUserInfo(userId);
      // check user exist
      if (!user) throw new Error("Your account can't update this issue.");
      // console.log(issue)
      if (!issue) throw new Error("Can't update issue");

      // map sprint to subtask
      this.mapSubTaskSprint(issue._id, null, issue.sprint)

      if(!_.isEmpty(data.label)) {
        data.label.map( async item => {
          if(item) {
            const isLabelExist = await labelRepository.getLabel({name: item, project: issue.project})
            !isLabelExist && labelRepository.create({name: item, project: issue.project})
          }
        })
      }

      if (Number(data.storyPoints)) {
        const isStoryPointExist = await storyPointRepository.getStoryPoint({point: data.storyPoints, project: data.project})
        !isStoryPointExist && storyPointRepository.create({point: data.storyPoints, project: data.project})
      }

      let element = ''
      if(Object.keys( data ).length == 1) {
        if(Object.keys(data)[0] == 'sprint') {
          element = "sprint of this issue"
        } else {
          element = Object.keys(data)[0]
        }
      } else {
        for ( var property in data ) {

          element = (property != 'closed') && element + `, ${property}`
        }
      }

      if(Object.keys( data ).length >= 1 && Object.keys( data )[0] != 'closed') {
        const paramsActivity = {
          issue: issue._id,
          content: `<b>${user.displayName}</b> updated <b>${element}</b> `
        };
        activityRepository.create(paramsActivity); // create activity
      }

      if(data.closed === true) {
        const paramsActivity = {
          issue: issue._id,
          content: `<b>${user.displayName}</b> closed issue `
        };
        activityRepository.create(paramsActivity); // create activity
      } else if (data.closed === false) {
        const paramsActivity = {
          issue: issue._id,
          content: `<b>${user.displayName}</b> reopen issue `
        };
        activityRepository.create(paramsActivity); // create activity
      }

      helper.updateProject(issue.project);
      return res.json(
        new RequestResponse({
          statusCode: 200,
          data: issue
        })
      );
    } catch (error) {
      return res.json(
        new RequestResponse({
          statusCode: 400,
          success: false,
          error
        })
      );
    }
  };

  mapSubTaskSprint = async (id, subTaskOfIssue, sprintId) => {
    if(subTaskOfIssue) {
      let sprintHistory = []
      const issueTemp = await issueRepository.getIssue({_id: subTaskOfIssue})
      
      sprintHistory.push(issueTemp.sprint)
      await issueRepository.update(id, {sprint: issueTemp.sprint, sprintHistory})
    } else {
      if(id && sprintId) {
        const issues = await issueRepository.getListIssueByParams({subTaskOfIssue: id})
        // console.log(issues)
        issues.map(issue => {
          let sprintHistory = issue.sprintHistory || []
          if(sprintHistory[sprintHistory.length - 1] != sprintId) {
            sprintHistory.push(sprintId)
            issueRepository.update(issue._id, {sprintHistory, sprint: sprintId });
          }
        })
      }
    }
  }

  remove = async (req, res, next) => {
    const id = req.params.id;
    const userId = req.userId;
    try {
      const user = await userRepository.getUserInfo(userId);
      // check user exist
      if (!user) throw new Error("Your account can't update this issue.");

      let issue = issueRepository.remove(id);
      if (!issue) throw new Error("Can't remove issue");

      const paramsActivity = {
        issue: issue._id,
        content: `<b>${user.displayName}</b> delete issue `
      };
      activityRepository.create(paramsActivity); // create activity

      helper.updateProject(issue.project);
      return res.json(
        new RequestResponse({
          statusCode: 200
        })
      );
    } catch (error) {
      return res.json(
        new RequestResponse({
          statusCode: 400,
          succes: false,
          error
        })
      );
    }
  };

  // updateLabel = async (req, res, next) => {
  //   const {label} = req.body
  //   const issueId = req.body.issue
  //   const userId = req.userId
  //   try {
  //     let issue = await issueRepository.update(issueId, {label})
  //     if(!issue) throw new Error("Can't update the label for this issue")
  //     return res.json(new RequestResponse({
  //       statusCode: 200,
  //       data: issue
  //     }))
  //   } catch (error) {
  //     return res.json(new RequestResponse({
  //       statusCode: 400,
  //       succes: false,
  //       error
  //     }))
  //   }
  // }
}

export default IssueController;
