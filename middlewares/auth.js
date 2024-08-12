const jwt=require("jsonwebtoken")

require("dotenv").config();

exports.auth=(req ,res,next)=>{

    try{
      //extract JWT token
      const token=req.cookies.token||req.body.token||req.header("Authorization").replace("Bearer ", "");

      console.log("token",token);

      //token is present or not
      if(!token||token===undefined)
      {
        return res.status(401).json({
            success:false,
            message:"Token is Missing"
        })
      }

      console.log(req.body);
      console.log(req.cookies);
    


    //verify token

    try{
        const decode=jwt.verify(token,process.env.JWT_SECRET);

        console.log("decode after running verify",decode);
        //to cross check role that is why we are inserting  decode to req
        req.user=decode;
       

    }
  
   

    catch(error){
        return res.status(401).json({
            success:false,
            message:"Token is invalid"
        })
    }

      next();
 

   
}
    catch(error){

        return res.status(401).json({
            success:false,
            message:"Something went wrong, while verifying the token"
        })

    }


    
}


// exports.auth = (req, res, next) => {
//     try {
//       // Extract JWT token
//       const token = req.body.token;
  
//       if (!token) {
//         return res.status(401).json({
//           success: false,
//           message: "Token is Missing",
//         });
//       }
  
//       // Verify token
//       try {
//         const decode = jwt.verify(token, process.env.JWT_SECRET);
//         console.log(decode);
//         req.user = decode;
//         return next();
//       } catch (error) {
//         return res.status(401).json({
//           success: false,
//           message: "Token is invalid",
//         });
//       }
//     } catch (error) {
//       return res.status(401).json({
//         success: false,
//         message: "Token is Missing",
//       });
//     }
//   };


exports.isStudent=(req,res,next)=>{

    try{

    if(req.user.role!=="student")
    {
        return res.status(401).json({
               success:false,
            message:"this is protected route   for  student"

        })
    }
    next();
    }
    catch(error)
    {
        return res.status(401).json({
            success:false,
         message:"User role is not matching "

     })
    }


}


exports.isAdmin=(req,res,next)=>{

    try{

    if(req.user.role!=="admin")
    {
        return res.status(401).json({
               success:false,
            message:"this is protected route  for admin"

        })
    }

    next();
   
    }
    catch(error)
    {
        return res.status(401).json({
            success:false,
         message:"User role is not matching"

     })
    }


}