const express = require('express')
const router = express.Router()

// Authenticate function
import Authenticate from '../middlewares/auth.middleware'

// Controllers function
import LabelController from '../controllers/label.controller'

// Create new Controller contructor
const labelController = new LabelController()

// Route and method: GET POST PUT DELETE
router.get('/byProject', Authenticate(),  labelController.getListByProjectId)
router.post('/', Authenticate(),  labelController.create)
router.put('/:id', Authenticate(), labelController.update)
router.delete('/:id', Authenticate(), labelController.remove)

module.exports = router