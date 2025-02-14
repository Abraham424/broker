const express = require('express');
const path = require('path');    
const mysql = require('mysql2');  
const router = express.Router();

const dbConfig = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'BrokerDatabase',
  });
router.use(express.urlencoded({ extended: false }));
router.use(express.json());

// Serve static files
router.use(express.static(path.join(__dirname, 'css')));

// Notifications API
router.get('/api/notifications', (req, res) => {
    const sql = 'SELECT COUNT(*) AS count FROM notif';
    dbConfig.query(sql, (error, results) => {
        if (error) {
            console.error(error);
            return res.status(500).json({ error: 'Database error' });
        }
        res.json({ count: results[0].count });
    });
});

module.exports = router;