const mongoose = require("mongoose");

//this loads out env properties into the process object
require("dotenv").config();

const dbConnect = () => {
  mongoose
    .connect(process.env.DATABASE_URL)
    .then(() => console.log("DB connection is successful"))
    .catch((error) => {
      console.log("Issue in Db connection");
      console.log(error.message);

      process.exit(1);
    });
};

module.exports = dbConnect;


// var mysql=require('mysql');

// const dbConnect =()=>{

// var connection=mysql.createConnection({
//   host:"supplier123.database.windows.net",
//   user:"supplier123",
//   password:"ARG@supply123",
//   database:"supplier",
//   // ssl: {
//   //   ca: sslCert
//   // },
//   connectTimeout: 10000 
// });

// connection.connect(function(err){
//   if(err){
//     console.log(err.stack)
//     throw err};
//   console.log("connected");
// })

// return connection;

// }


// module.exports=dbConnect;


// const mysql = require('mysql');
// const fs = require('fs');
// const path = require('path');


// const dbConnect = () => {
//   var connection = mysql.createConnection({
//     host: "supplier123.database.windows.net",
//     user: "supplier123",
//     password: "ARG@supply123",
//     database: "supply",
//     // ssl: {
//     //   ca: sslCert
//     // },
//     connectTimeout: 10000
//   });

//   connection.connect(function (err) {
//     if (err) {
//       console.log('Error connecting to the database:', err.stack);
//       return;
//     }
//     console.log("Connected to the database");
//   });

//   return connection;
// };

// module.exports = dbConnect;

