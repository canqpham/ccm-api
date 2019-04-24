import WorkflowRepository from '../repositories/workflow.repository'
import ProjectRepository from '../repositories/project.repository'
import {RequestResponse} from '../utils/common'
import IssueRepository from '../repositories/issue.repository';
const workflowRepository = new WorkflowRepository()
const issueRepository = new IssueRepository()
const projectRepository = new ProjectRepository()

class WorkflowController {

  create = async (req, res, next) => {
    const projectId = req.body.project
    const data = req.body
    const userId = req.userId
    try {
      const project = await projectRepository.getProjectByParams({_id: projectId, lead: userId})
      if(!project) throw new Error("User not have permission to create or update workflow.")
      const workflow = await workflowRepository.create(data)
      if(!workflow) throw new Error("Cannot create workflow")

      return res.json(new RequestResponse({
        statusCode: 200,
        data: workflow
      }))
    } catch (error) {
      return res.json(new RequestResponse({
        statusCode: 400,
        success: false,
        error
      }))
    }
  }

  update = async (req, res, next) => {
    try {
      const projectId = req.body.project
      const userId = req.userId
      const id = req.params.id
      const data = req.body

      const project = await projectRepository.getProjectByParams({_id: projectId, lead: userId})
      if(!project) throw new Error("User not have permission to create or update workflow.")

      const workflow = await workflowRepository.update(id, data)
      if(!workflow) throw new Error("Cannot update workflow.")

      return res.json(new RequestResponse({
        statusCode: 200,
        data: workflow
      }))
    } catch (error) {
      return res.json(new RequestResponse({
        statusCode: 400,
        success: false,
        error
      }))
    }
  }

  getListWorkflow = async (req, res, next) => {
    try {
      const project = req.params.project
      const workflow = await workflowRepository.getListByParams({project})
      if(!workflow) throw new Error("Cannot get list workflow")

      return res.json(new RequestResponse({
        statusCode: 200,
        data: workflow
      }))
    } catch (error) {
      return res.json(new RequestResponse({
        statusCode: 400,
        success: false,
        error
      }))
    }
  }

  getWorkflow = async (req, res, next) => {
    const {name} = req.body
    try {
      const workflow = await workflowRepository.getWorkflow({name})
      // console.log(workflow)
      return res.json(new RequestResponse({
        statusCode: 200,
        data: workflow
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
    try {
      const id = req.params.id
      const issues = await issueRepository.getListIssueByParams({workflow: id})
      if(!issues) throw new Error("The workflow cannot be deleted when the issue is still attached")
      const workflow = await workflowRepository.remove(id)
      if(!workflow) throw new Error("Cannot remove this workflow")

      return res.json(new RequestResponse({
        statusCode: 200,
        data: workflow
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

export default WorkflowController