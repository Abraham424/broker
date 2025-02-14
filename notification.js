const express = require('express');
const path = require('path');      
const db = require('./db');        
const router = express.Router();

  router.use(express.static(path.join(__dirname, 'uploads')));
  
router.use(express.urlencoded({ extended: false }));
router.use(express.json());

// Serve static files
router.use(express.static(path.join(__dirname, 'css')));

router.get('/api/data/property', (req, res) => {

  const sql = "SELECT * FROM notif ORDER BY notifId DESC";
  db.query(sql, (err, results) => {
      if (err) throw err;
      res.json(results); // Send data as JSON
  });
});

module.exports = router;