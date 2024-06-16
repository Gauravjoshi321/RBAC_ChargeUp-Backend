const dotenv = require('dotenv');
const mongoose = require('mongoose');
const User = require('./userModel');

dotenv.config({ path: './config.env' });


// CONNECT TO ATLAS
const DB = process.env.DATABASE;

mongoose.connect(DB, {
}).then(con => {
  console.log("CONNECTION SUCCESSFULL !");
})

const user = [{
  "name": "Gaurav Joshi",
  "email": "joshi@gmail.com",
  "role": "admin",
  "password": "Joshi@123"
}]


// IMPORT DATA TO THE DATABASE
const importData = async () => {
  try {
    await User.create(user, { validateBeforeSave: false });

    console.log("Data imported successfully");
  }
  catch (err) {
    console.log(err);
  }
  process.exit();
}

// DELETE DATA FROM THE DATABASE
const deleteTours = async () => {
  try {
    await User.deleteMany();

    console.log("Data deleted successfully");
  }
  catch (err) {
    console.log(err);
  }
  process.exit();
}



if (process.argv[2] === '--import') {
  importData();
}
else if (process.argv[2] === '--delete') {
  deleteTours();
}


// node dev-data.js --delete
// node dev-data.js --import