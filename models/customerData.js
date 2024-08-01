// const mongoose = require("mongoose");

// const fileSchema = new mongoose.Schema({
//   filename: String,
//   url: String,
//   uploadedAt: { type: Date, default: Date.now },
// });
// const customerDataSchema = new mongoose.Schema({
//   companyName: {
//     type: String,
//     maxlength: 50,
//   },
//   address: {
//     type: String,
//     maxlength: 150,
//   },
//   company_city: {
//     type: String,
//     maxlength: 50,
//   },
//   fax_number: {
//     type: String,
//     maxlength: 15,
//   },
//   telephone_number: {
//     type: String,
//     maxlength: 15,
//   },
//   email_company: {
//     type: String,
//     maxlength: 100,
//   },
//   website_address: {
//     type: String,
//     maxlength: 100,
//   },
//   name_and_title: {
//     type: String,
//     maxlength: 50,
//   },
//   email_representative: {
//     type: String,
//     maxlength: 100,
//   },
//   mobile_number: {
//     type: String,
//     maxlength: 15,
//   },
//   direct_number: {
//     type: String,
//     maxlength: 15,
//   },
//   established_year: {
//     type: Date,
//     maxlength: 4,
//     default: null,
//   },
//   detailsOfService: {
//     type: String,
//     maxlength: 500,
//   },
//   category: {
//     type: String,
//     maxlength: 500,
//   },
//   subcategory: {
//     type: String,
//     maxlength: 500,
//   },
//   year1: {
//     type: Date,
//     maxlength: 4,
//     default: null,
//   },
//   year2: {
//     type: Date,
//     maxlength: 4,
//     default: null,
//   },
//   year3: {
//     type: Date,
//     maxlength: 4,
//     default: null,
//   },
//   inr1: {
//     type: Number,
//     maxlength: 20,
//   },
//   inr2: {
//     type: Number,
//     maxlength: 20,
//   },
//   inr3: {
//     type: Number,
//     maxlength: 20,
//   },
//   geographicService: {
//     type: String,
//     maxlength: 100,
//   },
//   businessType: {
//     type: String,
//     maxlength: 50,
//   },
//   legalStructure: {
//     type: String,
//     maxlength: 50,
//   },

//   bank_name: {
//     type: String,
//     maxlength: 100,
//     required: false,
//   },
//   bank_address: {
//     type: String,
//     maxlength: 150,
//     required: false,
//   },
//   benificiary_name: {
//     type: String,
//     maxlength: 100,
//     required: false,
//   },
//   internation_baccount_number: {
//     type: String,
//     maxlength: 34,
//     required: false,
//   },
//   swift_bank_bic_code: {
//     type: String,
//     maxlength: 11,
//     required: false,
//   },
//   account_currency: {
//     type: String,
//     maxlength: 10,
//     required: false,
//   },
//   bank_account_number: {
//     type: String,
//     maxlength: 34,
//     required: false,
//   },
//   balance_sheet_certificate: {
//     type: String,
//     required: false,
//   },
//   income_certificate: {
//     type: String,
//     required: false,
//   },
//   consent: {
//     type: Boolean,
//   },
// });

// module.exports = mongoose.model("customerData", customerDataSchema);


const mongoose = require("mongoose");

const fileSchema = new mongoose.Schema({
  filename: { type: String, required: true },
  path: { type: String, required: true },
  uploadedAt: { type: Date, default: Date.now },
});

const customerDataSchema = new mongoose.Schema({
  companyName: {
    type: String,
    maxlength: 50,
  },
  address: {
    type: String,
    maxlength: 150,
  },
  company_city: {
    type: String,
    maxlength: 50,
  },
  fax_number: {
    type: String,
    maxlength: 15,
  },
  telephone_number: {
    type: String,
    maxlength: 15,
  },
  email_company: {
    type: String,
    maxlength: 100,
  },
  website_address: {
    type: String,
    maxlength: 100,
  },
  name_and_title: {
    type: String,
    maxlength: 50,
  },
  email_representative: {
    type: String,
    maxlength: 100,
  },
  mobile_number: {
    type: String,
    maxlength: 15,
  },
  direct_number: {
    type: String,
    maxlength: 15,
  },
  established_year: {
    type: String,
    maxlength: 100,
    default: null,
  },
  detailsOfService: {
    type: String,
    maxlength: 500,
  },
  category: {
    type: String,
    maxlength: 500,
  },
  subcategory: {
    type: String,
    maxlength: 500,
  },
  year1: {
    type: String,
    maxlength: 100,
    default: null,
  },
  year2: {
    type: String,
    maxlength: 100,
    default: null,
  },
  year3: {
    type: String,
    maxlength: 100,
    default: null,
  },
  inr1: {
    type: Number,
    maxlength: 20,
  },
  inr2: {
    type: Number,
    maxlength: 20,
  },
  inr3: {
    type: Number,
    maxlength: 20,
  },
  geographicService: {
    type: String,
    maxlength: 100,
  },
  businessType: {
    type: String,
    maxlength: 50,
  },
  legalStructure: {
    type: String,
    maxlength: 50,
  },
  bank_name: {
    type: String,
    maxlength: 100,
    required: false,
  },
  bank_address: {
    type: String,
    maxlength: 150,
    required: false,
  },
  benificiary_name: {
    type: String,
    maxlength: 100,
    required: false,
  },
  internation_baccount_number: {
    type: String,
    maxlength: 34,
    required: false,
  },
  swift_bank_bic_code: {
    type: String,
    maxlength: 11,
    required: false,
  },
  account_currency: {
    type: String,
    maxlength: 10,
    required: false,
  },
  bank_account_number: {
    type: String,
    maxlength: 34,
    required: false,
  },
  balance_sheet_certificate: fileSchema,
  income_certificate: fileSchema,
  consent: {
    type: Boolean,
  },
});

module.exports = mongoose.model("customerData",customerDataSchema);

