const express = require('express');
const router = express.Router();

// Authenticate function
import Authenticate from '../middlewares/auth.middleware';

// Controllers function
import SprintController from '../controllers/sprint.controller';

// Create new Controller contructor
const sprintController = new SprintController();

// Route and method: GET POST PUT DELETE
router.post('/', Authenticate(),  sprintController.create);
router.get('/:id', Authenticate(),  sprintController.getSprint);
router.get('/notComplete', Authenticate(),  sprintController.getListSprintByParams);
router.get('/', Authenticate(),  sprintController.getListAll);
router.put('/', Authenticate(),  sprintController.update);
router.post('/start', Authenticate(), sprintController.startSprint)
router.post('/complete', Authenticate(), sprintController.completeSprint)


module.exports = router;