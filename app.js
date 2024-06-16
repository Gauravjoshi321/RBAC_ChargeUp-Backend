const express = require("express");
const path = require('path');
const cors = require('cors');
const userRoute = require("./userRoute");

const app = express();

// 1. Body parser
app.use(express.json({ limit: '10kb' }));

// 2. Applying CORS
app.use(cors());

// 2. Serving static files: All static assets will be served through the Public folder
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', userRoute);


module.exports = app;