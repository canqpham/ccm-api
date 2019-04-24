const express = require('express');
const router = express.Router();

// Authenticate function
import Authenticate from '../middlewares/auth.middleware';

// Controllers function
import ProjectTypeController from '../controllers/projectType.controller';

// Create new Controller contructor
const projectTypeController = new ProjectTypeController();

// Route and method: GET POST PUT DELETE
router.post('/', Authenticate(),  projectTypeController.create);
router.get('/', Authenticate(),  projectTypeController.getListAll);
router.put('/:id', Authenticate(),  projectTypeController.update);

// router.post('/', userController.register);

module.exports = router;