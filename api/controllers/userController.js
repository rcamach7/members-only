const User = require("../models/User");
const passport = require("passport");
const bcrypt = require("bcryptjs");
const { check, validationResult } = require("express-validator");

// If signed in, will return the user information
exports.get_user = (req, res, next) => {
  res.json({ user: req.user });
};

// Creates a user, by being given everything in the body
// Membership is by default set to false on all new accounts.
exports.create_user_post = [
  // Data sanitation
  check("username")
    .exists()
    .bail()
    .trim()
    .isLength({ min: 5 })
    .withMessage("Username must have at least 5 characters")
    .custom((value) => {
      // Makes sure the username is not already in use by another member
      return User.findOne({ username: value }).then((user) => {
        if (user) {
          return Promise.reject("Username Already Exists");
        }
      });
    })
    .withMessage("Username already in use"),
  check("password")
    .exists()
    .bail()
    .trim()
    .isLength({ min: 5 })
    .withMessage("Password must have at least 5 characters"),
  check("fullName")
    .exists()
    .bail()
    .trim()
    .isLength({ min: 5 })
    .withMessage("Name must have at least 5 characters"),
  (req, res, next) => {
    // If data is not validated, send back list of errors.
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.json(errors);
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

        // Log in user after account creation
        req.logIn(user, (err) => {
          if (err) next(err);

          res.json(user);
        });
      });
    });
  },
];

// Attempts to log in with provided username and password.
exports.log_in_post = [
  check("username")
    .exists()
    .bail()
    .trim()
    .isLength({ min: 5 })
    .withMessage("Username must have at least 5 characters"),
  check("password")
    .exists()
    .bail()
    .trim()
    .isLength({ min: 5 })
    .withMessage("Password must have at least 5 characters"),
  (req, res, next) => {
    // Checks validation results, and returns errors, if any, if not it moves on to authentication.
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.json(errors);
    }
    next();
  },
  passport.authenticate("local", {
    failureMessage: true,
  }),
  function (req, res) {
    res.redirect("/");
  },
];

// Logs user out, without providing any params or body information.
exports.log_out_get = (req, res) => {
  req.logout();
  res.redirect("/");
};

// Gives membership status of true, if access code is correct. Requires ID of user in params.
exports.membership_access_put = [
  check("accessCode")
    .exists()
    .bail()
    .trim()
    .isLength({ min: 1 })
    .withMessage("Enter value greater than 1 character")
    .toLowerCase()
    .matches("odin")
    .withMessage("Access code not correct"),
  (req, res, next) => {
    // If data did not pass validation, return errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.json(errors);
    }

    // If no errors, update membership status to active.
    User.findByIdAndUpdate(req.params.id, { $set: { membership: true } }).exec(
      (err, result) => {
        if (err) next(err);

        res.json({ msg: "Success" });
      }
    );
  },
];
