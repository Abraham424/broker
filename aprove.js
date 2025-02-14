const express = require('express');  
const db = require('./db');     
const nodemailer = require('nodemailer');       
const router = express.Router();

router.use(express.urlencoded({ extended: false }));
router.use(express.json());

router.post('/aprove', (req, res) => {
    const { img, img2, img3, img4, img5, price, cat, mod, acount, id, fname, lname, userid } = req.body;
    
    const sql = `
      INSERT INTO property(userId, image_url, image_url2, image_url3, image_url4, image_url5, price, fname, lname, category, model, acount)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
  
    db.query(sql, [userid, img, img2, img3, img4, img5, price, fname, lname, cat, mod, acount], (error, results) => {
        if (error) {
            console.error('Error inserting property:', error);
            return res.send(`<script>alert('Failed to approve property. Please try again.'); window.location.href='/notification';</script>`);
        }

        // Delete from notifications only if insertion is successful
        const deleteSql = "DELETE FROM notif WHERE notifId = ?";
        db.query(deleteSql, [id], (deleteError) => {
            if (deleteError) {
                console.error('Error deleting notification:', deleteError);
                return res.send(`<script>alert('Property approved, but failed to delete notification.'); window.location.href='/notification';</script>`);
            }

            // Send approval notification to seller
            const sqlacc = "SELECT * FROM user WHERE userId = ?";
            db.query(sqlacc, [userid], (accError, result) => {
                if (accError || result.length === 0) {
                    console.error('Error fetching user for notification:', accError);
                    return res.send(`<script>alert('Failed to send notification email.'); window.location.href='/notification';</script>`);
                }

                const selleremail = result[0].email;
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
                    subject: 'Notification',
                    text: `You have a notification from Gimba Broker website. Your property has been approved and posted on our website. Thank you!`
                };

                transporter.sendMail(mailOptions, (err) => {
                    if (err) {
                        console.error('Error sending email:', err);
                        return res.send(`<script>alert('Property approved, but failed to send notification email.'); window.location.href='/notification';</script>`);
                    }
                    res.send(`<script>alert('Approved successfully.'); window.location.href='/notification';</script>`);
                });
            });
        });
    });
});

module.exports = router;