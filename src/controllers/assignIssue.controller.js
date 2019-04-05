import AssignIssueRepository from '../repositories/assignIssue.repository'
import UserRepository from '../repositories/user.repository'
import ProjectMemberRepository from '../repositories/projectMember.repository'
import { RequestResponse } from '../utils/common'

const assignIssueRepository = new AssignIssueRepository()
const projectMemberRepository = new ProjectMemberRepository()
// const userRepository = new UserRepository()

class IssueController {
    create = async (req, res, next) => {
        let data = req.body
        let userId = req.userId

        try {
            //handler data
            const isProjectExist = await projectMemberRepository.getListUserByProjectId(data.project)
            if(!isProjectExist) throw new Error("Not found project.")
            
            const isUserExistInProject = await isProjectExist.find(item => item.member == data.assignee)
            if(!isUserExistInProject) throw new Error("Can't assign this account to project.")

            let assignIssue = await assignIssueRepository.create(data)
            if (!assignIssue) throw new Error("Can't assign to issue.")
      
            //Initialize token
            // let token = await this._signToken(user)
            return res.json(new RequestResponse({
              statusCode: 200,
              data: assignIssue
            }))
          } catch (error) {
            res.json( new RequestResponse({
              statusCode: 500,
              success: 500,
              error
            }))
          }
    }
}

export default IssueController