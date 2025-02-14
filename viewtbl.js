const express = require('express');
const path = require('path');    
const db = require('./db');    
const router = express.Router();

router.use(express.urlencoded({ extended: false }));
router.use(express.json());

// Serve static files
router.use(express.static(path.join(__dirname, 'css')));

router.get('/api/data/viewacount', (req, res) => {

    const sql = "SELECT * FROM user";
    db.query(sql, (err, results) => {
        if (err) {
          console.log('error');
        }
        res.json(results); // Send data as JSON
    });
  });

// View property
router.get('/api/data/viewproperty', (req, res) => {

    const sql = "SELECT * FROM property";
    db.query(sql, (err, results) => {
        if (err) {
          console.log('error');
        }
        res.json(results); // Send data as JSON
    });
  });

  // View transaction
router.get('/api/data/viewtransaction', (req, res) => {

  const sql = "SELECT * FROM transaction";
  db.query(sql, (err, results) => {
      if (err) {
        console.log('error');
      }
      res.json(results); // Send data as JSON
  });
});

module.exports = router;