import AssignIssueRepository from "../repositories/assignIssue.repository";
import UserRepository from "../repositories/user.repository";
import ProjectMemberRepository from "../repositories/projectMember.repository";
import emailHelper from '../utils/emailHelper'
import { RequestResponse } from "../utils/common";

const assignIssueRepository = new AssignIssueRepository();
const projectMemberRepository = new ProjectMemberRepository();
// const userRepository = new UserRepository()

class AssignIssueController {
  create = async (req, res, next) => {
    let data = req.body;
    let userId = req.userId;

    try {
      //handler data
      const isProjectExist = await projectMemberRepository.getListUserByProjectId(data.project);
      if (!isProjectExist) throw new Error("Not found project.");

      const isUserExistInProject = await isProjectExist.find(
        item => item.member.toString() == data.assignee
      );
      // console.log(isProjectExist)
      if (!isUserExistInProject)
        throw new Error("Can't assign this account to project.");
      let isAssignExist = await assignIssueRepository.getAssignIssue({issue: data.issue, assignee: data.assignee})
      if(isAssignExist) throw new Error("Member is assigned. Cannot assign again.")
        // console.log(isAssignExist)
      let assignIssue = await assignIssueRepository.create(data);
      if (!assignIssue) throw new Error("Can't assign to issue.");

      const temp = await assignIssueRepository.getAssignIssue({_id: assignIssue._id })
      // console.log(temp.assignee.email)
      emailHelper.sendEmailStandard({to: temp.assignee.email, userName: temp.assignee.displayName, subject: 'Notification to assign task' }, `<h2>Hi ${temp.assignee.fullName}, You are assigned to Task #${temp.issue.issueKey} </h2>`)
      //Initialize token
      // let token = await this._signToken(user)
      return res.json(
        new RequestResponse({
          statusCode: 200,
          data: temp
        })
      );
    } catch (error) {
      res.json(
        new RequestResponse({
          statusCode: 500,
          success: 500,
          error
        })
      );
    }
  };

  remove = async (req, res, next) => {
    try {
      const id = req.params.id
      const temp = await assignIssueRepository.getAssignIssue({_id: id})
      emailHelper.sendEmailStandard(
        {
          to: temp.assignee.email,
          userName: temp.assignee.displayName,
          subject: 'Notification to assign task'
        },
        `<h2>Hi ${temp.assignee.fullName}, You have been removed from the task #${temp.issue.issueKey} </h2>`)
      const assignIssue = await assignIssueRepository.remove(id)
      if(!assignIssue) throw new Error("Cannot remove user from list assignees")
      return res.json( new RequestResponse({
        statusCode: 200,
      }))
    } catch (error) {
      res.json(
        new RequestResponse({
          statusCode: 500,
          success: 500,
          error
        })
      );
    }
  }
}

export default AssignIssueController;
