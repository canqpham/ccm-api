import IssueRepository from '../repositories/issue.repository'
import AssignIssueRepository from '../repositories/assignIssue.repository'
import UserRepository from '../repositories/user.repository'
import { RequestResponse } from '../utils/common'

import _ from 'lodash'

const issueRepository = new IssueRepository()
const userRepository = new UserRepository()
const assignIssueRepository = new AssignIssueRepository()
class IssueController {
    create = async (req, res, next) => {
        let data = req.body
        let userId = req.userId

        try {
            //handler login
            const user = await userRepository.getUserInfo(userId)
            if(!user) throw new Error("Your account can't create issue.")
            data = {
                ...data,
                creator: user.fullName,
            }
            let issue = await issueRepository.create(data)
            if (!issue) throw new Error("Can't create issue.")
      
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

    getIssueInfo = async (req, res, next) => {
        const id = req.params.id
        let userId = req.userId
        console.log(req.io)
        req.io.on('get_issue', () => {
          console.log('issue get info')
        })
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
}

export default IssueController