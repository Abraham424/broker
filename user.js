const express = require('express');
const path = require('path');    
const db = require('./db');             
const router = express.Router();

// Serve static files
router.use(express.static(path.join(__dirname, 'uploads')));
router.use(express.urlencoded({ extended: false }));
router.use(express.json());

router.use(express.static(path.join(__dirname, 'css')));

let ser = '';
let need = '';

router.get('/bcars', (req, res) => {
  need='car';
    res.sendFile(path.join(__dirname, 'html/user.html'));
  });

  router.get('/bhouses', (req, res) => {
    need='house';
      res.sendFile(path.join(__dirname, 'html/user.html'));
    });

 router.post('/search', (req, res) => {
const {search} = req.body;
need ='';
ser=search;
  res.sendFile(path.join(__dirname, 'html/user.html'));
});

router.get('/api/data/user', (req, res) => {
  if(ser == '' && need == ''){
  const sql = "SELECT * FROM property ORDER BY propertyId DESC";
  db.query(sql, (err, results) => {
      if (err) throw err;
      res.json(results); // Send data as JSON   
  });
}
if(ser != '' && need == ''){
  const sql1 = "SELECT * FROM property where model=? ORDER BY propertyId DESC";
  db.query(sql1, [ser], (error, results) => {
    if (error) {
        console.error(error);
        return res.status(500).json({ error: 'Database error' });
    }
    ser='';
    res.json(results);
});
}
if(ser == '' && need == 'car'){
  const sql2 = "SELECT * FROM property where category=? ORDER BY propertyId DESC";
  db.query(sql2, [need], (error, results) => {
    if (error) {
        console.error(error);
        return res.status(500).json({ error: 'Database error' });
    }
    need='';
    res.json(results);
});
}
if(ser == '' && need == 'house'){
  const sql3 = "SELECT * FROM property where category=? ORDER BY propertyId DESC";
  db.query(sql3, [need], (error, results) => {
    if (error) {
        console.error(error);
        return res.status(500).json({ error: 'Database error' });
    }
    need='';
    res.json(results);
});
}
});

module.exports = router;