const express = require('express');
const router = express.Router();

import Authenticate from '../middlewares/auth.middleware';

import WorkflowController from '../controllers/workflow.controller';
// Controller
const workflowController = new WorkflowController();

router.post('/getWorkflow', Authenticate(),  workflowController.getWorkflow);
router.get('/', Authenticate(), workflowController.getListWorkflow)
// router.post('/', userController.register);

module.exports = router;