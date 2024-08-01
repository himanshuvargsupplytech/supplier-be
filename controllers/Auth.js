const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/userSchema");

const cookie=require("cookie-parser")




exports.signup = async (req, res) => {
  //extract data from the json body
  try {
    const { fname, email, role, password } = req.body;
    console.log("Request body:", req.body); // Log the entire request body

    console.log("name is", fname);
    console.log("password is", password);

    //checking if user is already present in db

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "Please login, you are already a user",
      });
    }

    // Secure password or hashing the password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // saving to db

    const user = await User.create({
      fname,
      email,
      password: hashedPassword,
      role,
    });

    const userObject = user.toObject();

    //generating token for user

    const token = jwt.sign(
      {
        id: user._id,
        email,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: 3*24*60*60*1000,
      }
    );

    console.log(token);

    userObject.token = token;
    user.password = undefined;

    return res.status(201).json({
      success: true,
      user: userObject,
      message: "User created successfully",
    });
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({
      success: false,
      message: "User cannot be registered, please try again",
    });
  }
};

exports.login = async (req, res) => {
  const { password, email } = req.body;

  try {
    if (!(password && email)) {
      return res.status(400).json({
        message: "please input all values",
      });
    }

    const user = await User.findOne({ email });

    // console.log("dbemail", user);

    if (!user) {
      return res.status(404).send("email not found");
    }

    const payload = {
      id: user._id,
      email: user.email,
      name: user.fname,
      role: user.role,
    };

    console.log("pyaload",payload)

    // bcrypt.compare(password,user.password,(error,result)=>{

    if (await bcrypt.compare(password, user.password)) {
      let token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: "3d",
      });

      // user=user.toObject();//why this is not working 
      user.token = token;
      user.password = undefined;
      console.log("token",token)

      const options = {
        expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
        httpOnly: true,
      };
      res.cookie("himcookie", token, options).status(200).json({
        success: true,
        token,
        user,
        message: "user login successfully",
      });

      console.log("cookies",res.cookie)
    } else {
      return res.status(400).json({
        success: false,
        message: "password do not match",
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "error in logging",
    });
  }
};

