const express = require('express');
const router = express.Router();

// Route Modules
import AuthRoute from './auth.route';
import BookRoute from './book.route';
import ProjectRoute from './project.route';
import GroupRoute from './group.route';

router.use('/auth', AuthRoute);
router.use('/book', BookRoute);
router.use('/project', ProjectRoute);
router.use('/group', GroupRoute);

module.exports = router;