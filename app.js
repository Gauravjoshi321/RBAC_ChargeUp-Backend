const express = require("express");
const path = require('path');
const cors = require('cors');
const userRoute = require("./routes/userRoute");
const dataRoute = require("./routes/dataRoute");

const app = express();

// 1. Body parser
app.use(express.json({ limit: '10kb' }));

// 2. Applying CORS
app.use(cors());

// 2. Serving static files: All static assets will be served through the Public folder
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', userRoute);
app.use('/data', dataRoute)

app.use((err, req, res, next) => {
  res.status(err.statusCode).json({ err });
});


module.exports = app;