const express = require("express");
const { getAllUser, signUp, loginUser, protect } = require("./userController");

const router = express.Router();

router.get("/", protect, getAllUser);
router.post("/signup", signUp);
router.post("/login", loginUser);

module.exports = router;