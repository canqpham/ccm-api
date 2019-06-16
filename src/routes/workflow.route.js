const express = require('express');
const router = express.Router();

import Authenticate from '../middlewares/auth.middleware';

import WorkflowController from '../controllers/workflow.controller';
// Controller
const workflowController = new WorkflowController();

router.post('/', Authenticate(),  workflowController.create);
router.put('/:id', Authenticate(),  workflowController.update);
router.get('/list', Authenticate(), workflowController.getListWorkflow)
router.post('/swap', Authenticate(), workflowController.swapWorkflow)
// router.post('/', userController.register);

module.exports = router;