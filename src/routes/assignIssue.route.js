const express = require('express');
const router = express.Router();

// Authenticate function
import Authenticate from '../middlewares/auth.middleware';

// Controllers function
import AssignIssueController from '../controllers/assignIssue.controller';

// Create new Controller contructor
const assignIssueController = new AssignIssueController();

// Route and method: GET POST PUT DELETE
router.post('/', Authenticate(),  assignIssueController.create);

// router.post('/', userController.register);

module.exports = router;