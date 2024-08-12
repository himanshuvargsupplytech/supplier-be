

// const customerData = require("../models/customerData");

// const fs = require("fs");
// const path = require("path");


// require("dotenv").config();

// const dbConnect = require("../config/database");
// // call to dbconnect
// // const connection = dbConnect();

// const { BlobServiceClient, ContainerClient } = require("@azure/storage-blob");

// const blobServiceClient = new BlobServiceClient(
//   `https://${process.env.STORAGE_ACCOUNT_NAME}.blob.core.windows.net/?${process.env.AZURE_STORAGE_SAS_TOKEN}`
// );

// const containerClient = blobServiceClient.getContainerClient(process.env.AZURE_STORAGE_CONTAINER_NAME);

// const modifiedDate=(d)=>
//   {
//     return d.toString().slice(0,15);
//   }


//   const renameFileName = (originalFileName) => {
//     const now = new Date();

//     const istOffset = 5 * 60 * 60 * 1000 + 30 * 60 * 1000; 
//     const istTime = new Date(now.getTime() + istOffset);
//     return   `${originalFileName}-${istTime.toISOString().replace(/:/g, '-').replace('T', '-').replace('Z', '')}`;


// };



  


// async function uploadFileToBlob(file) {
//   //creates blob object
//   const originalFileName=file.originalname;
//   const modifiedFileName =renameFileName(originalFileName)
//   const blobName=modifiedFileName;
//   const blockBlobClient=containerClient.getBlockBlobClient(blobName);

//   console.log("blockBlobClient",blockBlobClient);

//   try{
//     const uploadBlobResponse=await blockBlobClient.upload(file.buffer,file.size);
//     console.log(`Upload block blob ${blobName} successfully`, uploadBlobResponse.requestId);
  


//   }
//   catch(err){
//     console.error('Error uploading file to Azure Blob Storage:', err.message);
   
    

//   }
 
  

//   return blockBlobClient.url;
  
// }

// async function saveFileMetadata(filename, url) {
//   const file = new customerData({ filename, url });
//   await file.save();
// }

// exports.handleCustomerData = async (req, res) => {
//   res.setHeader('Content-Type', 'application/json');
//   const files = req.files;
//   console.log("files",files);

//   const {
//     companyName,
//     address,
//     company_city,
//     fax_number,
//     telephone_number,
//     email_company,
//     website_address,
//     name_and_title,
//     email_representative,
//     customLegalStructure,
//     mobile_number,
//     direct_number,
//     details_of_service,
//     established_year,
//     detailsOfService,
//     year1,
//     year2,
//     year3,
//     inr1,
//     inr2,
//     inr3,
//     geographicService,
//     businessType,
//     category,
//     subcategory,
//     legalStructure:originalLegalStructure,
//     bank_name,
//     bank_address,
//     benificiary_name,
//     internation_baccount_number,
//     swift_bank_bic_code,
//     account_currency,
//     bank_account_number,
//     income_certificate,
//     balance_sheet_certificate,
//     consent,
//   } = req.body;



//   // console.log(customerEntry);

//   // if (!files || !files.balance_sheet_certificate || !files.income_certificate) {
//   //   return res.status(400).send("Required files are missing");
//   // }


//   let legalStructure=originalLegalStructure
//   if(originalLegalStructure==="Other")
//   {
//     legalStructure=customLegalStructure
//   }

//   console.log("modi",customLegalStructure);

//   // if(established_year===null||year1===null||year2===null||year3==null)
//   // {
//   //  return res.status(400).send("year is null")
//   // }

//   try {
//     const balanceSheetFile =  files.balance_sheet_certificate? files.balance_sheet_certificate[0]:null
//     const incomeCertificateFile =  files.income_certificate? files.income_certificate[0]:null

//     console.log("balancesheet  ",balanceSheetFile)
//     console.log("incomecertificate  ",incomeCertificateFile)



   

//   //   const modifiedBalancesheet=renameFileName(balanceSheetFile);
//   //  const  modifiedIncomeCertificate=renameFileName(incomeCertificateFile);

//     console.log(balanceSheetFile)

    
//     let balanceSheetFileUrl = null;
//     let incomeCertificateFileUrl = null;

//     if (balanceSheetFile) {
//       balanceSheetFileUrl = await uploadFileToBlob(balanceSheetFile);
//       const dbFileNameOfBalanceSheet=renameFileName(balanceSheetFile.originalname);

     
//       console.log("balancesheet fileurl",balanceSheetFileUrl)
//       await saveFileMetadata(dbFileNameOfBalanceSheet, balanceSheetFileUrl);

    


//     }

//     if (incomeCertificateFile) {
//       incomeCertificateFileUrl = await uploadFileToBlob(incomeCertificateFile);
//       const dbFileNameOfIncomecertificate=renameFileName(incomeCertificateFile.originalname);
//       await saveFileMetadata(dbFileNameOfIncomecertificate, incomeCertificateFileUrl);
//     }
//     const response = await customerData.create({
//       companyName,
//       address,
//       company_city,
//       fax_number,
//       telephone_number,
//       email_company,
//       website_address,
//       name_and_title,
//       email_representative,
//       mobile_number,
//       direct_number,
//       established_year,
//       details_of_service,
//       year1,
//       year2,
//       year3,
//       inr1,
//       inr2,
//       inr3,
//       geographicService,
//       businessType,
//       category,
//       subcategory,
//       legalStructure,
//       consent,
//       bank_name,
//       bank_address,
//       benificiary_name,
//       internation_baccount_number,
//       swift_bank_bic_code,
//       account_currency,
//       bank_account_number,

//       balance_sheet_certificate: balanceSheetFile ? {
//         originalname: dbFileNameOfBalanceSheet,
//         path: balanceSheetFileUrl,
//       } : null,
//       income_certificate: incomeCertificateFile ? {
//         originalname: dbFileNameOfIncomecertificate,
//         path: incomeCertificateFileUrl,
//       } : null
//     });



//     res.status(200).send("form successfully submitted");
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({
//       success: false,
//       data: "Internal server error",
//       message: error.message,
//     });
//   }
// };





const customerData = require("../models/customerData");
const { BlobServiceClient } = require("@azure/storage-blob");
require("dotenv").config();

const blobServiceClient = new BlobServiceClient(
  `https://${process.env.STORAGE_ACCOUNT_NAME}.blob.core.windows.net/?${process.env.AZURE_STORAGE_SAS_TOKEN}`
);

const containerClient = blobServiceClient.getContainerClient(process.env.AZURE_STORAGE_CONTAINER_NAME);

const renameFileName = (originalFileName) => {
  const now = new Date();
  const istOffset = 5 * 60 * 60 * 1000 + 30 * 60 * 1000; 
  const istTime = new Date(now.getTime() + istOffset);
  return `${originalFileName}-${istTime.toISOString().replace(/:/g, '-').replace('T', '-').replace('Z', '')}`;
};

async function uploadFileToBlob(file) {
  const originalFileName = file.originalname;
  const modifiedFileName = renameFileName(originalFileName);
  const blockBlobClient = containerClient.getBlockBlobClient(modifiedFileName);

  try {
    const uploadBlobResponse = await blockBlobClient.upload(file.buffer, file.size);
    console.log(`Upload block blob ${modifiedFileName} successfully`, uploadBlobResponse.requestId);
  } catch (err) {
    console.error('Error uploading file to Azure Blob Storage:', err.message);
  }

  return { url: blockBlobClient.url, modifiedFileName };
}

exports.handleCustomerData = async (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  const files = req.files;

  const {
    companyName,
    address,
    company_city,
    fax_number,
    telephone_number,
    email_company,
    website_address,
    name_and_title,
    email_representative,
    customLegalStructure,
    mobile_number,
    direct_number,
    details_of_service,
    established_year,
    year1,
    year2,
    year3,
    inr1,
    inr2,
    inr3,
    geographicService,
    businessType,
    category,
    subcategory,
    legalStructure: originalLegalStructure,
    bank_name,
    bank_address,
    benificiary_name,
    internation_baccount_number,
    swift_bank_bic_code,
    account_currency,
    bank_account_number,
    consent,
  } = req.body;

  let legalStructure = originalLegalStructure;
  if (originalLegalStructure === "Other") {
    legalStructure = customLegalStructure;
  }

  try {
    const balanceSheetFile = files.balance_sheet_certificate ? files.balance_sheet_certificate[0] : null;
    const incomeCertificateFile = files.income_certificate ? files.income_certificate[0] : null;

    let balanceSheetFileUrl = null;
    let incomeCertificateFileUrl = null;
    let dbFileNameOfBalanceSheet = null;
    let dbFileNameOfIncomecertificate = null;

    if (balanceSheetFile) {
      const balanceSheetUpload = await uploadFileToBlob(balanceSheetFile);
      balanceSheetFileUrl = balanceSheetUpload.url;
      dbFileNameOfBalanceSheet = balanceSheetUpload.modifiedFileName;
    }

    if (incomeCertificateFile) {
      const incomeCertificateUpload = await uploadFileToBlob(incomeCertificateFile);
      incomeCertificateFileUrl = incomeCertificateUpload.url;
      dbFileNameOfIncomecertificate = incomeCertificateUpload.modifiedFileName;
    }

    const response = await customerData.create({
      companyName,
      address,
      company_city,
      fax_number,
      telephone_number,
      email_company,
      website_address,
      name_and_title,
      email_representative,
      mobile_number,
      direct_number,
      established_year,
      details_of_service,
      year1,
      year2,
      year3,
      inr1,
      inr2,
      inr3,
      geographicService,
      businessType,
      category,
      subcategory,
      legalStructure,
      consent,
      bank_name,
      bank_address,
      benificiary_name,
      internation_baccount_number,
      swift_bank_bic_code,
      account_currency,
      bank_account_number,
      balance_sheet_certificate: balanceSheetFile ? {
        originalname: dbFileNameOfBalanceSheet,
        path: balanceSheetFileUrl,
      } : null,
      income_certificate: incomeCertificateFile ? {
        originalname: dbFileNameOfIncomecertificate,
        path: incomeCertificateFileUrl,
      } : null
    });

    res.status(200).send("Form successfully submitted");
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      data: "Internal server error",
      message: error.message,
    });
  }
};
