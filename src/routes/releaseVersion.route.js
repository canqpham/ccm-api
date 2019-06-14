const express = require('express')
const router = express.Router()

// Authenticate function
import Authenticate from '../middlewares/auth.middleware'

// Controllers function
import VersionController from '../controllers/version.controller'

// Create new Controller contructor
const versionController = new VersionController()

// Route and method: GET POST PUT DELETE
router.get('/', Authenticate(),  versionController.getListByProject)
router.post('/', Authenticate(),  versionController.createVersion)
router.post('/release/:id', Authenticate(),  versionController.release)
router.post('/unrelease/:id', Authenticate(),  versionController.unrelease)
router.put('/:id', Authenticate(), versionController.update)
router.post('/delete/:id', Authenticate(), versionController.remove)
router.get('/:id', Authenticate(), versionController.getListIssueInVersion)

module.exports = router