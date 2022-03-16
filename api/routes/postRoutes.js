const express = require("express");
const router = express.Router();

// Import Controllers
const postController = require("../controllers/postController");

// Get all posts, only if user is logged in, and membership status is active.
router.get("/", postController.posts_get);

// Add a new post with all info in body.
router.post("/", postController.posts_post);

module.exports = router;
