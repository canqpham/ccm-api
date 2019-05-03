const express = require('express');
const router = express.Router();

import Authenticate from '../middlewares/auth.middleware';

import ProjectController from '../controllers/project.controller';
// Controller
const projectController = new ProjectController();

router.post('/', Authenticate(),  projectController.create);
router.get('/', Authenticate(), projectController.getListAllProjectByUserId)
router.get('/:id', Authenticate(), projectController.getProjectInfo)
router.put('/:id', Authenticate(), projectController.update)
router.post('/addMember', Authenticate(), projectController.addMemberToProject)

module.exports = router;