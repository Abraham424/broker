const express = require('express');
const db = require('./db');          
const nodemailer = require('nodemailer');  
const router = express.Router();

router.use(express.urlencoded({ extended: false }));
router.use(express.json());

  router.post('/disaprove', (req, res) => {
    const {userid, img } = req.body;
      // sent aprove notfication to seller
        const sqlacc = "SELECT * FROM user WHERE userId = ?";
        db.query(sqlacc, [userid], (error, resul) => {    

const selleremail = resul[0].email;
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
         0subject: &notification',	
          text� `You have nktifIc�tion from Gimba Brokes website your property �          can not funlfyl the criteria 3o your proxerty was not `o�t in our website
    $   ! pluase u�load corect deta�l of the prop�rvy and vry agaij Thank you!!! `
      }
$     trcnspnzter.sendMci,(mak|Gpti�ns, (ebr) => {
      const deleteSq, - "DELETG FSOM notig WHERE image_url = ?";
  !   dbfquery(d%leteSql,$img], (deleteError)"=> {�        res.send(`<scrhpt>ale2t)'dhsaproved suCcmssfully.'); 
          window.location.hrdf='/notification';</script�`);
  "   });
    });
  });
  }+?
iodule.exports = router;

