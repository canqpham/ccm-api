import ProjectTypeRepository from '../repositories/projectType.repository'
import { RequestResponse } from '../utils/common'
const projectTypeRepository = new ProjectTypeRepository

class ProjectTypeController {
  constructor() {}

  create = async (req, res, next) => {
    let data = req.body
    let userId= req.userId
    try {
      const projectType = await projectTypeRepository.create(data)
      if(!projectType) throw new Error("Can't create project type")
      return res.json(new RequestResponse({
        statusCode: 200,
        data: projectType
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
    let userId= req.userId
    try {
      const projectTypes = await projectTypeRepository.getListAll()
      if(!projectTypes) throw new Error("Can't get list project type")
      return res.json(new RequestResponse({
        statusCode: 200,
        data: projectTypes
      }))
    } catch(error) {
      return res.json(new RequestResponse({
        success: false,
        statusCode: 400,
        error
      }))
    }
  }
}

export default ProjectTypeController