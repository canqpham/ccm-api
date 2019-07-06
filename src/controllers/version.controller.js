import VersionRepository from '../repositories/version.repository'
import IssueRepository from '../repositories/issue.repository'
import ActivityRepository from '../repositories/activity.repository'
import UserRepository from "../repositories/user.repository";
import ProjectMemberRepository from "../repositories/projectMember.repository"
import { RequestResponse } from '../utils/common'

const versionRepository = new VersionRepository()
const issueRepository = new IssueRepository()
const activityRepository = new ActivityRepository()
const userRepository = new UserRepository();
const projectMemberRepository = new ProjectMemberRepository();

class VersionController {
  constructor() { }

  createVersion = async (req, res, next) => {
    let data = req.body
    let userId = req.userId
    try {
      const member = await projectMemberRepository.getByParams({ member: userId, project: data.project })
      if (!member.isSupervise) throw new Error("You don't currently have permission to access this action !");
      const version = await versionRepository.create(data)
      if (!version) throw new Error("Can't create new version")
      return res.json(new RequestResponse({
        statusCode: 200,
        data: version
      }))
    } catch (error) {
      return res.json(new RequestResponse({
        success: false,
        statusCode: 400,
        error
      }))
    }
  }

  updateIssueReleaseStatus = async (version, status) => {
    const issues = await issueRepository.getListIssueByParams({ version })
    issues.map(issue => {
      issueRepository.update(issue._id, { released: status })
    })
  }

  release = async (req, res, next) => {
    let userId = req.userId
    let id = req.params.id
    let data = req.body
    try {
      // console.log(data)
      const member = await projectMemberRepository.getByParams({ member: userId, project: data.project })
      if (!member.isSupervise) throw new Error("You don't currently have permission to access this action !");
      const version = await versionRepository.update(id, { released: true, status: "RELEASED", releaser: userId })
      if (!version) throw new Error("Can't create project type")
      this.updateIssueReleaseStatus(id, true)

      return res.json(new RequestResponse({
        statusCode: 200,
        data: version
      }))
    } catch (error) {
      return res.json(new RequestResponse({
        success: false,
        statusCode: 400,
        error
      }))
    }
  }

  unrelease = async (req, res, next) => {
    let userId = req.userId
    let id = req.params.id
    try {
      const version = await versionRepository.update(id, { released: false, status: "UNRELEASED", releaser: userId })
      if (!version) throw new Error("Can't create project type")
      this.updateIssueReleaseStatus(id, false)
      return res.json(new RequestResponse({
        statusCode: 200,
        data: version
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
      const versions = await versionRepository.getListVersionByProject(queryParams.project)
      if (!versions) throw new Error("Can't get list version")
      return res.json(new RequestResponse({
        statusCode: 200,
        data: versions
      }))
    } catch (error) {
      return res.json(new RequestResponse({
        success: false,
        statusCode: 400,
        error
      }))
    }
  }

  getListIssueInVersion = async (req, res, next) => {
    let userId = req.userId
    try {
      const id = req.params.id
      const issues = await versionRepository.getListIssueInVersion(id)
      if (!issues) throw new Error("Can't get list issue")
      return res.json(new RequestResponse({
        statusCode: 200,
        data: issues
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
      const versions = await versionRepository.getListAll()
      if (!versions) throw new Error("Can't get list project type")
      return res.json(new RequestResponse({
        statusCode: 200,
        data: versions
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
      let version = await versionRepository.update(id, data)
      if (!version) throw new Error("Can't update project type")

      return res.json(new RequestResponse({
        statusCode: 200,
        data: version
      }))
    } catch (error) {
      return res.json(new RequestResponse({
        statusCode: 400,
        success: false,
        error
      }))
    }
  }

  mapIssueToNewVersion = async (userId, version, nextVersion) => {
    const user = await userRepository.getUserInfo(userId)
    const issues = await issueRepository.getListIssueByParams({ version })
    // console.log(issues)
    issues.map(issue => {
      issueRepository.update(issue._id, { version: nextVersion })
      const paramsActivity = {
        issue: issue._id,
        content: `<b>${user.displayName}</b> updated  <b>version</b> `
      };
      activityRepository.create(paramsActivity);
    })
  }

  remove = async (req, res, next) => {
    let id = req.params.id
    let userId = req.userId
    let { nextVersion, project } = req.body
    // console.log(data)
    try {
      const member = await projectMemberRepository.getByParams({ member: userId, project })
      // console.log(member)
      if (!member.isSupervise) throw new Error("You don't currently have permission to access this action !");
      let version = await versionRepository.remove(id)
      if (!version) throw new Error("Can't remove project type")

      if (nextVersion) {
        console.log(nextVersion)
        this.mapIssueToNewVersion(userId, id, nextVersion)
      } else {
        this.mapIssueToNewVersion(userId, id, null)
      }

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

export default VersionController