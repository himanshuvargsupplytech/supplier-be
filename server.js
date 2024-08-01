//importing and instantiate express
const express = require("express");
const app = express();
const helmet=require("helmet");



require("dotenv").config();
const PORT = process.env.PORT || 4000;

// use middleware
app.use(express.json());

app.use(helmet());

//mounting of routes
// app.use(express.urlencoded({ extended: false }));

const CustomerDataRoutes = require("./routes/submitData");
app.use("/api/v1", CustomerDataRoutes);

const SellerDataRoutes = require("./routes/queryUserSearch");

app.use("/api/v1", SellerDataRoutes);

const UserRegistrations=require("./routes/user")
app.use("/api/v1",UserRegistrations);


const userLogin=require("./routes/user")
app.use("/api/v1",userLogin)


app.listen(PORT, () => {
  console.log(`app is running successfully at ${PORT}`);
});

//connect to the database

const dbConnect = require("./config/database");
// call to dbconnect
dbConnect();

// app.get("/", (req, res) => {
//     res.send(`<h1>This is HOMEPAGE </h1>`)

// })
