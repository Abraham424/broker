const express = require('express');
const path = require('path');
const db = require('./db');   
const nodemailer = require('nodemailer');   
const router = express.Router();

router.use(express.urlencoded({ extended: true }));
router.use(express.static(path.join(__dirname, 'css')));

router.post('/contact', (req, res) => {
  const { fname,lname, email ,feedback }= req.body;

  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com', // Gmail SMTP server
    port: 587, // SMTP port
    secure: false, // false for TLS, true for SSL (port 465)
    auth: {
        user: 'abrahamdessie077@gmail.com', // Your Gmail address
        pass: 'bobv bdgh bsos tbqd' // Use the app password you generated
    },
    tls: {
        rejectUnauthorized: false  // Ignore self-signed certificate errors
    }
  });
        const mailOptions = {
            to: 'abrahamdessie1616@gmail.com',
            subject: 'notification',
            text: `You have message from \n Name :${fname} ${lname} \n Email: ${email} \n Message: ${feedback}`
        };
        transporter.sendMail(mailOptions, (err) => {
  
        });
    // Alerts and redirection
    res.send(`
      <script>
        alert('Your your messsage is sent successfully \\n Thank you!!!');
        window.location.href='/';
      </script>
    `);
  });



module.exports = router;
