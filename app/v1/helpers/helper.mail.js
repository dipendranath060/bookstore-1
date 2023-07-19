const nodemailer = require("nodemailer");
require("dotenv").config();

const transporter = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  port: process.env.MAIL_PORT,
  // secure: true,
  auth: {
    user: process.env.APP_EMAIL,
    pass: process.env.APP_EMAIL_PASSWORD,
  }
});

async function main(to, subject, html) {
    try{
        await transporter.sendMail({
            from: process.env.APP_EMAIL, to, subject, html
        });
        console.log("Message sent to: ", to);
    }catch(err)
    {
      console.log("Error: ", err.message);
        throw err;        
    }
}

module.exports = main;