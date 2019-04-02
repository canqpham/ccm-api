const express = require('express');
const router = express.Router();

// Authenticate function
import Authenticate from '../middlewares/auth.middleware';

// Controllers function
import IssueStatusController from '../controllers/issueStatus.controller';

// Create new Controller contructor
const issueStatusController = new IssueStatusController();

// Route and method: GET POST PUT DELETE
router.get('/', Authenticate(),  issueStatusController.getListAll);
router.post('/', Authenticate(),  issueStatusController.create);

// router.post('/', userController.register);

module.exports = router;