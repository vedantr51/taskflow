const express = require('express');
const router = express.Router();
const {
    createTask,
    getTasks,
    getTask,
    updateTask,
    deleteTask
} = require('../controllers/taskController');
const { protect } = require('../middleware/auth');
const { taskValidation, validate } = require('../middleware/validate');

// All routes are protected
router.use(protect);

router.route('/')
    .post(taskValidation, validate, createTask)
    .get(getTasks);

router.route('/:id')
    .get(getTask)
    .put(taskValidation, validate, updateTask)
    .delete(deleteTask);

module.exports = router;
