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
router.use('/reports', express.static('reports'));

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'reports/'); // Directory to save uploaded files
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname); // Append timestamp to the filename
    }
});

// Initialize upload variable with storage settings
const upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
      const filetypes = /pdf|doc|docx/;
      const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
      const mimetype = filetypes.test(file.mimetype) || 
                       file.mimetype === 'application/msword' || 
                       file.mimetype === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'; // For .docx
  
      if (extname && mimetype) {
          return cb(null, true);
      } else {
          const error = new Error('File upload supports only the following file types: pdf, doc, docx');
          cb(error); // Signal error
      }
  }
});

router.post('/report', upload.fields([
    { name: 'pdf_1', maxCount: 1 },
    { name: 'pdf_2', maxCount: 1 },
    { name: 'pdf_3', maxCount: 1 },
]), async (req, res) => {
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.send(`<script>alert('Upload failed: No files uploaded.'); window.location.href='/report';</script>`);
    }
else{
    const pdf_1 = req.files['pdf_1'] ? req.files['pdf_1'][0].filename : null;
    const pdf_2 = req.files['pdf_2'] ? req.files['pdf_2'][0].filename : null;
    const pdf_3 = req.files['pdf_3'] ? req.files['pdf_3'][0].filename : null;
    const userId = 2; // Example userId

    const sql = `INSERT INTO report (userId, property, transaction, solled) VALUES (?, ?, ?, ?)`;
    db.query(sql, [userId, pdf_1, pdf_2, pdf_3], (error, results) => {
        if (error) {
            console.error('Database error:', error);
            return res.send(`<script>alert('Database error: ${error.message}'); window.location.href='/report';</script>`);
        }
    });

    // Nodemailer configuration
    const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
            user: 'abrahamdessie077@gmail.com', // Your Gmail address
            pass: 'bobv bdgh bsos tbqd' // Use the app password you generated
        },
        tls: {
            rejectUnauthorized: false
        }
    });

    const mailOptions = {
        to: 'abrahamdessie077@gmail.com',
        subject: 'Notification',
        text: `You have a report from the broker.`
    };

    transporter.sendMail(mailOptions, (err) => {
        if (err) {
            console.error('Email error:', err);
            return res.send(`<script>alert('Email sending error: ${err.message}'); window.location.href='/report';</script>`);
        }
    });

    res.send(`<script>alert('Report sent successfully'); 
        window.location = '/broker?role=broker';</script>`);
    }
});

// Error handling middleware
router.use((err, req, res, next) => {
    if (err) {
        if (err instanceof multer.MulterError) {
            return res.send(`<script>alert('Multer Error: ${err.message}'); window.location.href='/report';</script>`);
        } else {
            return res.send(`<script>alert('Error: ${err.message}'); window.location.href='/report';</script>`);
        }
    }
    next();
});

// View report
router.get('/api/data/report', (req, res) => {
    const sql = "SELECT * FROM report ORDER BY reportId DESC LIMIT 1;";
    db.query(sql, (err, results) => {
        if (err) {
            console.log('Database error:', err);
            return res.status(500).json({ error: 'Database error' });
        }
        res.json(results); // Send data as JSON
    });
});

module.exports = router;