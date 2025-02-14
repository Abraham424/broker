const express = require('express');
const path = require('path');
const db = require('./db');    
const router = express.Router();

router.use(express.urlencoded({ extended: false }));
router.use(express.json());

// Serve static files
router.use(express.static(path.join(__dirname, 'css')));

let serc = ''; // Declare serc globally to use it in multiple routes

// View property
router.post('/indexsearch', (req, res) => {
    const { ser } = req.body; // Use req.body to capture input from the form
    serc = ser || ''; // Set serc to ser or an empty string if undefined
    res.sendFile(path.join(__dirname, 'html/indexsearch.html'));
});

// Fetch data
router.get('/api/data/users', (req, res) => {
    if (serc === '') {
        console.log('There is no search term.');
        return res.status(400).json({ message: 'No search term provided.' }); // Respond with an error if no search term
    }
    const sql1 = "SELECT * FROM property WHERE model = ?";
    db.query(sql1, [serc], (error, results) => {
        if (error) {
            console.error(error);
            return res.status(500).json({ error: 'Database error' });
        }
        serc = ''; // Clear the search term after using it
        res.json(results); // Send results as JSON
    });
});

module.exports = router;