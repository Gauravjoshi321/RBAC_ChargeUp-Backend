const express = require("express");
const mongoose = require('mongoose');


const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });

const app = express();


mongoose.connect(process.env.DATABASE, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then((con) => {
  console.log("DB connection is successfull !");
})


app.listen(process.env.PORT, () => {
  console.log(`Server listening at port: 3000, on this device`);
})