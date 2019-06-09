const express = require('express')
const router = express.Router()

// Authenticate function
import Authenticate from '../middlewares/auth.middleware'

// Controllers function
import ComponentController from '../controllers/component.controller'

// Create new Controller contructor
const componentController = new ComponentController()

// Route and method: GET POST PUT DELETE
router.get('/', Authenticate(),  componentController.getListByProject)
router.post('/', Authenticate(),  componentController.create)
router.put('/:id', Authenticate(), componentController.update)
router.delete('/:id', Authenticate(), componentController.remove)

module.exports = router