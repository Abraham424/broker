const express = require('express');
const db = require('./db');   
const path = require('path');
const nodemailer = require('nodemailer');  
const router = express.Router();

router.use(express.urlencoded({ extended: false }));
router.use(express.json());
let u ='';
router.post('/neg', (req, res) => {
    const {uid} = req.body;
    u = uid;
        res.sendFile(path.join(__dirname, 'html/neg.html'));
});

  router.post('/negotiation', (req, res) => {
    const { neg, email} = req.body;
  
      // sent negotiation notfication to seller
        const sqlacc = "SELECT * FROM user WHERE userId = ?";
        db.query(sqlacc, [u], (error, resul) => {    
const selleremail = resul[0].email;

// sent to broker
const transporterb = nodemailer.createTransport({
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
      const mailOption = {
          to: 'abrahamdessie1616@gmail.com',
          subject: 'notification',
          text: `You have notification from Gimba Broker website
          user with email:${email} sent message: ${neg} to
          seller email :${selleremail}
          Thank you!!! `
      };
      transporterb.sendMail(mailOption, (err) => {
    });

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
          to: selleremail,
          subject: 'notification',
          text: `You have notification from Gimba Broker website your 
          there is negotiation message from seller,
          the message is :${neg}
          please sent email to abrahamdessie1616@gmail.com if you want sell by this price
          Thank you!!! `
      };
      transporter.sendMail(mailOptions, (err) => {
        res.send(`<script>alert('you sent negotiation message successfully to seller.'); 
          window.location = '/user?role=user';</script>`);
    });
  });
  });

module.exports = router;

