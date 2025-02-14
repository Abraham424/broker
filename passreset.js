const express = require('express');
const bodyParser = require('body-parser');
const db = require('./db');    
const nodemailer = require('nodemailer');
const bcrypt = require('bcryptjs'); 
const router = express.Router();

// app name Nodemailer  app password  bobv bdgh bsos tbqd
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

router.post('/passreset', (req, res) => {
    const email = req.body.email;
    const generateSixDigitNumber = () => {
        return Math.floor(100000 + Math.random() * 900000); // Generates a number between 100000 and 999999
    };
    const token = generateSixDigitNumber();
    const expiry = Date.now() + 3600000; // 1 hour

    db.query('UPDATE user SET reset_token = ?, token_expiry = ? WHERE email = ?', [token, expiry, email], (err, result) => {
        if (result.affectedRows === 0) {
            return res.send(`<script>alert('Email not found');
                window.location = '/passreset';</script>`);
        }
// Nodemailer configuration
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
            to: email,
            subject: 'Password Reset',
            text: `You are receiving this email because you (or someone else) have requested the reset of the password for your account.\n\n` +
            `Please insert this code : ${token} \n and new password to change your password` +
            `If you did not request this, please ignore this email.`
        };

        transporter.sendMail(mailOptions, (err) => {
            if (err) 
                return res.status(500).send('Error sending email');
            return res.send(`<script>alert('Password reset email sent');
                 window.location = '/reset';</script>`);
        });

    });
});

router.post('/reseter', (req, res) => {
    const { tok, pass } = req.body;
    const passwordCriteria = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordCriteria.test(pass)) {
        return res.send(`<script>alert('Password does not meet the criteria.');
          window.location = '/reset';</script>`);
    }
 db.query('SELECT * FROM user WHERE reset_token = ? ', [tok], async(err, results) => {
    if (results.length > 0) {
     const user = results[0];
     const hashedPassword = await bcrypt.hash(pass, 10);
db.query('UPDATE user SET password = ?, reset_token = NULL, token_expiry = NULL WHERE reset_token = ?',
     [hashedPassword, tok], (err, result) => {
            if(user.role == 'user'){        
                res.redirect(`/user?role=${user.role}`);
              }
              if(user.role == 'broker'){
                res.redirect(`/broker?role=${user.role}`);
              }
              if(user.role == 'admin'){
                res.redirect(`/admin?role=${user.role}`);
              }    
    });
    }
    });
});

module.exports = router;
