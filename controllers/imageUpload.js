




const fs=require("fs");
const path =require('path')

const { BlobServiceClient, ContainerClient } = require("@azure/storage-blob");

const blobServiceClient = new BlobServiceClient(
  `https://${process.env.STORAGE_ACCOUNT_NAME}.blob.core.windows.net/?${process.env.AZURE_STORAGE_SAS_TOKEN}`
);

const containerClient = blobServiceClient.getContainerClient(process.env.AZURE_STORAGE_CONTAINER_NAME);

exports.imageUpload=async(req,res)=>{

  const blobName=req.file.originalname;
  const blockBlobClient=containerClient.getBlockBlobClient(blobName);


  try{
    const uploadBlobResponse=await blockBlobClient.upload(req.file.buffer,req.file.size);
    console.log(`Upload block blob ${blobName} successfully`, uploadBlobResponse.requestId);
    res.status(200).send('File uploaded successfully');
  }
  catch (err) {
    console.error('Error uploading file to Azure Blob Storage:', err.message);
    res.status(500).send('Error uploading file');
}

    //console.log("this is " ,req.on);

    // res.status(200).json({
    //   success:true,
    //   message:"file uploaded successfully"
    // })

  //  let data=[];
  //  req.on("data",(chunk)=>{
  //   //collect incoming stream chinks in an array
  //   console.log("chunk is" ,chunk)
  //   data.push(chunk);
  //  })

  //  req.on("end",()=>{
  //    // do something after collecting all parts of incoming file stream.
  //    console.log("data stream is.... ",data)

     
  //    let fileData=Buffer.concat(data);
  //    fs.writeFile(
  //       path.join(__dirname,"example.pdf"),
  //       fileData,
  //       //no need to add encoding here unless you’re working with text data 
  //       (err)=>{
  //           if(err){
  //             res.status(500).json({
  //               success:false,
  //               message:"upload failed "
  //             })
  //           }
  //           else{
  //             console.log("fileData buffer  into tostring() ",fileData.toString())
  //               res.status(200).json({
  //                   success:true,
  //                   message:"uploaded successfully"
  //               })
  //           }
  //       }

  //    )

  //  })


  

}