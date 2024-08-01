
const mongoose=require("mongoose");

const userSchema=mongoose.Schema({
    fname:{
        type:String,
        required:true,
        trim:true,
    }
    ,
    email:{
        type:String,
        required:true,
        trim:true,
    },
    password:{
        type:String,
        required:true,
        trim:true,
    },
    role:{
        type:String,
        enum:["student","admin"]
    }

})


module.exports=mongoose.model("userSchema",userSchema);

