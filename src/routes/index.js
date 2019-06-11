const express = require('express')
const router = express.Router()
// Route Modules
import AuthRoute from './auth.route'
import ProjectRoute from './project.route'
import GroupRoute from './group.route'
import UserRoute from './user.route'
import IssueRoute from './issue.route'
import IssueTypeRoute from './issueType.route'
import IssueStatusRoute from './issueStatus.route'
import PriorityRoute from './priority.route'
import AssignIssueRoute from './assignIssue.route'
import ProjectTypeRoute from './projectType.route'
import SprintRoute from './sprint.route'
import LabelRoute from './label.route'
import StoryPointRoute from './storyPoint.route'
import WorkflowRoute from './workflow.route'
import UploadRoute from './upload.route'
import ReleaseVersionRoute from './releaseVersion.route'
import MediaRoute from './media.route'
import ComponentRoute from './component.route'
import CommentRoute from './comment.route'
// Handler route
router.use('/auth', AuthRoute)
router.use('/project', ProjectRoute)
router.use('/group', GroupRoute)
router.use('/user', UserRoute)
router.use('/issue', IssueRoute)
router.use('/issueType', IssueTypeRoute)
router.use('/issueStatus', IssueStatusRoute)
router.use('/priority', PriorityRoute)
router.use('/assignIssue', AssignIssueRoute)
router.use('/projectType', ProjectTypeRoute)
router.use('/sprint', SprintRoute)
router.use('/label', LabelRoute)
router.use('/storyPoint', StoryPointRoute)
router.use('/workflow', WorkflowRoute)
router.use('/upload', UploadRoute)
router.use('/releaseVersion', ReleaseVersionRoute)
router.use('/media', MediaRoute)
router.use('/component', ComponentRoute)
router.use('/comment', CommentRoute)
module.exports = router