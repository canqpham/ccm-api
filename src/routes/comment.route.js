const express = require('express');
const router = express.Router();

import Authenticate from '../middlewares/auth.middleware';

import CommentController from '../controllers/comment.controller';
// Controller
const commentController = new CommentController();

router.post('/', Authenticate(),  commentController.create);
router.put('/:id', Authenticate(),  commentController.update);
router.delete('/:id', Authenticate(),  commentController.remove);

module.exports = router;