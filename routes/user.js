
const express=require("express")

const router=express.Router();

const{signup,login}=require("../controllers/Auth")
const {isAdmin,isStudent,auth}=require("../middlewares/auth")


console.log(login);
router.post("/signup",signup);
router.post("/login",login);

//testing protected routes for single middlewares


router.get("/test",auth,(req,res)=>{
    // res.status(200).json({
    //     success:true,
    //     message:"Welcome to the Protected route for tests"
    // })

    res.json({
        success:true,
        message:'Welcome to the Protected route for TESTS',
    });
})

//Protescted Routes

router.get("/student",auth,isStudent,(req,res)=>{
    res.json({
         success:true,
        message:"Welcome to the Protected route for tests"

    })
})


router.get("/admin",auth,isAdmin,(req,res)=>{
    res.json({
         success:true,
        message:"Welcome to the Protected route for tests"

    })
})



module.exports=router;
