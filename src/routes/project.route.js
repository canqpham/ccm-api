const express = require('express');
const router = express.Router();

import Authenticate from '../middlewares/auth.middleware';

import ProjectController from '../controllers/project.controller';
// Controller
const projectController = new ProjectController();

router.post('/', Authenticate(),  projectController.create);

// router.post('/', userController.register);

module.exports = router;