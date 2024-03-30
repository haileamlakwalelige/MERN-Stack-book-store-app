const express = require("express");
require('dotenv').config();
const Connection = require("./db");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const {router} = require("./routes/auth");
const studentRouter = require("./routes/student");



const app = express();
app.use(express.json())
app.use(cors({
    origin:true,
    credentials:true
}))
app.use(cookieParser())
app.use('/auth', router);
app.use("/student", studentRouter);


app.listen(process.env.PORT, ()=>{
    console.log("Server is Running Successfully!")
})