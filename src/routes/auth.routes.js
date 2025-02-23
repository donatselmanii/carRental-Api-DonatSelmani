const express = require("express");
const { register, login, myProfile } = require("../controllers/auth.controller.js");
const authMiddleware = require("../middleware/auth.middleware.js");

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/my-profile", authMiddleware, myProfile);

module.exports = router;