const express = require("express");
const app = express();
require("dotenv").config();

const port = 5000;

app.use(express.urlencoded({ extended: false }));

//nodemailer config
const nodemailer = require("nodemailer");

//create a transporter for nodemailer, which uses the createTransport function
//that takes in an object
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.AUTH_EMAIL,
        pass: process.env.AUTH_PASS
    }
})

//testing trnsporter if it is working using very function which takes in a callback
transporter.verify((error, success) => {
    if (error) {
        console.log(error)
    } else {
        console.log("ready");
        console.log(success);
    }
})

app.post("/sendmail", (req, res) => {
    const { to, subject, message } = req.body;

    //create mailOptions that transporter will use to send mail
    const mailOptions = {
        from: process.env.AUTH_EMAIL,
        to: to,
        subject: subject,
        text: message
    }

    transporter.sendMail(mailOptions).then(() => {
        res.json("Message sent successfully")
    }).catch((error) => {
        res.json({"error": error})
    })
})

app.listen(port, () => {
    console.log(`http://localhost:${port}`)
})