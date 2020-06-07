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
router.post("/todo", requireAuth, todoController.todoCreate);
router.get("/todo", requireAuth, todoController.todoList);
router.delete("/todo/:tid", requireAuth, todoController.todoDelete);
// LABEL ENDPOINTS
router.post("/label", requireAuth, labelController.labelCreate);
router.get("/label", requireAuth, labelController.labelList);
// STATUS ENDPOINTS
router.post("/status", requireAuth, statusController.statusCreate);
router.get("/status", requireAuth, statusController.statusList);

module.exports = router;
