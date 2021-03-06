const express = require('express')
const router = express.Router()

// Authenticate function
import Authenticate from '../middlewares/auth.middleware'

// Controllers function
import PriorityController from '../controllers/priority.controller'

// Create new Controller contructor
const priorityController = new PriorityController()

// Route and method: GET POST PUT DELETE
router.get('/', Authenticate(),  priorityController.getListByProject)
router.post('/', Authenticate(),  priorityController.create)
router.put('/:id', Authenticate(), priorityController.update)
router.delete('/:id', Authenticate(), priorityController.remove)

module.exports = router