const express = require('express')
const router = express.Router()

// Authenticate function
import Authenticate from '../middlewares/auth.middleware'

// Controllers function
import StoryPointController from '../controllers/storyPoint.controller'

// Create new Controller contructor
const storyPointController = new StoryPointController()

// Route and method: GET POST PUT DELETE
router.get('/', Authenticate(),  storyPointController.getListByProjectId)

module.exports = router