const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const db = require('./db');    
const multer = require('multer');   
const bcrypt = require('bcryptjs'); 
const router = express.Router();

router.use(bodyParser.urlencoded({ extended: true }));
router.use(express.static(path.join(__dirname, 'css')));  
router.use('/idcard', express.static('idcard'));

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'idcard/'); // Directory to save uploaded files
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname); // Keep original filename
    }
});

const upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        const filetypes = /jpeg|jpg|png|gif/; // Allowed image types
        const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
        const mimetype = filetypes.test(file.mimetype);

        if (extname && mimetype) {
            return cb(null, true);
        } else {
            const error = new Error('File upload supports only JPEG, JPG, PNG, GIF.');
            cb(error);
        }
    }
});

router.post('/signup', upload.single('idcard'), async (req, res) => {
    const { fname, lname, mail, number, pass, cpass, acount, add, gender } = req.body;

    const sqlUserCheck = 'SELECT * FROM gimba WHERE fname = ? AND lname = ?';
    db.query(sqlUserCheck, [fname, lname], async (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Database error. Please try again.');
        }

        if (results.length === 0) {
            return res.send(`<script>alert('User not found in Gimba'); window.location = '/signup';</script>`);
        }

        const validAccountPattern = /^\d{8}$/;
        if (!validAccountPattern.test(acount)) {
            return res.send(`<script>alert('Invalid account number.'); window.location = '/signup';</script>`);
        }

        const passwordCriteria = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        const sqlEmailCheck = 'SELECT * FROM user WHERE email = ?';
        db.query(sqlEmailCheck, [mail], async (err, results) => {
            if (err) {
                console.error(err);
                return res.status(500).send('Database error. Please try again.');
            }

            if (results.length > 0) {
                return res.send(`<script>alert('Email already exists.'); window.location = '/signup';</script>`);
            }

            const sqlAccountCheck = 'SELECT * FROM vertual_bank WHERE acount = ?';
            db.query(sqlAccountCheck, [acount], async (err, result) => {
                if (err) {
                    console.error(err);
                    return res.status(500).send('Database error. Please try again.');
                }

                if (result.length === 0) {
                    return res.send(`<script>alert('Invalid virtual bank account.'); window.location = '/signup';</script>`);
                }

                if (!passwordCriteria.test(pass)) {
                    return res.send(`<script>alert('Password does not meet the criteria.'); window.location = '/signup';</script>`);
                }

                if (pass !== cpass) {
                    return res.send(`<script>alert('Confirmation password does not match.'); window.location = '/signup';</script>`);
                }

                try {
                    const hashedPassword = await bcrypt.hash(pass, 10); // Salt rounds: 10
                    const sqlInsert = 'INSERT INTO user (fname, lname, gender, phone, address, email, password, acount, idcard) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)';
                    db.query(sqlInsert, [fname, lname, gender, number, add, mail, hashedPassword, acount, req.file.filename], (err) => {
                        if (err) {
                            console.error(err);
                            return res.send(`<script>alert('Registration failed.'); window.location.href='/signup';</script>`);
                        }
                        res.send(`<script>alert('Successfully registered. Wait for admin permission email sent.'); 
                            window.location.href='/';</script>`);
                    });
                } catch (err) {
                    console.error('Error inserting user:', err);
                    res.status(500).send('Database error. Please try again.');
                }
            });
        });
    });
});

module.exports = router;