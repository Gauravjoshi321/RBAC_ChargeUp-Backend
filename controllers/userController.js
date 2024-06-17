const AppError = require("../utils/AppError");
const User = require("../models/userModel");
const jwt = require('jsonwebtoken');
const util = require('util');

// $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
const signToken = id => {
  return jwt.sign({ id }, `${process.env.JWT_SECRET}`, { expiresIn: "90d" })
}

const createSendToken = (user, statusCode, res, req) => {
  const token = signToken(user._id);
  const cookieOptions = {
    expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
    httpOnly: true,
    secure: req.secure
  }

  res.cookie('jwt', token, cookieOptions);

  user.password = undefined;

  res.status(statusCode).json({
    status: 'success',
    token,
    data: user
  })
}

// $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$

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

const restrictTo = function (user) {
  if (user.role === "user")
    return false;
  return true;
}

exports.loginUser = async function (req, res, next) {
  const { email, password } = req.body;

  // 1. Check password and email are entered by the user
  if (!email || !password) return next(new AppError("Invalid Credentials", 401));

  // 2. Check if these credentials exist in our DataBase
  const user = await User.findOne({ email }).select('+password');
  if (user === null) return next(new AppError("User does not exist", 401));

  const correct = await user.correctPassword(password, user.password);

  if (!user || !correct) {
    return next(new AppError('Wrong email or password', 401));
  }

  // 3. Check for access
  const canAccess = restrictTo(user);
  if (!canAccess) return next(new AppError("You don't have access. Please contact to Admin.", 403));

  // 4. If OK, then provide the JSON web token
  createSendToken(user, 200, res, req);
}

exports.protect = async function (req, res, next) {

  const val = req.headers.cookie;
  if (val === undefined) return next(new AppError("Your are not logged in. Please Login first", 401));

  const token = val && val.split("=")[1];

  // 2. Verification of the token
  const decoded = await util.promisify(jwt.verify)(token, process.env.JWT_SECRET);

  // 3. Check if user still exist
  const freshUser = await User.findById(decoded.id);
  if (!freshUser) return next(new AppError("User belonging to this token does no longer exist", 401));

  req.user = freshUser;
  next();
}