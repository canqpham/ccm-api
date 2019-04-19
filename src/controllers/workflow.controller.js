import WorkflowRepository from '../repositories/workflow.repository'
import {RequestResponse} from '../utils/common'
const workflowRepository = new WorkflowRepository()

class WorkflowController {
  getWorkflow = async (req, res, next) => {
    const {name} = req.body
    try {
      const workflow = await workflowRepository.getWorkflow({name})
      console.log(workflow)
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