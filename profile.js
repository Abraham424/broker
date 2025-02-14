const express = require('express');
const path = require('path');    
const db = require('./db'); 
const bcrypt = require('bcryptjs');
const router = express.Router();

const dbConfig = {
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'BrokerDatabase',
};

router.use(express.urlencoded({ extended: false }));
router.use(express.json());

// Serve static files
router.use(express.static(path.join(__dirname, 'css')));

// Update user
router.post('/profile', async (req, res) => {
  const { mail, pass, fname, lname, gender, number, add , npass, cpass, acount} = req.body;
  
  const validAccountPattern = /^\d{8}$/;
  if (!validAccountPattern.test(acount)) {
      return res.send(`<script>alert('invalid acount');
        window.location = '/profile';</script>`);
  }
  const passwordCriteria = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  db.query("SELECT * FROM vertual_bank WHERE acount = ?", [acount],(err,userResult) => {

  if (userResult.length > 0) {
  try {
    db.query('SELECT * FROM user WHERE email = ?' ,[mail] ,async (err,result) => {
    if (result.length > 0) {
        const user_data = result[0];
        const isMatch = await bcrypt.compare(pass, user_data.password);

        if (isMatch) {
          if( npass == cpass){
          if (!passwordCriteria.test(npass)) {
            return res.send(`<script>alert('Password does not meet the criteria.');
              window.location = '/profile';</script>`);
        }else{
            const hashedPassword = await bcrypt.hash(npass, 10);
            const updateQuery = 'UPDATE user SET fname = ?, lname = ?, gender = ?, phone = ?, address = ?, password = ?, acount = ? WHERE email = ?';
            db.query(updateQuery, [fname, lname, gender, number, add, hashedPassword, acount, mail]);

            res.send(`<script>alert('Updated successfully!'); 
                window.location.href='/user?role=user';</script>`);
            }
      } else {
        res.send(`<script>alert('password is not match'); 
            window.location.href='/profile';</script>`);
    }
      } else {
            res.send(`<script>alert('Invalid password'); 
                window.location.href='/profile';</script>`);
        }
    } else {
        res.send(`<script>alert('Invalid email'); 
            window.location.href='/profile';</script>`);
    }   
  });
} catch (error) {
    console.error(error);
    res.send(`<script>alert('An error occurred. Please try again.'); 
        window.location.href='/profile';</script>`);
}
  }
  else{
    res.send(`<script>alert('Invalid bank aount Please try again.'); 
      window.location.href='/profile';</script>`);
  }
});
});

module.exports = router;