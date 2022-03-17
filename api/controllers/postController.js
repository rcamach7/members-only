const Post = require("../models/Post");
const User = require("../models/User");
const { check, validationResult } = require("express-validator");

// Retrieves post if user is signed in and has an active membership status.
exports.posts_get = (req, res, next) => {
  if (!req.user) {
    res.status(401).end();
  } else if (!req.user.membership) {
    // Membership is not active, we do not retrieve posts.
    res.status(403).end();
  } else {
    Post.find()
      .populate("author", "fullName")
      .exec((err, results) => {
        if (err) next(err);

        res.json(results);
      });
  }
};

// Creates a new post with all information provided in the body of the request
exports.posts_post = [
  check("title")
    .exists()
    .bail()
    .trim()
    .isLength({ min: 2 })
    .withMessage("Min length of 2 characters"),
  check("message")
    .exists()
    .bail()
    .trim()
    .isLength({ min: 2 })
    .withMessage("Min length of 2 characters for message"),
  (req, res, next) => {
    // If validation fails, return errors
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.json(errors);
    } else if (!req.user) {
      // No user logged in.
      res.status(401).end();
    }

    const newPost = new Post({
      author: req.user._id,
      timeStamp: new Date(),
      title: req.body.title,
      message: req.body.message,
    });

    newPost.save((err) => {
      if (err) next(err);

      res.json(newPost);
    });
  },
];
