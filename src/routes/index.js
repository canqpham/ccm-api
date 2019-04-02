const express = require('express');
const router = express.Router();

// Route Modules
import AuthRoute from './auth.route';
import BookRoute from './book.route';
import ProjectRoute from './project.route';
import GroupRoute from './group.route';
import UserRoute from './user.route';
import IssueRoute from './issue.route';
import IssueTypeRoute from './issueType.route';

router.use('/auth', AuthRoute);
router.use('/book', BookRoute);
router.use('/project', ProjectRoute);
router.use('/group', GroupRoute);
router.use('/user', UserRoute);
router.use('/issue', IssueRoute)
router.use('/issueType', IssueTypeRoute)

module.exports = router;