// App and database imports
const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
// Authentication Imports
const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcryptjs");

require("dotenv").config();

const app = express();
const User = require("./models/User");
const userRoutes = require("./routes/userRoutes");
const postRoutes = require("./routes/postRoutes");

// Database Set up
const mongoDB = process.env.MONGO_DB;
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.Promise = global.Promise;

// Middleware set-up
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// Authentication middleware set-up
app.use(session({ secret: "cats", resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

// Set up local strategy for our authentication (passport.authentication() uses these settings)
passport.use(
  new LocalStrategy((username, password, done) => {
    User.findOne({ username: username }, (err, user) => {
      // Error occurred in our search
      if (err) {
        return done(err);
      }

      // Validates username
      if (!user) {
        return done(null, false, { message: "Incorrect username" });
      }

      // Validates password
      bcrypt.compare(password, user.password, (err, res) => {
        if (res) {
          // Password authenticated
          return done(null, user);
        } else {
          // passwords do not match
          return done(null, false, { message: "Incorrect password" });
        }
      });

      return done(null, user);
    });
  })
);
// Passport cookies serialization
passport.serializeUser(function (user, done) {
  done(null, user.id);
});

passport.deserializeUser(function (id, done) {
  User.findById(id, function (err, user) {
    done(err, user);
  });
});

// Define Routes
app.use("/user", userRoutes);
app.usr("/post", postRoutes);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.send("error");
});

module.exports = app;
