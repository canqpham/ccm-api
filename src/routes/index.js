const express = require('express');
const router = express.Router();

// Route Modules
import AuthRoute from './auth.route';

router.use('/auth', AuthRoute);

module.exports = router;