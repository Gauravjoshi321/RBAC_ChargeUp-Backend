const Data = require("../models/dataModal")

exports.getAllData = async function (req, res, next) {

  res.status(200).json({
    "status": "success"
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