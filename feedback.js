const express = require('express');
const path = require('path');
const db = require('./db');    
const router = express.Router();

router.use(express.urlencoded({ extended: true }));
router.use(express.static(path.join(__dirname, 'css')));

router.post('/feed', (req, res) => {
    const { fname, lname, email, feedback, rating } = req.body;

    const sqlUser = "SELECT * FROM user WHERE email = ?";
    db.query(sqlUser, [email], (error, result) => {
    
      if (error) {
        console.error('Error retrieving user ID:', error);
        return res.status(500).send('Internal Server Error');
      }
  
      if (result.length === 0) {
        return res.send(`<script>alert('email not found'); 
          window.location.href='/feed';</script>`);
      }
      if (result.length > 0) {
        let userId = result[0].userId; 
  const sql = 'INSERT INTO feedback (userId, fname, lname, email, feed, rating) VALUES (?, ?, ?, ?, ?, ?)';
  db.query(sql, [userId, fname, lname, email, feedback, rating], (error, results) => {
    if (error) {
      console.error(error);
      return res.status(500).send('Database error');
    }
    // Alerts and redirection
    res.send(`
      <script>
        alert('Your feedback is sent successfully \\n Thank you!!!');
         window.location.href='/feed';
      </script>
    `);
  });
}
});
});

module.exports = router;
