/* eslint-disable no-underscore-dangle */

const jwt = require("jwt-simple");
const bcrypt = require("bcrypt");
const User = require("../models/user.model");

function tokenForUser(user) {
  const timestamp = new Date().getTime();
  return jwt.encode(
    {
      sub: user.id,
      iat: timestamp,
    },
    process.env.SECRET
  );
}

async function hashPassword(password) {
  const salt = await bcrypt.genSalt(10);

  const hash = bcrypt.hash(password, salt);
  return hash;
}
// eslint-disable-next-line no-unused-vars
exports.signin = function (req, res, next) {
  res.send({
    token: tokenForUser(req.user),
  });
};

exports.signup = async (req, res, next) => {
  try {
    const { email, password, firstName, lastName } = req.body;

    if (!email || !password) {
      return res.status(422).send({
        error: "You must provide email and password",
      });
    }
    const existingUser = await User.findOne({
      email: email,
    });
    console.log("existingUser", existingUser);

    if (existingUser) {
      return res.status(422).send({
        error: "Email is in use",
      });
    }
    console.log("b4createdUser");
    const hashedPassword = await hashPassword(password);
    const createdUser = await User.create({
      email,
      password: hashedPassword,
      firstName,
      lastName,
    });
    console.log("createdUser", createdUser);

    res.json({
      token: tokenForUser(createdUser),
    });
  } catch (error) {
    return next(error);
  }
};

exports.googleSignin = async (req, res) => {
  const googleUser = req.user._json;
  const user = await User.findOne({ googleId: googleUser.sub });
  let token = "";
  if (user) {
    token = tokenForUser(user);
  } else {
    const createdUser = await User.create({
      googleId: googleUser.sub,
      email: googleUser.email,
      firstName: googleUser.given_name,
      lastName: googleUser.family_name,
    });
    token = tokenForUser(createdUser);
  }
  res.redirect(`http://localhost:3000/token?token=${token}`);
};
