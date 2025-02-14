const express = require('express');
const path = require('path');
const db = require('./db');    
const router = express.Router();

// Middleware to parse request bodies
router.use(express.urlencoded({ extended: false }));
router.use(express.json());

// Serve static files
router.use(express.static(path.join(__dirname, 'css')));

let sid='';
// Serve the main HTML page
router.post('/order', (req, res) => {
   sid = req.body.id;
    res.sendFile(path.join(__dirname, 'html/order.html'));
});

router.get('/api/data/order', async (req, res) => {
  const sql = 'SELECT * FROM property WHERE propertyId= ?'; // Adjust to your actual table name
  try {
      db.query(sql, [sid], (err, results) => {
      if (results.length>0){
      res.json(results); // Send data as JSOn
      }
      sid = '';
    });
  } catch (err) {
    console.error('Query error: ', err);
    return res.status(500).json({ error: 'Database query failed' });
  }
});

module.exports = router;