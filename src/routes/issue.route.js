const express = require('express')
const router = express.Router()

import Authenticate from '../middlewares/auth.middleware'

import IssueController from '../controllers/issue.controller'
// Controller
const issueController = new IssueController()

router.post('/', Authenticate(),  issueController.create)
router.get('/listIssues', Authenticate(), issueController.getListIssue)
router.get('/:id', Authenticate(), issueController.getIssueInfo)
router.put('/:id', Authenticate(), issueController.update)
router.delete('/:id', Authenticate(), issueController.remove)
// router.post('/updateLabel', Authenticate(), issueController.updateLabel)
module.exports = router