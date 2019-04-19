const express = require('express');
const router = express.Router();

import Authenticate from '../middlewares/auth.middleware';

import UploadController from '../controllers/upload.controller';
// Controller
const uploadController = new UploadController();

router.post('/', Authenticate(),  uploadController.create);

module.exports = router;