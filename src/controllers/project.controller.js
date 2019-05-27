import ProjectRepository from "../repositories/project.repository";
import ProjectMemberRepository from "../repositories/projectMember.repository";
import GroupRepository from "../repositories/group.repository";
import WorkflowRepository from "../repositories/workflow.repository";
import IssueTypeRepository from "../repositories/issueType.repository";
import UserRepository from "../repositories/user.repository";
import IssueRepository from "../repositories/issue.repository";
import IssueController from "../controllers/issue.controller";
import SrpintRepository from "../repositories/sprint.repository";
import PriorityRepository from "../repositories/priority.repository"

import { RequestResponse } from "../utils/common";

import emailHelper from "../utils/emailHelper";
import _ from "lodash";
import mongoose from "mongoose";
import SprintRepository from "../repositories/sprint.repository";
import VersionRepository from "../repositories/version.repository";

const projectRepository = new ProjectRepository();
const projectMemberRepository = new ProjectMemberRepository();
const userRepository = new UserRepository();
const workflowRepository = new WorkflowRepository();
const issueTypeRepository = new IssueTypeRepository();
const issueRepository = new IssueRepository();
const priorityRepository = new PriorityRepository();
const sprintRepository = new SprintRepository();
const versionRepository = new VersionRepository();
const groupRepository = new GroupRepository();

// const ObjectId = mongoose.Types
class ProjectController {
  create = async (req, res, next) => {
    let data = req.body;
    let userId = req.userId;
    // console.log(req.userId)
    try {
      //handler data
      const isProjectExist = await projectRepository.getProjectByParams({name: data.name})
      if(isProjectExist) throw new Error("The project already exists")
      let key = ''
      let listProjectTextName = _.split(data.name, ' ')
      if(listProjectTextName.length > 1) {
        listProjectTextName.map(item => { 
          if(item) {
            key += _.upperCase(item[0])
          }
        })
      } else if (listProjectTextName.length == 1){
        _.split(data.name, '').map((item, index) => { if(index <=3) key += _.upperCase(item)})
      }
      let projectParams = {
        ...data,
        lead: userId,
        key
      };

      let project = await projectRepository.create(projectParams);
      // let group = await groupRepository.getGroup({level: 0})

      let projectMemberParams = {
        member: userId,
        project: project._id,
        // group: group._id,
        isSuperAdmin: true
      };
      let projectMember = await projectMemberRepository.create(
        projectMemberParams
      );
      if (!projectMember) {
        await projectMemberRepository.remove(project._id);
        throw new Error("Can't create project");
      }

      const workflow = [
        {
          project: project._id,
          name: "TO DO",
          type: "TODO",
          sequence: 1
        },
        {
          project: project._id,
          name: "IN PROGRESS",
          type: "INPROGRESS",
          sequence: 2
        },
        {
          project: project._id,
          name: "DONE",
          type: "DONE",
          sequence: 3
        }
      ];
      workflow.map(async item => {
        await workflowRepository.create(item);
      });

      const issueType = [
        {
          project: project._id,
          type: "Sub Task",
          description: "many words in here",
          iconUrl: "/media/subtask.png"
        },
        {
          project: project._id,
          type: "Story",
          description: "many words in here",
          iconUrl: "/media/story.png"
        },
        {
          project: project._id,
          type: "Bug",
          description: "many words in here",
          iconUrl: "/media/bug.png"
        },
        {
          project: project._id,
          type: "Task",
          description: "many words in here",
          iconUrl: "/media/task.png"
        }
      ];
      let subTaskId;
      issueType.map( async item => {
        if(item.type === 'Sub Task') {
          subTaskId = await issueTypeRepository.create(item)._id;
        } else {
          issueTypeRepository.create({...item, children: [subTaskId]})
        }
      })

      const priority = [
        {
          project: project._id,
          name: "Highest", // very high, high, medium, low
          level: 1, // 0: very high, 1: high, 2: medium, 3: low 
          iconUrl: '/media/highest.svg'
        },
        {
          project: project._id,
          name: "High", // very high, high, medium, low
          level: 2, // 0: very high, 1: high, 2: medium, 3: low 
          iconUrl: '/media/high.svg'
        },
        {
          project: project._id,
          name: "Medium", // very high, high, medium, low
          level: 3, // 0: very high, 1: high, 2: medium, 3: low 
          iconUrl: '/media/medium.svg'
        },
        {
          project: project._id,
          name: "Low", // very high, high, medium, low
          level: 4, // 0: very high, 1: high, 2: medium, 3: low 
          iconUrl: '/media/low.svg'
        },
        {
          project: project._id,
          name: "Lowest", // very high, high, medium, low
          level: 5, // 0: very high, 1: high, 2: medium, 3: low 
          iconUrl: '/media/lowest.svg'
        },
      ]

      priority.map(item => priorityRepository.create(item))

      if (!project) throw new Error("Can't create project");

      //Initialize token
      // let token = await this._signToken(user)
      return res.json(
        new RequestResponse({
          data: project,
          statusCode: 200
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

  getListAllProjectByUserId = async (req, res, next) => {
    let userId = req.userId;
    let params = req.query;
    try {
      //handler
      // console.log(req)

      const paramsQuery = {
        query: JSON.stringify({ member: userId }),
        populate: params.populate || "member project group",
        pageSize: params.pageSize || 10,
        pageNumber: params.pageNumber || 1,
        sort: JSON.stringify({ updatedAt: -1 })
      };
      let [projects, count] = await projectMemberRepository.getListProjectDashboard(
        userId
      );
      if (!projects) throw new Error("Can't get projects");

      return res.json(
        new RequestResponse({
          data: projects,
          statusCode: 200,
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
          success: false,
          statusCode: 200,
          error
        })
      );
    }
  };

  getProjectInfo = async (req, res, next) => {
    let userId = req.userId;
    let projectId = req.params.id;
    try {
      let users = await projectMemberRepository.getListUserByProjectId(
        projectId
      );
      // console.log(typeof userId, '    ' ,users)
      let user = await _.find(
        users,
        item => item.member.toString() == userId.toString()
      );
      // console.log(user)
      if (!user) throw new Error("Can't get project which you don't join");
      let project = await projectRepository.getProjectById(projectId);
      if (!project) throw new Error("Can't get project info");
      return res.json(
        new RequestResponse({
          data: project,
          statusCode: 200
        })
      );
    } catch (error) {
      return res.json(
        new RequestResponse({
          success: false,
          statusCode: 200,
          error
        })
      );
    }
  };

  update = async (req, res, next) => {
    const data = req.body;
    const id = req.params.id;
    try {
      let project = await projectRepository.update(id, data);
      if (!project) throw new Error("Can't update project");
      return res.json(
        new RequestResponse({
          statusCode: 200,
          data: project
        })
      );
    } catch (error) {
      return res.json(
        new RequestResponse({
          success: false,
          statusCode: 200,
          error
        })
      );
    }
  };

  addMemberToProject = async (req, res, next) => {
    try {
      const data = req.body;
      const temp = await projectMemberRepository.getByParams({
        member: data.member,
        project: data.project
      });
      if (temp) throw new Error("Member is exist.");
      let projectMember = await projectMemberRepository.create(data);
      let result = await projectMemberRepository.getByParams({
        _id: projectMember._id
      });
      // console.log(result)
      emailHelper.sendEmailStandard(
        {
          to: result.member.email,
          userName: result.member.displayName,
          subject: "CCM | Notification to add to Project"
        },
        `<h2>Hi ${result.member.fullName}, You are added to project ${
          result.project.name
        } </h2>`
      );
      if (!projectMember) throw new Error("Can't add member to project");
      return res.json(
        new RequestResponse({
          statusCode: 200,
          data: result
        })
      );
    } catch (error) {
      return res.json(
        new RequestResponse({
          success: false,
          statusCode: 200,
          error
        })
      );
    }
  };

  remove = async (req, res, next) => {
    try {
      const userId = req.userId;
      const id = req.params.id;
      // console.log(userId)
      const project = await projectRepository.getProjectByParams({
        _id: id,
        lead: userId
      });
      // console.log(project)
      if (!project)
        throw new Error("User does not have permission to remove project");

      const projectMember = await projectMemberRepository.getListUserByProjectId(
        id
      );
      projectRepository.remove(id) &&
        projectMember.map(item => projectMemberRepository.remove(item._id));

      const projectGroups = await groupRepository.getListByParams({
        project: id
      });
      projectGroups.map(item => groupRepository.remove(item._id));

      const projectWorkflows = await workflowRepository.getListByParams({
        project: id
      });
      projectWorkflows.map(item => workflowRepository.remove(item._id));

      const projectIssueTypes = await issueTypeRepository.getListByParams({
        project: id
      });
      projectIssueTypes.map(item => issueTypeRepository.remove(item._id));

      // const projectIssues = await issueRepository.getListByParams({project: id}) //
      // projectIssues.map(item => issueRepository.remove(item._id))

      const projectSprints = await sprintRepository.getLstByParams({
        project: id
      });
      projectSprints.map(item => sprintRepository.remove(item._id));

      const projectVersions = await versionRepository.getListVersionByParams({
        project: id
      });
      projectVersions.map(item => versionRepository.remove(item._id));

      return res.json(
        new RequestResponse({
          statusCode: 200
        })
      );
    } catch (error) {
      return res.json(
        new RequestResponse({
          success: false,
          statusCode: 200,
          error
        })
      );
    }
  };
}

export default ProjectController;
