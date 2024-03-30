const express = require("express");
const Student = require("../models/Student");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { verifyAdmin } = require("./auth"); // Ensure this path is correct

const studentRouter = express.Router();

studentRouter.post("/register", verifyAdmin, async (req, res) => {
    try {
        const { username, email, password, role } = req.body;
        const student = await Student.findOne({ username });

        if (student) {
            return res.json({ message: "Student is already registered" });
        }

        const hashPassword = await bcrypt.hash(password, 10);
        const newStudent = new Student({
            username,
            email,
            password: hashPassword,
            role
        });

        await newStudent.save();
        return res.json({ registered: true });
    } catch (err) {
        console.error("Error in registering student:", err);
        return res.status(500).json({ message: "Error in registering student" });
    }
});

module.exports = studentRouter;
