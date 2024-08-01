const mongoose = require("mongoose");

//this loads out env properties into the process object
require("dotenv").config();

const dbConnect = () => {
  mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => console.log("DB connection is successful"))
    .catch((error) => {
      console.log("Issue in Db connection");
      console.log(error.message);

      process.exit(1);
    });
};

module.exports = dbConnect;

