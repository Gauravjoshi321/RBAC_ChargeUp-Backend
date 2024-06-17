const express = require("express");
const { getAllData, createData } = require("../controllers/dataController");
const router = express.Router();


router.get("/getAllData", getAllData);
router.post("/createData", createData);

module.exports = router;