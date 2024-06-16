const express = require("express");
const User = require("./userModel");

const router = express.Router();

router.get("/", async function (req, res) {

  const users = await User.find();

  res.send({
    "status": "Success",
    "data": {
      users
    }
  })
})

module.exports = router;