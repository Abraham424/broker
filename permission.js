const express = require('express'); 
const db = require('./db');  
const router = express.Router();

router.post('/permission', async (req, res) => {
    const email = req.body.mail; // Get the email
    const permit = req.body.permission; // Get the permission
    db.query("SELECT * FROM user WHERE email = ? ", [email] ,(err,user) => {

    if (user.length > 0) {
     db.query("UPDATE user SET permission = ? WHERE email = ?", [permit ,email]);
    return res.send(`<script>alert('permission is updated successfully');
        window.location = '/admin?role=admin';</script>`);
    }
    else{
        return res.send(`<script>alert('there is no email like that');
            window.location = '/permission';</script>`);
    }         
});
});

module.exports = router;

