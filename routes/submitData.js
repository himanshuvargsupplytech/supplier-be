// Import the expres module
const multer = require("multer");

//upload instance created

//but we are not able to read our file
// const upload = multer({ dest: 'uploads/' })

const express = require("express");


const modifiedDate=(d)=>
{
  return d.toString().slice(0,15);
}

console.log(modifiedDate(Date))

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    return cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    return cb(null, `${ modifiedDate(new Date(Date.now()))}-${file.originalname}`);
  },
});

console.log(modifiedDate(new Date(Date.now())));

const upload = multer({ storage: storage });
// Import the controller function for handling customerdata
const { handleCustomerData } = require("../controllers/handleCustomerData");

// create a router instance
const router = express.Router();

// Route to handle POST requests to submit customer data
// router.post("/submitData", upload.fields([{ name: "balance_sheet_certificate", maxCount: 1 }, { name: "income_certificate", maxCount: 1 }]), handleCustomerData)
router.post(
  "/submitData",
  upload.fields([{name:"balance_sheet_certificate",maxCount:1},{name: "income_certificate", maxCount: 1}]),
  handleCustomerData
);

// Export the router for use in other files
module.exports = router;
