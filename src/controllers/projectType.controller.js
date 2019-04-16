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

  update = async (req, res, next) => {
        let data = req.body
        let userId = req.userId
        let id = req.params.id
        try {
            let projectType = await projectTypeRepository.update(id, data)
            if(!projectType) throw new Error("Can't update project type")

            return res.json(new RequestResponse({
                statusCode: 200,
                data: projectType
            }))
        } catch (error) {
            return res.json(new RequestResponse({
                statusCode: 400,
                success: false,
                error
            }))
        }
    }

    remove = async (req, res, next) => {
        let id = req.params.id
        let userId = req.userId
        try {
            let projectType = await projectTypeRepository.remove(id)
            if(!projectType) throw new Error("Can't remove project type")

            return res.json(new RequestResponse({
                data: projectType,
                statusCode: 200
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

export default ProjectTypeController