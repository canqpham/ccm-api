const express = require('express');
const router = express.Router();
import AuthController from '../controllers/auth.controller';
import UserController from '../controllers/user.controller';
// Controller
const authController = new AuthController();
const userController = new UserController();

router.post('/login', authController.login);
router.post('/register', userController.register);

module.exports = router;