const CONSTANTS = require("../constants");
const express = require('express')
const todo_controller = require('../controllers/todo.controller')
const label_controller = require('../controllers/todo.controller')

const router = express.Router()
// TODO ENDPOINTS
router.post('/todo', todo_controller.todo_create);
router.get('/todo', todo_controller.todo_list);
// LABEL ENDPOINTS
router.post('/label', label_controller.label_create);
router.get('/label', label_controller.label_list);

module.exports = router