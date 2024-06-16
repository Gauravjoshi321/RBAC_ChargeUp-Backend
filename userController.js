const User = require("./userModel");

exports.getAllUser = async function (req, res) {

  const users = await User.find();

  res.send({
    "status": "Success",
    "data": {
      users
    }
  })
}

exports.createUser = async function (req, res) {

  const users = await User.find();

  res.send({
    "status": "Success",
    "data": {
      users
    }
  })
}