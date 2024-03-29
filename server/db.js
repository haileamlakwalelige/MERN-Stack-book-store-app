const mongoose = require("mongoose");
require("dotenv").config();

const Connection = async () => {
    try {
        await mongoose.connect(process.env.URL);
        console.log("Connected Successfully!");
    } catch (err) {
        console.log("Error: ", err); 
    }
}

Connection();
