const jwt=require("jsonwebtoken")

require("dotenv").config();

exports.auth=(req ,res,next)=>{

    try{
      //extract JWT token
      const token=req.body.token;


      if(!token)
      {
        return res.status(401).json({
            success:false,
            message:"Token is Missing"
        })
      }
    


    //verify token

    try{
        const decode=jwt.verify(token,process.env.JWT_SECRET);

        console.log(decode);
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


exports.isStudent=(res,req)=>{

    try{

    if(req.user.role!=="student")
    {
        return res.status(401).json({
               success:false,
            message:"this is protected route  valid for valid student"

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


exports.isAdmin=(res,req)=>{

    try{

    if(req.user.role!=="admin")
    {
        return res.status(401).json({
               success:false,
            message:"this is protected route  valid for valid admin"

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