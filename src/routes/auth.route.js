const express = require('express');
const router = express.Router();
import AuthController from '../controllers/auth.controller';
// Controller
const userController = new AuthController();

router.post('/login', userController.login);
router.post('/register');

module.exports = router;