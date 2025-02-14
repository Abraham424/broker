const express = require('express');
const path = require('path');    
const db = require('./db');        
const bcrypt = require('bcryptjs');
const router = express.Router();

router.post('/login', async (req, res) => {
    const { mail, pass } = req.body;
    
    if (!mail || !pass ) {
        return res.sendFile(path.join(__dirname, 'html', 'login.html')); 
    }
    const query = 'SELECT * FROM user WHERE email = ?';
    try {
    db.query(query, [mail],async (err, results) => {
        if (results.length > 0) {
            const user = results[0];
        if(user.permission == 'Allowed'){ 
         const isMatch = await bcrypt.compare(pass, user.password);
        if (isMatch) {
      if(user.role == 'user'){        
        res.redirect(`/user?role=${user.role}`);
      }
      if(user.role == 'broker'){
        res.redirect(`/broker?role=${user.role}`);
      }
      if(user.role == 'admin'){
        res.redirect(`/admin?role=${user.role}`);
      }
       }
         else {
          return res.send(`<script>alert('Invallid password');
            window.location = '/login';</script>`);
            }
          }
          else{
        return res.send(`<script>alert('You have not permission to log in');
        window.location = '/login';</script>`);
       }
        }
        else {
          return res.send(`<script>alert('Invallid email');
            window.location = '/login';</script>`);
        }
    });
    } catch (err) {
        console.error('Error executing query:', err);
        res.redirect('/login?error=Database error');
    }
});
module.exports = router;

