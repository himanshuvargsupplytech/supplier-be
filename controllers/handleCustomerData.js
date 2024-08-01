

const customerData = require("../models/customerData");

const fs = require("fs");
const path = require("path");

const { formatDateToMySQL } = require("../utils/dateUtils");
require("dotenv").config();

const dbConnect = require("../config/database");
// call to dbconnect
// const connection = dbConnect();

const { BlobServiceClient, ContainerClient } = require("@azure/storage-blob");

const blobServiceClient = new BlobServiceClient(
  `https://${process.env.STORAGE_ACCOUNT_NAME}.blob.core.windows.net/?${process.env.AZURE_STORAGE_SAS_TOKEN}`
);

const containerClient = blobServiceClient.getContainerClient(process.env.AZURE_STORAGE_CONTAINER_NAME);

async function extractMetadata(headers) {
  const contentType = headers['content-type'];
  const fileType = contentType.split('/')[1];
  const contentDisposition = headers['content-disposition'];
  const caption = headers['x-image-caption'] || 'No caption provided';
  const matches = /filename="([^"]+)/i.exec(contentDisposition);
  const fileName = matches?.[1] || `image-${Date.now()}.${fileType}`;

  return { fileName, caption, fileType };
}

async function uploadFileToBlob(file) {
  const blockBlobClient = containerClient.getBlockBlobClient(file.originalname);
  // var accessCondition = AccessCondition.GenerateIfNotExistsCondition();

  await blockBlobClient.uploadData(fs.readFileSync(file.path));
  return blockBlobClient.url;
  
}

async function saveFileMetadata(filename, url) {
  const file = new customerData({ filename, url });
  await file.save();
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
    established_year,
    detailsOfService,
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
    legalStructure:originalLegalStructure,
    bank_name,
    bank_address,
    benificiary_name,
    internation_baccount_number,
    swift_bank_bic_code,
    account_currency,
    bank_account_number,
    income_certificate,
    balance_sheet_certificate,
    consent,
  } = req.body;



  // console.log(customerEntry);

  // if (!files || !files.balance_sheet_certificate || !files.income_certificate) {
  //   return res.status(400).send("Required files are missing");
  // }


  let legalStructure=originalLegalStructure
  if(originalLegalStructure==="Other")
  {
    legalStructure=customLegalStructure
  }

  console.log("modi",customLegalStructure);

  // if(established_year===null||year1===null||year2===null||year3==null)
  // {
  //  return res.status(400).send("year is null")
  // }

  try {
    const balanceSheetFile =  files.balance_sheet_certificate? files.balance_sheet_certificate[0]:null
    const incomeCertificateFile =  files.income_certificate? files.income_certificate[0]:null


  //   const renameFileName = (item) => {
  //     item.originalname = item.originalname + Date.now();
  //     return item;
  //   };

  //   const modifiedBalancesheet=renameFileName(balanceSheetFile);
  //  const  modifiedIncomeCertificate=renameFileName(incomeCertificateFile);

    console.log(balanceSheetFile)

    
    let balanceSheetFileUrl = null;
    let incomeCertificateFileUrl = null;

    if (balanceSheetFile) {
      balanceSheetFileUrl = await uploadFileToBlob(balanceSheetFile);
      await saveFileMetadata(balanceSheetFile.originalname, balanceSheetFileUrl);
    }

    if (incomeCertificateFile) {
      incomeCertificateFileUrl = await uploadFileToBlob(incomeCertificateFile);
      await saveFileMetadata(incomeCertificateFile.originalname, incomeCertificateFileUrl);
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
      detailsOfService,
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
      balance_sheet_certificate:files.balance_sheet_certificate?balanceSheetFile:null,
      income_certificate:files.income_certificate?incomeCertificateFile:null
    });



    res.status(200).send("Files uploaded to Azure Blob Storage and metadata saved to MongoDB");
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      data: "Internal server error",
      message: error.message,
    });
  }
};
