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

// Endpoint to get sold properties
router.get('/api/sold-properties', (req, res) => {
    const sql = "SELECT * FROM solled ORDER BY solledID ASC";
    dbConfig.query(sql, (error, results) => {
        if (error) {
            console.error(error);
            return res.status(500).json({ error: 'Database error' });
        }
        res.json(results);
    });
});
//signup Notifications API
router.get('/api/signup', (req, res) => {
    const p = 'Not_Allowed';
    const sql = 'SELECT COUNT(*) AS count FROM user where permission = ?';
    dbConfig.query(sql, [p], (error, results) => {
        if (error) {
            console.error(error);
            return res.status(500).json({ error: 'Database error' });
        }
        res.json({ count: results[0].count });
    });
});

router.get('/api/data/acountnotif', (req, res) => {
    const p = 'Not_Allowed';
    const sql = 'SELECT * FROM user where permission = ?';
    dbConfig.query(sql, [p], (error, results) => {
        if (error) throw err;
        res.json(results); // Send data as JSON
    });
  });

module.exports = router;