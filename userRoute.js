const express = require("express");
const { getAllUser, signUp, loginUser } = require("./userController");

const router = express.Router();

router.get("/", getAllUser);
router.post("/signup", signUp);
router.post("/login", loginUser);

module.exports = router;