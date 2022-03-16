const User = require("../models/User");
const passport = require("passport");
const bcrypt = require("bcryptjs");
const { body, validationResult } = require("express-validator");

// If signed in, will return the user information
exports.get_user = (req, res, next) => {
  res.json({ user: req.user });
};

// Creates a user, by being given everything in the body
// Membership is by default set to false on all new accounts.
exports.create_user_post = [
  // Data sanitation
  body("username", "Please provide an make")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("password", "Please provide a password").trim().escape(),
  body("fullName", "Please provide a name")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  (req, res, next) => {
    // If data is not validated, send back list of errors.
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.send(errors);
    }
    // Process user sign up
    bcrypt.hash(req.body.password, 10, (err, hashedPassword) => {
      if (err) next(err);

      const user = new User({
        username: req.body.username,
        password: hashedPassword,
        fullName: req.body.fullName,
        membership: false,
      });
      user.save((err) => {
        if (err) next(err);

        res.json(user);
      });
    });
  },
];

// Attempts to log in with provided username and password.
exports.log_in_post = [
  passport.authenticate("local"),
  function (req, res) {
    res.redirect("/");
  },
];

// Logs user out, without providing any params or body information.
exports.log_out_get = (req, res) => {
  req.logout();
  res.redirect("/");
};
