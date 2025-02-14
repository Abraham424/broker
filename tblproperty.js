const express = require('express');
const path = require('path');      
const router = express.Router();

router.use(express.urlencoded({ extended: false }));
router.use(express.json());

// Serve static files
router.use(express.static(path.join(__dirname, 'css')));

  router.get('/viewproperty', (req, res) => {
    res.sendFile(path.join(__dirname, 'html/viewproperty.html'));
});

router.get('/viewpropertyb', (req, res) => {
  res.sendFile(path.join(__dirname, 'html/viewpropertyb.html'));
});

router.get('/updateproperty', (req, res) => {
  res.sendFile(path.join(__dirname, 'html/updateproperty.html'));
});

router.get('/deleteproperty', (req, res) => {
  res.sendFile(path.join(__dirname, 'html/deleteproperty.html'));
});

module.exports = router;