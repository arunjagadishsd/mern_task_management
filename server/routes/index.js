const express = require('express')
require('../utils/passport.util');
const passport = require('passport');

const todo_controller = require('../controllers/todo.controller')
const label_controller = require('../controllers/label.controller')
const status_controller = require('../controllers/status.controller')
const auth_controller = require('../controllers/auth.controller')

const requireAuth = passport.authenticate('jwt', {
    session: false
});
const requireSignin = passport.authenticate('local', {
    session: false
});

const router = express.Router()

// AUTH ENDPOINTS
router.get('/authed', requireAuth, function(req, res) {
    res.send({
        hi: 'there'
    });
});
router.post('/signin', requireSignin, auth_controller.signin);
router.post('/signup', auth_controller.signup);
// TODO ENDPOINTS
router.post('/todo', todo_controller.todo_create);
router.get('/todo', todo_controller.todo_list);
// LABEL ENDPOINTS
router.post('/label', label_controller.label_create);
router.get('/label', label_controller.label_list);
// STATUS ENDPOINTS
router.post('/status', status_controller.status_create);
router.get('/status', status_controller.status_list);

module.exports = router