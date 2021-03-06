const express = require('express');
const router = express.Router();

import Authenticate from '../middlewares/auth.middleware';

import UserController from '../controllers/user.controller';
// Controller
const userController = new UserController();

router.get('/', Authenticate(),  userController.getInfo);
router.put('/', Authenticate(),  userController.update);
router.get('/email', Authenticate(), userController.getListEmail);
router.get('/list', Authenticate(),  userController.getListUserByProject);

// router.post('/', userController.register);

module.exports = router;