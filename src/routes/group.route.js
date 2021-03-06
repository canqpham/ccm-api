const express = require('express');
const router = express.Router();

import Authenticate from '../middlewares/auth.middleware';

import GroupController from '../controllers/group.controller';
// Controller
const groupController = new GroupController();

router.post('/', Authenticate(),  groupController.create);
router.get('/', Authenticate(),  groupController.getListAll);
router.put('/:id', Authenticate(),  groupController.update);

module.exports = router;