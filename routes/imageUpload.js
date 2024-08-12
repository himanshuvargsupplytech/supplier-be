

const express=require("express")
const {upload}=require("../middlewares/multer")
const {imageUpload}=require("../controllers/imageUpload")
const router=express.Router();



router.post("/upload", upload.single('newfile') ,imageUpload );


module.exports=router

