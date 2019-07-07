import ComponentRepository from '../repositories/component.repository'
import ProjectMemberRepository from "../repositories/projectMember.repository"
import { RequestResponse } from '../utils/common'

const componentRepository = new ComponentRepository()
const projectMemberRepository = new ProjectMemberRepository()

class ComponentController {
  constructor() { }

  create = async (req, res, next) => {
    let data = req.body
    let userId = req.userId
    try {
      const member = await projectMemberRepository.getByParams({ member: userId, project: data.project })
      // console.log(member)
      if (!member.isSupervise) throw new Error("You don't currently have permission to access this action !");
      const component = await componentRepository.create(data)
      if (!component) throw new Error("Can't create project type")
      return res.json(new RequestResponse({
        statusCode: 200,
        data: component
      }))
    } catch (error) {
      return res.json(new RequestResponse({
        success: false,
        statusCode: 400,
        error
      }))
    }
  }

  getListByProject = async (req, res, next) => {
    let userId = req.userId
    try {
      const params = req.query
      const queryParams = JSON.parse(params.query)
      const components = await componentRepository.getListComponentByParams(queryParams)
      if (!components) throw new Error("Can't get list version")
      return res.json(new RequestResponse({
        statusCode: 200,
        data: components
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
      const components = await componentRepository.getListAll()
      if (!components) throw new Error("Can't get list components")
      return res.json(new RequestResponse({
        statusCode: 200,
        data: components
      }))
    } catch (error) {
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
      const member = await projectMemberRepository.getByParams({ member: userId, project: data.project })
      // console.log(member)
      if (!member.isSupervise) throw new Error("You don't currently have permission to access this action !");
      let component = await componentRepository.update(id, data)
      if (!component) throw new Error("Can't update component")

      return res.json(new RequestResponse({
        statusCode: 200,
        data: component
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
      const member = await projectMemberRepository.getByParams({ member: userId, project })
      // console.log(member)
      if (!member.isSupervise) throw new Error("You don't currently have permission to access this action !");
      let component = await componentRepository.remove(id)
      if (!component) throw new Error("Can't remove project type")

      return res.json(new RequestResponse({
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

export default ComponentController