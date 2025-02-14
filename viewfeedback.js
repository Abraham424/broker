const express = require('express');
const path = require('path');    
const db = require('./db');    
const router = express.Router();

router.use(express.urlencoded({ extended: false }));
router.use(express.json());

// Serve static files
router.use(express.static(path.join(__dirname, 'css')));

// Endpoint to get feedback
router.get('/api/feedback', (req, res) => {
        const sql = "SELECT * FROM feedback";
        db.query(sql, (error, results) => {
            if (error) {
                console.error(error);
                return res.status(500).json({ error: 'Database error' });
            }
            res.json(results);
        });
});

module.exports = router;