const AppError = require("./AppError");
const User = require("./userModel");

exports.getAllUser = async function (req, res) {

  const users = await User.find();

  res.status(200).json({
    "status": "Success",
    "data": {
      users
    }
  })
}

exports.signUp = async function (req, res) {
  console.log(req.body);

  const user = await User.create(req.body);

  res.status(200).json({
    "status": "Success",
    "data": {
      user
    }
  })
}

exports.loginUser = async function (req, res, next) {
  try {
    const { email, password } = req.body;

    if (!email || !password) return next(new AppError("Invalid Credentials", 401));
  } catch (err) {
    next(err);
  }

}