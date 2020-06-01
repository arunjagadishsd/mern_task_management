const express = require("express");
require("../utils/passport.util");
const passport = require("passport");

const todoController = require("../controllers/todo.controller");
const labelController = require("../controllers/label.controller");
const statusController = require("../controllers/status.controller");
const authController = require("../controllers/auth.controller");

const requireAuth = passport.authenticate("jwt", {
  session: false,
});
const requireSignin = passport.authenticate("local", {
  session: false,
});

const router = express.Router();

// AUTH ENDPOINTS
router.get("/authed", requireAuth, function (req, res) {
  res.send({
    hi: "there",
  });
});
router.post("/signin", requireSignin, authController.signin);
router.post("/signup", authController.signup);
// TODO ENDPOINTS
router.post("/todo", todoController.todoCreate);
router.get("/todo", todoController.todo_list);
// LABEL ENDPOINTS
router.post("/label", labelController.labelCreate);
router.get("/label", labelController.label_list);
// STATUS ENDPOINTS
router.post("/status", statusController.statusCreate);
router.get("/status", statusController.status_list);

module.exports = router;
