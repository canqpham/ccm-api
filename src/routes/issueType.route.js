const express = require('express');
const router = express.Router();

import Authenticate from '../middlewares/auth.middleware';

import IssueTypeController from '../controllers/issueType.controller';
// Controller
const issueTypeController = new IssueTypeController();

router.get('/', Authenticate(),  issueTypeController.getListAll);
router.post('/', Authenticate(),  issueTypeController.create);

// router.post('/', userController.register);

module.exports = router;