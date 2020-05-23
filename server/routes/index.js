const CONSTANTS = require("../constants");
const express = require('express')
const todo_controller = require('../controllers/todo.controller')

const router = express.Router()
// TODO ENDPOINTS
router.post('/todo', todo_controller.todo_create);
router.get('/todo', todo_controller.todo_list);

module.exports = router