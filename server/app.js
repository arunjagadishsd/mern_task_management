const createError = require("http-errors");
const express = require("express");
const path = require("path");
const logger = require("morgan");
const cookieSession = require("cookie-session");
const cors = require("cors");
require("dotenv").config();
require("./utils/passport.util");
const passport = require("passport");

const indexRouter = require("./routes/index");

const app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: ["abcd"],
  })
);
app.use(express.urlencoded({ extended: false }));
app.use(
  cors({
    origin: "http://localhost:3000",
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.use("/api", indexRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
  app.use(express.static(path.resolve(__dirname, "build")));
  app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.send("Error occurred while handling the request.");
  });
} else {
  app.use((err, req, res, next) => {
    res.status(err.status || 500);
    console.log(err);
    res.send(err.message);
  });
}

module.exports = app;
