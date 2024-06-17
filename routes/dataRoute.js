const express = require("express");
const { getAllData, createData } = require("../controllers/dataController");
const { protect } = require("../controllers/userController");
const router = express.Router();


router.get("/getAllData", protect, getAllData);
router.post("/createData", protect, createData);

module.exports = router;