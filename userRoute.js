const express = require("express");
const { getAllUser, createUser } = require("./userController");

const router = express.Router();

router.get("/", getAllUser);
router.post("/signup", createUser)

module.exports = router;