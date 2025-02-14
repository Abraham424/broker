const express = require('express');
const path = require('path');    
const db = require('./db');     
const router = express.Router();

router.use(express.urlencoded({ extended: false }));
router.use(express.json());

// Serve static files
router.use(express.static(path.join(__dirname, 'css')));

// Delete user
router.post('/deleteacc', (req, res) => {
    const { id } = req.body;
      const query = 'SELECT * FROM user WHERE userId = ?';
      db.query(query, [id], async (err, result) => {
        if (result.length > 0) {
            const deleteQuery = 'DELETE FROM user WHERE userId = ?';
            db.query(deleteQuery, [id], (err, result) => {
              res.send(`<script>alert('Deleted successfully!');
                 window.location.href='/acount';</script>`);
            });
        } else{
          res.send(`<script>alert('Invallid id');
            window.location.href='/acount';</script>`); 
        }
      });
});

router.post('/delete', (req, res) => {
  const { id } = req.body;
  const query = 'SELECT * FROM property WHERE propertyId = ?';
  db.query(query, [id], async (err, results) => {
    if (results.length > 0) {
    const query = 'DELETE FROM property WHERE propertyId = ?';
    db.query(query, [id], (err, result) => {
      res.send(`<script>alert('Successfully deleted');
         window.location.href='/tblproperty';</script>`);
    });
  } else {
    res.send(`<script>alert('Invalid ID'); 
      window.location.href='/tblproperty';</script>`);
  }
  });
});

module.exports = router;