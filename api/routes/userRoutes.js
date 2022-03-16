const express = require("express");
const router = express.Router();

// Import Controllers
const userController = require("../controllers/userController");

router.get("/", userController.get_user);

router.post("/sign-up/", userController.create_user_post);

router.post("/log-in/", userController.log_in_post);

router.get("/log-out", userController.log_out_get);

module.exports = router;
