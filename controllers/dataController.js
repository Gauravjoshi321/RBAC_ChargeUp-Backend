const Data = require("../models/dataModal")

exports.getAllData = async function (req, res, next) {

  const data = await Data.find();

  res.status(200).json({
    "status": "success",
    "data": {
      data
    }
  })
}

exports.createData = async function (req, res, next) {

  const data = await Data.create(req.body);

  res.status(200).json({
    "status": "success",
    "data": {
      data
    }
  })
}