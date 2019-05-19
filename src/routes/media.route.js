const express = require('express');
const router = express.Router();

import Authenticate from '../middlewares/auth.middleware';

import MediaController from '../controllers/media.controller';
// Controller
const mediaController = new MediaController();
// console.log('media route is called')

router.get('/*',  mediaController.getFiles);

module.exports = router;