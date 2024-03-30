const express = require('express');
const Student = require('../models/Student');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');


const studentRouter = express.Router();


studentRouter.post("/register", async (req, res)=>{
    try{
        const {username, email, password, role}=req.body;
        const student = await Student.findOne({username})
        if(student){
            return res.json({message:"Student is Registered"})
        }
        const hashPassword = await bcrypt.hash(password, 10)
        const newStudent = new Student({
            username,
            email,
            password:hashPassword,
            role
        })

        await newStudent.save();
        return res.json({registered:true})
    }catch(err){
        return res.json({message:"Error in registering student"})
    }
})


module.exports = studentRouter;