import ProjectRepository from '../repositories/project.repository'
import ProjectMemberRepository from '../repositories/projectMember.repository'
import GroupRepository from '../repositories/group.repository'
import { RequestResponse } from '../utils/common'

const projectRepository = new ProjectRepository();
const projectMemberRepository = new ProjectMemberRepository()
const groupRepository = new GroupRepository()

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
      let group = await groupRepository.getGroup({level: 0})

      let projectMemberParams = {
        member: userId,
        project: project._id,
        group: group._id,
        isSuperAdmin: true,
      }
      let projectMember = await projectMemberRepository.create(projectMemberParams)
      if(!projectMember) {
        await projectMemberRepository.remove(project._id)
        throw new Error("Can't create project")
      }
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

  getListAll = async (req, res, next) => {
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
}

export default ProjectController
