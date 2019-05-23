const express = require('express');
const router = express.Router();


import Authenticate from '../middlewares/auth.middleware';

import UploadController from '../controllers/upload.controller';
// Controller
const uploadController = new UploadController();

router.post('/', Authenticate(),  uploadController.create);

// router.post('/', upload.none(), (req, res) => {
//   const formData = req.body;
//   console.log('form data', formData);
//   res.sendStatus(200);
// });

module.exports = router;