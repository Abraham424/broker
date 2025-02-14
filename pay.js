const express = require('express');
const db = require('./db');  
const bcrypt = require('bcryptjs');
const nodemailer = require('nodemailer');  
// Import the uuid library
const { v4: uuidv4 } = require('uuid');
const router = express.Router();

// Middleware to parse request bodies
router.use(express.urlencoded({ extended: false }));
router.use(express.json());

// Handle payment processing
router.post('/pay', async (req, res) => {
  const { email, pass, id, cat, ofname , olname, price } = req.body; // Assume these are sent from the form

 db.query("SELECT * FROM user WHERE email = ?" , [email],async (err,user) =>{

  if (user.length > 0) {
    const fname =user[0].fname;
    const lname =user[0].lname;
    const acount = user[0].acount;
  try { 
             const isMatch = await bcrypt.compare(pass, user[0].password);
            if (isMatch) {
        db.query("SELECT * FROM property WHERE propertyId = ? ", [id], (err,propertyResult) => {
    
        const acounts = propertyResult[0].acount; //seller acount
        const pric = parseInt(price);
        const total =  pric + pric * 0.02;

         db.query("SELECT * FROM vertual_bank WHERE acount = ?", [acount], (err ,balanceResult) => {

        const bal = balanceResult[0].balance;
        if (bal >= total) {
          const b=bal-total;

          // Deduct balance from buyer's account
           db.query("UPDATE vertual_bank SET balance = ? WHERE acount = ?", [b, acount]);

          // Pay to seller
           db.query("SELECT * FROM vertual_bank WHERE acount = ?", [acounts], (err,sellerBalanceResult) => {

          const sellerBal = sellerBalanceResult[0].balance;
          const crd = pric - pric * 0.02;
         db.query("UPDATE vertual_bank SET balance = ? WHERE acount = ?", [sellerBal + crd , acounts]);
        });
          // Pay to broker
           db.query("SELECT * FROM vertual_bank WHERE acount = '10001002'",(err,brokerBalanceResult) =>{

          const brokerBal = brokerBalanceResult[0].balance;
           db.query("UPDATE vertual_bank SET balance = ? WHERE acount = '10001002'", [brokerBal + pric * 0.04]);
        });
          /* Pay to government
          const [govBalanceResult] = await dbbank.query("SELECT balance FROM vertual_bank WHERE acount = '5'");
          const govBal = govBalanceResult[0].balance;
          await dbbank.query("UPDATE vertual_bank SET balance = ? WHERE acount = '5'", [govBal + pric * 0.04]);
*/
          // Create transaction
         const crd = pric - pric * 0.02;
         const t = `TXN-${uuidv4()}`;
         db.query("INSERT INTO transaction (transactionNo, amount, AccNoFrom, AccNoTo) VALUES (?, ?, ?, ?)", [ t, pric, acount, acounts]);

          // Move sold property to sold table and remove from property
         db.query("SELECT * FROM property WHERE propertyId = ?", [id], (err, soldProperty) => {

          const sold = soldProperty[0];
          const com = pric * 0.04;
           db.query("INSERT INTO solled ( image_url, price, category, seller, buyer, comission) VALUES ( ?, ?, ?, ?, ?, ?)",
            [ sold.image_url, sold.price, cat, `${ofname} ${olname}`, `${fname} ${lname}`,com]);
           db.query("DELETE FROM property WHERE propertyId = ?", [id]);
        });
//send email notification to seller 

 db.query("SELECT * FROM user WHERE acount = ?" , [acounts] ,(err,seler) => {


if (seler.length > 0) {
  const seler_data = seler[0];
  const seler_email = seler_data.email;

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
          to: seler_email,
          subject: 'notification',
          text: `You property that you want to solled and posted in Gimba Broker website was solled 
          today and the price is send to your vertual bank acount you payed to the service only 2% 
          commision,
          \n you have creadited: ${crd}
            \n Transsaction number: ${t}
            \n thank you!!!!`
      };
      transporter.sendMail(mailOptions, (err) => {

      });
}
});
//send email notification to buyer 
 db.query("SELECT * FROM user WHERE acount = ?" , [acount], (err,buyer) =>{

if (buyer.length > 0) {
  const buyer_data = buyer[0];
  const buyer_email = buyer_data.email;
 // Nodemailer configuration
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
      const mailOptionb = {
          to: buyer_email,
          subject: 'notification',
          text: `You have bought property that you want to buy in Gimba Broker website 
           and the price is payed by vertual bank acount you payed only 2% to the service
           \n totaly you pay : ${total}
           \n Transsaction number: ${t}
           \n thank you!!!!`
      };
      transporterb.sendMail(mailOptionb, (err) => {

      });

}
  
});
          return res.send(`<script>alert('You have paid successfully. Thank you! ');
            alert('Transaction Number: ${t}');
             window.location = '/user?role=user';</script>`);
   }
       else {         
          return res.send(`<script>alert('You cannot pay; you have insufficient balance. Thank you.');
             window.location = '/user?role=user';</script>`);
        }
      });         
      });
      } else {
        return res.send(`<script>alert('Your password is not correct. Please enter the correct password.');
           window.location = '/order';</script>`);
      }  
    }
   catch (err) {
    console.error('Database query error: ', err);
    return res.status(500).send("Internal server error.");
  }
  }
else{
  return res.send(`<script>alert('Invalid email. Thank you.');
    window.location = '/order';</script>`);
}
  
});
});

module.exports = router;