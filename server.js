const mongoose = require('mongoose');


const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });

const app = require("./app");


mongoose.connect(process.env.DATABASE, {
}).then((con) => {
  console.log("DB connection is successfull !");
})


app.listen(process.env.PORT, () => {
  console.log(`Server listening at port: 4000, on this device`);
})