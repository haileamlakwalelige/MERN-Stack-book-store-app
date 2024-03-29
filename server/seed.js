const express = require("express");
const bcrypt = require("bcrypt");

const Admin = require("./models/admin");
require("./db");

const adminAccount = async () => {
  try {
    const adminCount = await Admin.countDocuments();
    if (adminCount === 0) {
      const hashPassword = await bcrypt.hash("adminpassword", 10);
      const newAdmin = new Admin({
        username: "admin",
        password: hashPassword,
      });

      await newAdmin.save();
      console.log("Account created")
    }else{
        console.log("Account already existed")
    }
  } catch (err) {
    console.log("ERror", err);
  }
};


adminAccount();