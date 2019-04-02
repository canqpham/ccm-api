const express = require('express');
const router = express.Router();

// Authenticate function
import Authenticate from '../middlewares/auth.middleware';

// Controllers function
import PriorityController from '../controllers/priority.controller';

// Create new Controller contructor
const priorityController = new PriorityController();

// Route and method: GET POST PUT DELETE
router.get('/', Authenticate(),  priorityController.getListAll);
router.post('/', Authenticate(),  priorityController.create);

// router.post('/', userController.register);

module.exports = router;