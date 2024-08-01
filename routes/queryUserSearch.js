const express = require("express");

const {
  handlesearchUserInput,
} = require("../controllers/handlesearchUserInput");

const router = express.Router();

router.get("/getSuppliers", handlesearchUserInput);

module.exports = router;
