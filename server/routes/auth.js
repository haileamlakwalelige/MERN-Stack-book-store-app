const express = require("express");
const Admin = require("../models/admin");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const Student = require("../models/Student");

const router = express.Router();

router.post("/login", async (req, res) => {
    const { username, password, role } = req.body;

    if (role === 'admin') {
        try {
            const admin = await Admin.findOne({ username });
            if (!admin) {
                return res.status(401).json({ message: "Admin not Registered" });
            }

            const validPassword = await bcrypt.compare(password, admin.password);
            if (!validPassword) {
                return res.status(401).json({ message: "Wrong Password" });
            }

            const token = jwt.sign({ username: admin.username, role: 'admin' }, process.env.Admin_key);
            res.cookie("token", token, { httpOnly: true, secure: true });
            return res.json({ login: true, role: 'admin' });
        } catch (error) {
            console.error("Error:", error);
            return res.status(500).json({ message: "Internal Server Error" });
        }
    } else if (role === "student") {
        try {
            const student = await Student.findOne({ username });
            if (!student) {
                return res.status(401).json({ message: "Student not Registered" });
            }

            const validPassword = await bcrypt.compare(password, student.password);
            if (!validPassword) {
                return res.status(401).json({ message: "Wrong Password" });
            }

            const token = jwt.sign({ username: student.username, role: 'student' }, process.env.Student_Key);
            res.cookie("token", token, { httpOnly: true, secure: true });
            return res.json({ login: true, role: 'student' });
        } catch (error) {
            console.error("Error:", error);
            return res.status(500).json({ message: "Internal Server Error" });
        }
    } else {
        return res.status(400).json({ message: "Invalid role" });
    }
});

const verifyAdmin = (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).json({ message: "Unauthorized" });
    } else {
        jwt.verify(token, process.env.Admin_key, (err, decoded) => {
            if (err) {
                return res.status(401).json({ message: "Unauthorized" });
            } else {
                req.username = decoded.username;
                req.role = decoded.role;
                next();
            }
        });
    }
};

const verifyUser = (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).json({ message: "Invalid User" });
    } else {
        jwt.verify(token, process.env.Admin_key, (err, decoded) => {
            if (err) {
                jwt.verify(token, process.env.Student_Key, (err, decoded) => {
                    if (err) {
                        return res.status(401).json({ message: "Unauthorized user" });
                    } else {
                        req.username = decoded.username;
                        req.role = decoded.role;
                        next();
                    }
                });
            } else {
                req.username = decoded.username;
                req.role = decoded.role;
                next();
            }
        });
    }
};

router.get("/verify", verifyUser, (req, res) => {
    return res.json({ login: true, role: req.role });
});
router.get("/logout", (req, res) => {
    res.clearCookie("token");
    return res.json({ logout: true });
});

module.exports = {
    router,
    verifyAdmin,
};
