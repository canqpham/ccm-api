import ProjectRepository from '../repositories/project.repository'
import ProjectMemberRepository from '../repositories/projectMember.repository'
import GroupRepository from '../repositories/group.repository'
import WorkflowRepository from '../repositories/workflow.repository'
import IssueTypeRepository from '../repositories/issueType.repository'
import { RequestResponse } from '../utils/common'
import _ from 'lodash'

const projectRepository = new ProjectRepository();
const projectMemberRepository = new ProjectMemberRepository()
const groupRepository = new GroupRepository()
const workflowRepository = new WorkflowRepository()
const issueTypeRepository = new IssueTypeRepository()

class ProjectController {
  create = async (req, res, next) => {
    let data = req.body
    let userId = req.userId
    // console.log(req.userId)
    try {
      //handler data
      let projectParams = {
        ...data,
        lead: userId
      }

      let project = await projectRepository.create(projectParams)
      // let group = await groupRepository.getGroup({level: 0})

      let projectMemberParams = {
        member: userId,
        project: project._id,
        // group: group._id,
        isSuperAdmin: true,
      }
      let projectMember = await projectMemberRepository.create(projectMemberParams)
      if(!projectMember) {
        await projectMemberRepository.remove(project._id)
        throw new Error("Can't create project")
      }

      const workflow = [
        {
          project: project._id,
          name: "TO DO",
          sequence: 1
        },
        {
          project: project._id,
          name: "IN PROGRESS",
          sequence: 2
        },
        {
          project: project._id,
          name: "DONE",
          sequence: 3
        }
      ];
      workflow.map(async item => {
        await workflowRepository.create(item);
      });

      const issueType = [
        {
          project: project._id,
          type: 'Story',
          description: 'many words in here'
        },
        {
          project: project._id,
          type: 'Bug',
          description: 'many words in here'
        },
        {
          project: project._id,
          type: 'Sub Task',
          description: 'many words in here'
        },
      ]
      issueType.map(item => issueTypeRepository.create(item))

      if (!project) throw new Error("Can't create project")
      
      //Initialize token
      // let token = await this._signToken(user)
      return res.json(new RequestResponse({
        data: project,
        statusCode: 200
      }))
    } catch (error) {
      return res.json(new RequestResponse({
        success: false,
        statusCode: 400,
        error
      }))
    }
  }

  getListAllProjectByUserId = async (req, res, next) => {
    let userId = req.userId
    try {
      //handler
      let projects = await projectMemberRepository.getListByUserId(userId)
      if (!projects) throw new Error("Can't get projects")

      return res.json(new RequestResponse({
        data: projects,
        statusCode: 200
      }))
    } catch (error) {
      return res.json(new RequestResponse({
        success: false,
        statusCode: 200,
        error
      }))
    }
  }

  getProjectInfo = async (req, res, next) => {
    let userId = req.userId
    let projectId = req.params.id
    try {
      let users = await projectMemberRepository.getListUserByProjectId(projectId)
      // console.log(typeof userId, '    ' ,users)
      let user = await _.find(users, item => item.member.toString() == userId.toString())
      // console.log(user)
      if(!user) throw new Error("Can't get project which you don't join")
      let project = await projectRepository.getProjectById(projectId)
      if(!project) throw new Error("Can't get project info")
      return res.json(new RequestResponse({
        data: project,
        statusCode: 200
      }))
    } catch (error) {
      return res.json(new RequestResponse({
        success: false,
        statusCode: 200,
        error
      }))
    }
  }

  update = async (req, res, next) => {
    const data = req.body
    const id = req.params.id
    try {
      let project = await projectRepository.update(id, data)
      if(!project) throw new Error("Can't update project")
      return res.json(new RequestResponse({
        statusCode: 200,
        data: project
      }))
    } catch (error) {
      return res.json(new RequestResponse({
        success: false,
        statusCode: 200,
        error
      }))
    }
  }

}

export default ProjectController
