const express = require("express");
const Admin = require("../models/admin");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

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
    } else if (role === "client") {
        // Handle client login
        return res.status(501).json({ message: "Client login not implemented yet" });
    } else {
        return res.status(400).json({ message: "Invalid role" });
    }
});

module.exports = router;
