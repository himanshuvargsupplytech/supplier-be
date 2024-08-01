import {v2 as cloudinary} from "cloudinary"

import fs from "fs"

import { v2 as cloudinary } from 'cloudinary';
cloudinary.config({ 
    cloud_name: `${process.env.cloud_name}`, 
    api_key: `${process.env.api_key}`, 
    api_secret:`${process.env.api_key}` 
});

  const uploadOnCloudinary=async (localFilePath) =>{

    // Configuration

    
    // Upload an image
     

     try{
    
     const uploadResult = await cloudinary.uploader
       .upload(
           'localFilePath', {
               resource_type: 'auto',
           }
       )
       console.log("file is uploaded on cludinary",uploadResult.url)

       return uploadResult
       
    }
    
       catch(error){
           console.log(error);
           fs.unlinkSync(localFilePath)
           return null
       }
    
    console.log(uploadResult);
    
    // Optimize delivery by resizing and applying auto-format and auto-quality
    // const optimizeUrl = cloudinary.url('shoes', {
    //     fetch_format: 'auto',
    //     quality: 'auto'
    // });
    
    // console.log(optimizeUrl);
    
    // Transform the image: auto-crop to square aspect_ratio
    // const autoCropUrl = cloudinary.url('shoes', {
    //     crop: 'auto',
    //     gravity: 'auto',
    //     width: 500,
    //     height: 500,
    // });
    
    // console.log(autoCropUrl);    
}