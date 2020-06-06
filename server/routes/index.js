const express = require("express");
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
router.post("/auth/signin", requireSignin, authController.signin);
router.post("/auth/signup", authController.signup);
router.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);
router.get(
  "/auth/google/callback/",
  passport.authenticate("google", { failureRedirect: "/", session: false }),
  authController.googleSignin
);
// TODO ENDPOINTS
router.post("/todo", todoController.todoCreate);
router.get("/todo", todoController.todoList);
// LABEL ENDPOINTS
router.post("/label", labelController.labelCreate);
router.get("/label", labelController.labelList);
// STATUS ENDPOINTS
router.post("/status", statusController.statusCreate);
router.get("/status", statusController.statusList);

module.exports = router;
