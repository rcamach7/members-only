const Post = require("../models/Post");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { check, validationResults } = require("express-validator");

// Retrieves post if user is signed in and has an active membership status.
exports.posts_get = (req, res, next) => {
  if (!req.user) {
    res.status(401).end();
  } else if (!req.user.membership) {
    // Membership is not active, we do not retrieve posts.
    res.status(403).end();
  } else {
    Post.find().exec((err, results) => {
      if (err) next(err);

      res.json(results);
    });
  }
};
