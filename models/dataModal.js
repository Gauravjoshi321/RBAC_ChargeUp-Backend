const mongoose = require("mongoose");

const dataSchema = new mongoose.Schema({
  drivers: String,
  earning: String,
  co2Saved: String,
  stations: String,
  treesPlanted: String
})


const Data = mongoose.model('Data', dataSchema);

module.exports = Data;