const express = require('express');
const path = require('path');    
const db = require('./db');   
const bcrypt = require('bcryptjs');
const router = express.Router();

router.use(express.urlencoded({ extended: false }));
router.use(express.json());

// Serve static files
router.use(express.static(path.join(__dirname, 'css')));

// Create user
router.post('/createacc', async (req, res) => {
    const { fname, lname, gender, number, add, mail, pass, cpass, acount, role } = req.body;
    const validAccountPattern = /^\d{8}$/;
    if (!validAccountPattern.test(acount)) {
      return res.send(`<script>alert('invalid acount');
        window.location = '/createacount';</script>`);
  }
  const passwordCriteria = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  
  const sql = 'SELECT * FROM user WHERE email = ?';
   db.query (sql, [mail], async (err, results) => {
    if (results.length > 0) {
      return res.send(`<script>alert('email is existed');
          window.location = '/createacount';</script>`);
  }
  if(results.length == 0){
    const sql1 = 'SELECT * FROM vertual_bank WHERE acount = ?';
    db.query(sql1, [acount], (err, result) => { 
    if (result.length == 0) {
      return res.send(`<script>alert('you enter Invalid vertual bank acount');
          window.location = '/createacount';</script>`);
  }
  });

    if (!passwordCriteria.test(pass)) {
        return res.send(`<script>alert('Password does not meet the criteria.');
          window.location = '/createacount';</script>`);
    }
    if(pass == cpass){
      if (fname && lname && !isNaN(acount)) {
        const hashedPassword = await bcrypt.hash(pass, 10);
        const sql = 'INSERT INTO user (fname, lname, gender, phone, address, email, password, acount, role) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)';
        db.query(sql, [fname, lname, gender, number, add, mail, hashedPassword, acount, role], (err, result) => {
          if (err) {
            console.error(err);
            return res.send(`<script>alert('Registration failed'); 
              window.location.href='/acount';</script>`);
          }
          res.send(`<script>alert('Successfully registered'); 
              window.location.href='/acount';</script>`);
        });
      } else {
        res.send(`<script>alert('Invalid input'); 
          window.location.href='/acount';</script>`);
      }
    }
    else {
      res.send(`<script>alert('your password mismatch'); 
        window.location.href='/createacount';</script>`);
    }
  }

  });

  });

module.exports = router;