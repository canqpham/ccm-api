const express = require('express')
const router = express.Router()

import Authenticate from '../middlewares/auth.middleware'

import IssueController from '../controllers/issue.controller'
// Controller
const issueController = new IssueController()

router.post('/', Authenticate(),  issueController.create)
router.get('/:id', Authenticate(), issueController.getIssueInfo)

module.exports = router