const express = require('express');
const router = express.Router();

import Authenticate from '../middlewares/auth.middleware';

import BookController from '../controllers/book.controller';
// Controller
const bookController = new BookController();

router.post('/', Authenticate(),  bookController.create);

// router.post('/', userController.register);

module.exports = router;