const express = require('express');
const path = require('path');    
const db = require('./db');      
const multer = require('multer');   
const nodemailer = require('nodemailer');  
const router = express.Router();

// Enable parsing of application/x-www-form-urlencoded
router.use(express.urlencoded({ extended: true }));
router.use(express.json());

// Serve static files
router.use(express.static(path.join(__dirname, 'css')));

router.use('/uploads', express.static('uploads'));

const storag = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'uploads/'); // Directory to save uploaded files
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + '-' + file.originalname); // Append timestamp to the filename
    }
  });
  
  // Initialize upload variable with storage settings
  const upload = multer({
     storage:storag,
     fileFilter: (req, file, cb) => {
      const filetypes = /jpeg|jpg|png|gif/; // Allowed image types
      const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
      const mimetype = filetypes.test(file.mimetype);

      if (extname && mimetype) {
          return cb(null, true);
      } else {
               // Clearer error message
               const error = new Error('File upload supports only the following file types: JPEG, JPG, PNG, GIF');
               cb(error); // Signal error
                 }
  }
    });

router.post('/upload', upload.fields([
  { name: 'my_image_1', maxCount: 1 },
  { name: 'my_image_2', maxCount: 1 },
  { name: 'my_image_3', maxCount: 1 },
  { name: 'my_image_4', maxCount: 1 },
  { name: 'my_image_5', maxCount: 1 }
]),async (req, res) => {
  const img_1 = req.files['my_image_1'] ? req.files['my_image_1'][0].filename : null;
  const img_2 = req.files['my_image_2'] ? req.files['my_image_2'][0].filename : null;
  const img_3 = req.files['my_image_3'] ? req.files['my_image_3'][0].filename : null;
  const img_4 = req.files['my_image_4'] ? req.files['my_image_4'][0].filename : null;
  const img_5 = req.files['my_image_5'] ? req.files['my_image_5'][0].filename : null;

  const { price, model, cat, acount ,email } = req.body;
 
  const validAccountPattern = /^\d{8}$/;
  if (!validAccountPattern.test(acount)) {
      return res.send(`<script>alert('invalid acount');
        window.location = '/upload';</script>`);
  }else{
  
  const sqlacc = "SELECT * FROM vertual_bank WHERE acount = ? ";
  db.query(sqlacc, [acount], (error, resul) => {

    if (resul.length === 0) {
      return res.send(`<script>alert('invalid vertual bank acount'); 
  window.location = '/upload';</script>`);
    }else{
    // Step 1: Get User ID from the user table
    const sqlUser = "SELECT * FROM user WHERE email = ?";
    db.query(sqlUser, [email], (error, result) => {
      if (result.length === 0) {
        return res.send(`<script>alert('invalid email'); 
    window.location = '/upload';</script>`);
      }
      if (result.length > 0) {
        let userId = result[0].userId; 
        let fname = result[0].fname; 
        let lname = result[0].lname; 
  const sql = `INSERT INTO notif (userId, image_url, image_url2, image_url3, image_url4, image_url5,
  price, fname,lname, category, model, acount) VALUES ( ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
db.query(sql, [userId ,img_1, img_2, img_3, img_4, img_5, price,fname,lname,cat, model, acount],
  (error, results) => {

  });
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
          to: 'abrahamdessie1616@gmail.com',
          subject: 'notification',
          text: `You have notification from Gimba Broker website, new property was uploaded
          please login to the website and aprove or disaprove the property`
      };
      transporter.sendMail(mailOptions, (err) => {

      });

  res.send(`<script>alert('property uploaded successfully we sent mesage by your email '); 
    window.location = '/user?role=user';</script>`);
  }
}); 
}
});
  }
});

router.post('/uploadb', upload.fields([
  { name: 'my_image_1', maxCount: 1 },
  { name: 'my_image_2', maxCount: 1 },
  { name: 'my_image_3', maxCount: 1 },
  { name: 'my_image_4', maxCount: 1 }
]),async (req, res) => {

  if (!req.files || req.files.length === 0) {
    return res.status(400).send('No files uploaded.');
  }
  const img_1 = req.files['my_image_1'] ? req.files['my_image_1'][0].filename : null;
  const img_2 = req.files['my_image_2'] ? req.files['my_image_2'][0].filename : null;
  const img_3 = req.files['my_image_3'] ? req.files['my_image_3'][0].filename : null;
  const img_4 = req.files['my_image_4'] ? req.files['my_image_4'][0].filename : null;

  const { price, model, cat, acount ,email} = req.body;
 
  const validAccountPattern = /^\d{8}$/;
  if (!validAccountPattern.test(acount)) {
      return res.send(`<script>alert('invalid acount');
        window.location = '/uploadb';</script>`);
  }else{
  
  const sqlacc = "SELECT * FROM vertual_bank WHERE acount = ? ";
  db.query(sqlacc, [acount], (error, resul) => {

    if (resul.length === 0) {
      return res.send(`<script>alert('invalid vertual bank acount'); 
  window.location = '/uploadb';</script>`);
    }else{
    // Step 1: Get User ID from the user table
    const sqlUser = "SELECT * FROM user WHERE email = ? ";
    db.query(sqlUser, [email], (error, result) => {
      if (result.length === 0) {
        return res.send(`<script>alert('invalid email'); 
    window.location = '/uploadb';</script>`);
      }
      if (result.length > 0) {
        let userId = result[0].userId; 
        let fname = result[0].fname; 
        let lname = result[0].lname; 
        const sql = `
        INSERT INTO property(userId ,image_url, image_url2, image_url3, image_url4, price, fname, lname, category, model, acount)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?)`;
db.query(sql, [userId ,img_1, img_2, img_3, img_4, price,fname,lname,cat, model, acount],
  (error, results) => {

  });

  res.send(`<script>alert('property uploaded successfully '); 
    window.location = '/broker?role=broker';</script>`);
  }
}); 
}
});
}
});

// Error handling middleware
router.use((err, req, res, next) => {
  if (err) {
      // Handle file validation error
      if (err instanceof multer.MulterError) {
          return res.send(`<script>alert('Multer Error: ${err.message}'); 
            window.location.href='/uploadb';</script>`);
      } else {
          return res.send(`<script>alert('Error: ${err.message}'); 
            window.location.href='/uploadb';</script>`);
      }
  }
  next();
});

module.exports = router;