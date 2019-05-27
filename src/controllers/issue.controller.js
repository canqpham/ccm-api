import IssueRepository from '../repositories/issue.repository'
import AssignIssueRepository from '../repositories/assignIssue.repository'
import WorkflowRepository from '../repositories/workflow.repository'
import UserRepository from '../repositories/user.repository'
import ProjectRepository from '../repositories/project.repository'
import { RequestResponse } from '../utils/common'

import helper from '../utils/helper'
import _ from 'lodash'

const issueRepository = new IssueRepository()
const workflowRepository = new WorkflowRepository()
const userRepository = new UserRepository()
const assignIssueRepository = new AssignIssueRepository()
const projectRepository = new ProjectRepository()

class IssueController {
    create = async (req, res, next) => {
        let data = req.body
        let userId = req.userId
        try {
            //handler login
            const user = await userRepository.getUserInfo(userId)
            const project = await projectRepository.getProjectById(data.project)
            if(!project) throw new Error("Project is not exist or your project id is invalid.")
            const listIssueCreated = await issueRepository.getListIssueByParams({project: data.project})
            let issueKey = '';
            console.log("list: ", listIssueCreated)
            if(!listIssueCreated || _.isEmpty(listIssueCreated)) {
              issueKey = project.key + '-1'
            } else {
              const temp = listIssueCreated[listIssueCreated.length - 1].issueKey
              issueKey = temp ? project.key + ' - ' + (Number(_.split(temp, '-')[_.split(temp, '-').length - 1]) + 1) :  project.key + ' - ' + (listIssueCreated.length + 1)
            }
            if(!user) throw new Error("Your account can't create issue.")
            const workflow = await workflowRepository.getWorkflow({name: 'TO DO'})
            data = {
                ...data,
                creator: user.fullName,
                workflow: workflow._id,
                issueKey
            }
            let issue = await issueRepository.create(data)
            if (!issue) throw new Error("Can't create issue.")
            helper.updateProject(data.project)
            //Initialize token
            // let token = await this._signToken(user)
            return res.json(new RequestResponse({
              statusCode: 200,
              data: issue
            }))
          } catch (error) {
            res.json( new RequestResponse({
              statusCode: 500,
              success: 500,
              error
            }))
          }
    }

    getListIssue = async (req, res, next) => {
      // console.log(req)
      const params = req.query
      const userId = req.userId
      // console.log(JSON.parse(params.query))
      try {
        const populate = JSON.stringify({
          path: 'sprint workflow issueType priority',
          select: 'type iconUrl name'
        })
        const paramsQuery = {
          ...params,
          query: params.query || '',
          populate: params.populate || populate,
          pageSize: params.pageSize,
          pageNumber: params.pageNumber || 1,
        }
        let [issues, count] = await issueRepository.getListByParams(paramsQuery)
        if(!issues) throw new Error("Can't get all issue")
        return res.json(new RequestResponse({
          statusCode: 200,
          data: issues,
          meta: {
            total: count,
            pages: Math.ceil(count /  (paramsQuery.pageSize)),
            pageSize:  Number(paramsQuery.pageSize),
            page: Number(paramsQuery.pageNumber)
          }
        }))
      } catch (error) {
        return res.json(new RequestResponse({
          statusCode: 400,
          succes: false,
          error
        }))
      }
    }

    getIssueInfo = async (req, res, next) => {
        const id = req.params.id
        let userId = req.userId
        // console.log(req)
        // req.io.on('get_issue', () => {
        //   console.log('issue get info')
        // })
        try {
          let issue = await issueRepository.getIssueInfo(id)
          if(!issue) throw new Error('Issue is not found')
          let assignIssue = await assignIssueRepository.getListAssignByIssue(id)
          let assignees = await assignIssue.map(item => _.omit(item.assignee, ['password']))
          // const result = await _.assign({...issue._doc}, {assignees})
          // issue = {
          //   ...issue.toObject(),
          //   assignees
          // }
          return res.json(new RequestResponse({
            statusCode: 200,
            data: issue
          }))
        } catch (error) {
          return res.json(new RequestResponse({
            statusCode: 500,
            success: true,
            error
          }))
        }
    }

    update = async (req, res, next) => {
      const data = req.body
      const id = req.params.id
      const userId = req.userId
      try {
        let issue = await issueRepository.update(id, data)
        // console.log(issue)
        if(!issue) throw new Error("Can't update issue")
        helper.updateProject(issue.project)
        return res.json(new RequestResponse({
          statusCode: 200,
          data: issue
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
      const id = req.id
      try {
        let issue = issueRepository.remove(id)
        if(!issue) throw new Error("Can't remove issue")
        helper.updateProject(issue.project)
        return res.json(new RequestResponse({
          statusCode: 200,
        }))
      } catch (error) {
        return res.json(new RequestResponse({
          statusCode: 400,
          succes: false,
          error
        }))
      }
    }

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

export default IssueController