import SprintRepository from "../repositories/sprint.repository";
import IssueRepository from "../repositories/issue.repository";
import WorkflowRepository from "../repositories/workflow.repository";
import ActivityRepository from "../repositories/activity.repository";
import UserRepository from "../repositories/user.repository";
import moment from "moment";

import { RequestResponse } from "../utils/common";
import ProjectRepository from "../repositories/project.repository";
import ProjectMemberRepository from "../repositories/projectMember.repository"

const sprintRepository = new SprintRepository();
const workflowRepository = new WorkflowRepository();
const issueRepository = new IssueRepository();
const projectRepository = new ProjectRepository();
const activityRepository = new ActivityRepository();
const userRepository = new UserRepository();
const projectMemberRepository = new ProjectMemberRepository();

class SprintController {
  constructor() {}

  create = async (req, res, next) => {
    let data = req.body;
    let projectId = req.body.project
    let userId = req.userId;
    try {
      const project = await projectRepository.getProjectById(projectId)
      if(!project) throw new Error("Cannot find project to create new sprint.")
      const isExist = await sprintRepository.getSprintByParams({name: data.name})
      if(isExist) throw new Error("Sprint name already exist !")
      const member = await projectMemberRepository.getByParams({ member: userId, project: data.project })
      if (!member.isSupervise) throw new Error("You don't currently have permission to access this action !");
      const sprint = await sprintRepository.create(data);
      if (!sprint) throw new Error("Can't create sprint");
      return res.json(
        new RequestResponse({
          statusCode: 200,
          data: sprint
        })
      );
    } catch (error) {
      return res.json(
        new RequestResponse({
          success: false,
          statusCode: 400,
          error
        })
      );
    }
  };

  getListAll = async (req, res, next) => {
    let params = req.query;
    let userId = req.userId;
    try {
      const queryParams = JSON.parse(params.query)
      const sprints = await sprintRepository.getListSprintByParams(queryParams);
      if (!sprints) throw new Error("Can't get list sprints");
      return res.json(
        new RequestResponse({
          statusCode: 200,
          data: sprints
        })
      );
    } catch (error) {
      return res.json(
        new RequestResponse({
          success: false,
          statusCode: 400,
          error
        })
      );
    }
  };

  update = async (req, res, next) => {
    let data = req.body;
    let userId = req.userId;
    let id = req.params.id;
    try {
      const member = await projectMemberRepository.getByParams({ member: userId, project: data.project })
      // console.log(member)
      if (!member.isSupervise) throw new Error("You don't currently have permission to access this action !");
      let sprint = await sprintRepository.update(id, data);
      if (!sprint) throw new Error("Can't update project type");

      return res.json(
        new RequestResponse({
          statusCode: 200,
          data: sprint
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

  remove = async (req, res, next) => {
    let id = req.params.id;
    let userId = req.userId;
    try {
      let sprint = await sprintRepository.remove(id);
      if (!sprint) throw new Error("Can't remove sprint");

      return res.json(
        new RequestResponse({
          statusCode: 200
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

  getSprint = async (req, res, next) => {
    // console.log(req)
    let id = req.params.id;
    let userId = req.userId;
    try {
      let sprint = await sprintRepository.getSprintById(id);
      if (!sprint) throw new Error("Can't get sprint");

      return res.json(
        new RequestResponse({
          data: sprint,
          statusCode: 200
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

  getListSprintNotComplete = async (req, res, next) => {
    let params = req.query;
    let userId = req.userId;
    try {
      const queryParams = JSON.parse(params.query)
      // console.log(queryParams)
      
      let sprints = await sprintRepository.getListSprintNotCompleted({...queryParams, completed: false});
      // console.log(sprints)
      if (!sprints) throw new Error("Can't get list sprints");

      return res.json(
        new RequestResponse({
          data: sprints,
          statusCode: 200
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

  addIssueToSprint = async (req, res, next) => {
    const { issue, sprint } = req.body;
    try {
      const is = await issueRepository.update(issue, { sprint });
      console.log(is);
      const result = await sprintRepository.getSprintById(sprint);
      if (!result) throw new Error("Cannot add issue to this sprint");

      return res.json(
        new RequestResponse({
          statusCode: 200,
          data: result
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

  startSprint = async (req, res, next) => {
    const { project, startDate, endDate } = req.body;
    // const data = req.body
    const sprintId = req.body.sprint;
    const userId = req.userId;
    try {
      const member = await projectMemberRepository.getByParams({member: userId, project})
      if(!member.isSupervise) throw new Error("You don't currently have permission to access this action !");
      const sprints = await sprintRepository.getListSprintByParams({ project });
      if (!sprints) throw new Error("Not found sprints of this project !");
      const isExist = await sprints.find(item => item.active == true);
      if (isExist) throw new Error("Have been sprints started !");

      // const issues = await issueRepository.getListIssueByParams({
      //   project,
      //   sprint: sprintId
      // });
      // const workflowTodo = await workflowRepository.getWorkflow({
      //   name: 'TO DO'
      // });
      
      // if(!workflowTodo) throw new Error("Can't add all issues to 'TO DO' board")
      // issues.map(async issue => {
      //   await issueRepository.update(issue._id, { workflow: workflowTodo._id });
      // });
      const sprint = await sprintRepository.update(sprintId, { active: true, startDate, endDate });
      if (!sprint) throw new Error("Can't start sprint");

      return res.json(
        new RequestResponse({
          statusCode: 200,
          data: sprint
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

  moveIssueToNewSprint = async (userId, oldSprint, newSprint) => {
    // console.log('oldSprint: ', oldSprint)
    // console.log('newSprint: ', newSprint)
    const user = await userRepository.getUserInfo(userId);
    const issues = await issueRepository.getListIssueByParams({sprint: oldSprint})
    // console.log(issues)
    issues.map(issue => {
      if(issue.workflow.type != "DONE") {
        let sprintHistory = issue.sprintHistory || []
        sprintHistory.push(newSprint)
        issueRepository.update(issue._id, {sprintHistory, sprint: newSprint });
        const paramsActivity = {
          issue: issue._id,
          content: `<b>${user.displayName}</b> updated <b>sprint of this issue</b> `
        };
        activityRepository.create(paramsActivity);
      }
    })
  }

  completeSprint = async (req, res, next) => {
    const { project, moveToSprint } = req.body;
    const data = req.body;
    const sprintId = req.body.sprint;
    const userId = req.userId;
    try {
      const member = await projectMemberRepository.getByParams({ member: userId, project })
      // console.log(member)
      if (!member.isSupervise) throw new Error("You don't currently have permission to access this action !");
      const sprints = await sprintRepository.getListSprintByParams({ project });
      if (!sprints) throw new Error("Not found sprints of this project");

      const sprint = await sprintRepository.update(sprintId, {...data, completed: true, active:false });
      if (!sprint) throw new Error("Can't start sprint");

      this.moveIssueToNewSprint(userId, sprintId, moveToSprint)

      return res.json(
        new RequestResponse({
          statusCode: 200,
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

  getSprintActive = async (req, res, next) => {
    try {
      const params = req.query
      const query = JSON.parse(params.query)
      const sprint = await sprintRepository.getSprintActiveInProject({...query, active: true })
      if(!sprint) throw new Error("Cannot get sprint is actived.")
      return res.json( new RequestResponse({
        data: sprint,
        statusCode: 200,
      }))
    } catch (error) {
      new RequestResponse({
        statusCode: 400,
        success: false,
        error
      })
    }
  };

  getBoard = async (req, res, next) => {
    try {
      const params = req.query
      const queryParams = JSON.parse(params.query)
      // console.log(req)
      const list = await sprintRepository.getListWorkflowByProject(queryParams.project)
      if(!list) throw new Error("Cannot get list workflow")

      return res.json(new RequestResponse({
        statusCode: 200,
        data: list
      }))
    } catch (error) {
      return res.json(new RequestResponse({
        statusCode: 400,
        success: false,
        error
      }))
    }
  }
}

export default SprintController;
