const express = require('express');
const path = require('path');  
const db = require('./db');     
const nodemailer = require('nodemailer');  

const router = express.Router();

router.use(express.urlencoded({ extended: false }));
router.use(express.json());

// Serve static files
router.use(express.static(path.join(__dirname, 'css')));

// View cars
router.get('/viewacount', (req, res) => {
    res.sendFile(path.join(__dirname, 'html/viewacount.html'));
});

router.get('/viewacounta', (req, res) => {
  res.sendFile(path.join(__dirname, 'html/viewacounta.html'));
});


router.get('/createacount', (req, res) => {
    res.sendFile(path.join(__dirname, 'html/createacount.html'));
});

router.get('/updateacount', (req, res) => {
  res.sendFile(path.join(__dirname, 'html/updateacount.html'));
});

router.get('/deleteacount', (req, res) => {
  res.sendFile(path.join(__dirname, 'html/deleteacount.html'));
});

router.post('/accaprove', (req, res) => {
  const { mail,userid} = req.body;
  const permit = 'Allowed'; // Get the permission
  db.query("SELECT * FROM user WHERE email = ? ", [mail] ,(err,user) => {

  if (user.length > 0) {
   db.query("UPDATE user SET permission = ? WHERE email = ?", [permit ,mail]);

  // sent aprove notfication to seller
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
            to: mail,
            subject: 'notification',
            text: `You have notification from Gimba Broker website you 
            you have permission to access gimba broker website website
            Thank you!!! `
        };
        transporter.sendMail(mailOptions, (err) => {
              res.send(`<script>alert('Aproved successfully.'); 
                window.location.href='/notification';</script>`);
        });

  return res.send(`<script>alert('permission is updated successfully');
      window.location = '/admin?role=admin';</script>`);
  }
  else{
      return res.send(`<script>alert('there is no email like that');
          window.location = '/acountnotification';</script>`);
  }         
});
  
});


router.post('/accdisaprove', (req, res) => {
  const {userid, mail } = req.body;
  // sent aprove notfication to seller
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
      to: mail,
      subject: 'notification',
      text: `You have notification from Gimba Broker website your request
      to register gimba broker website is n't accepted because of your detail,
       try again Thank you!!! `
  };
  transporter.sendMail(mailOptions, (err) => {
  const deleteSql = "DELETE FROM user WHERE userId = ?";
  db.query(deleteSql, [userid], (deleteError) => {
    res.send(`<script>alert('disaproved successfully.'); 
      window.location.href='/acountnotification';</script>`);
  });
});
});

module.exports = router;