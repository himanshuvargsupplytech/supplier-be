

const express=require("express")
const {upload}=require("../middlewares/multer")

const { handleCustomerData } = require("../controllers/handleCustomerData");

// console.log("imageupload",imageUpload)
const router=express.Router();



router.post("/submitData", upload.fields([{name:"balance_sheet_certificate",maxcount:1},{name:"income_certificate",maxcount:1}]) ,handleCustomerData);


module.exports=router


