const express = require('express');
const path = require('path');    
const db = require('./db');    
const bcrypt = require('bcryptjs');
const router = express.Router();


router.use(express.urlencoded({ extended: false }));
router.use(express.json());

// Serve static files
router.use(express.static(path.join(__dirname, 'css')));

// Update user
router.post('/updateacc', (req, res) => {
    const { mail, pass, fname, lname, gender, number, add, nmail, npass, acount, role } = req.body;

  if (mail && pass && isNaN(mail)) {
    const query = 'SELECT * FROM user WHERE email = ?';
    db.query(query, [mail], async (err, result) => {
      if (err) {
        console.error(err);
        return res.send(`<script>alert('Error retrieving user'); 
            window.location.href='/acount';</script>`);
      }

      if (result.length > 0) {
        const user_data = result[0];
        const isMatch = await bcrypt.compare(pass, user_data.password);

        if (isMatch) {
          const hashedPassword = await bcrypt.hash(npass, 10);
          const updateQuery = 'UPDATE user SET fname = ?, lname = ?, gender = ?, phone = ?, address = ?, email = ?, password = ?, acount = ?, role = ? WHERE email = ?';
          db.query(updateQuery, [fname, lname, gender, number, add, nmail, hashedPassword, acount, role, mail], (err, result) => {
            if (err) {
              console.error(err);
              return res.send(`<script>alert('Update failed');
                 window.location.href='/acount';</script>`);
            }
            res.send(`<script>alert('Updated successfully!'); 
                window.location.href='/acount';</script>`);
          });
        } else {
          res.send(`<script>alert('Invalid password'); 
            window.location.href='/acount';</script>`);
        }
      }
    });
  }
});

router.post('/update', (req, res) => {
  const { id ,fname ,lname ,price ,model ,acount} =req.body;
  if (fname && !isNaN(price)) {
    const query = 'UPDATE property SET fname = ?, lname = ?, price = ?, acount = ?, model = ? WHERE propertyId = ?';
    db.query(query, [fname, lname, price, acount, model ,id], (err, result) => {
      if (err) throw err;
      res.send(`<script>alert('Updated Successfully');
         window.location.href='/tblproperty';</script>`);
    });
  } else {
    res.send(`<script>alert('Invalid input');
       window.location.href='/tblproperty';</script>`);
  }
});

module.exports = router;