const express = require('express');
const path = require('path');
const app = express();
exports.app = app;
const loginRoute = require('./login');
const SignUpRoute = require('./signup');
const userRoute = require('./user'); 
const adminRoute = require('./admin'); 
const brokerRoute = require('./broker');
const contactRoute = require('./contact');
const notfyRoute = require('./notification'); 
const orderRoute = require('./order');
const tblpropertyRoute = require('./tblproperty'); 
const uploadRoute = require('./upload'); 
const viewfeedRoute = require('./viewfeedback'); 
const acountRoute = require('./acount'); 
const aproveRoute = require('./aprove'); 
const disaproveRoute = require('./disaprove'); 
const createacountRoute = require('./createacount'); 
const deleteRoute = require('./delete'); 
const updateRoute = require('./update'); 
const viewtblRoute = require('./viewtbl'); 
const payRoute = require('./pay'); 
const profileRoute = require('./profile'); 
const passresetRoute = require('./passreset'); 
const indexsearchRoute = require('./indexsearch'); 
const permissionRoute = require('./permission'); 
const reportRoute = require('./report'); 
const feedRoute = require('./feedback'); 
const negRoute = require('./negotiation'); 

const port = 2127;

app.use(express.static(path.join(__dirname, 'css')));
app.use(express.static(path.join(__dirname, 'html')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json()); 
app.use('/', loginRoute); 
app.use('/', SignUpRoute); 
app.use('/', userRoute); 
app.use('/', adminRoute); 
app.use('/', brokerRoute);  
app.use('/', contactRoute); 
app.use('/', notfyRoute); 
app.use('/', orderRoute); 
app.use('/', tblpropertyRoute); 
app.use('/', acountRoute); 
app.use('/', uploadRoute); 
app.use('/', viewfeedRoute); 
app.use('/', aproveRoute); 
app.use('/', disaproveRoute); 
app.use('/', createacountRoute); 
app.use('/', deleteRoute); 
app.use('/', updateRoute); 
app.use('/', viewtblRoute); 
app.use('/', payRoute); 
app.use('/', profileRoute); 
app.use('/', passresetRoute); 
app.use('/', indexsearchRoute); 
app.use('/', permissionRoute); 
app.use('/', reportRoute);
app.use('/', feedRoute);
app.use('/', negRoute);

app.get('/acountnotification', (req, res) => {
    res.sendFile(path.join(__dirname, 'html/acountnotification.html'));
});

app.get('/feed', (req, res) => {
    res.sendFile(path.join(__dirname, 'html/feedback.html'));
});

app.get('/viewreport', (req, res) => {
    res.sendFile(path.join(__dirname, 'html/viewreport.html'));
});

app.get('/permission', (req, res) => {
    res.sendFile(path.join(__dirname, 'html/permission.html'));
});

app.get('/report', (req, res) => {
    res.sendFile(path.join(__dirname, 'html/report.html'));
});

app.get('/reset', (req, res) => {
    res.sendFile(path.join(__dirname, 'html/reset.html'));
});

app.get('/viewtransaction', (req, res) => {
    res.sendFile(path.join(__dirname, 'html/viewtransaction.html'));
});

app.get('/passreset', (req, res) => {
    res.sendFile(path.join(__dirname, 'html/passreset.html'));
});

app.get('/profile', (req, res) => {
    res.sendFile(path.join(__dirname, 'html/profile.html'));
});

app.get('/solled', (req, res) => {
    res.sendFile(path.join(__dirname, 'html/solled.html'));
});

app.get('/acount', (req, res) => {
    res.sendFile(path.join(__dirname, 'html/acount.html'));
});

app.get('/tblproperty', (req, res) => {
    res.sendFile(path.join(__dirname, 'html/tblproperty.html'));
});

app.get('/uploadb', (req, res) => {
    res.sendFile(path.join(__dirname, 'html/uploadb.html'));
});

app.get('/upload', (req, res) => {
    res.sendFile(path.join(__dirname, 'html/upload.html'));
});

app.get('/viewfeedback', (req, res) => {
    res.sendFile(path.join(__dirname, 'html/viewfeedback.html'));
});

app.get('/order', (req, res) => {
    res.sendFile(path.join(__dirname, 'html/order.html'));
});

app.get('/notification', (req, res) => {
    res.sendFile(path.join(__dirname, 'html/notification.html'));
});

app.get('/about', (req, res) => {
    res.sendFile(path.join(__dirname, 'html/about.html'));
});

app.get('/help', (req, res) => {
    res.sendFile(path.join(__dirname, 'html/help.html'));
});

app.get('/contact', (req, res) => {
    res.sendFile(path.join(__dirname, 'html/contact.html'));
});

app.get('/user', (req, res) => {
    if(req.query.role === 'user'){
        res.sendFile(path.join(__dirname, 'html/user.html'));
        }
    else
        res.sendFile(path.join(__dirname, 'html/login.html'));
});

app.get('/broker', (req, res) => {
    if(req.query.role === 'broker'){
    res.sendFile(path.join(__dirname, 'html/broker.html'));
    }
    else
    res.sendFile(path.join(__dirname, 'html/login.html'));
});

app.get('/admin', (req, res) => {
    if(req.query.role === 'admin'){
    res.sendFile(path.join(__dirname, 'html/admin.html'));
    }
    else
    res.sendFile(path.join(__dirname, 'html/login.html'));
});

app.get('/signup', (req, res) => {
    res.sendFile(path.join(__dirname, 'html/signup.html'));
});

app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'html/login.html'));
});

app.get('/logout', (req, res) => {
    res.sendFile(path.join(__dirname, 'html/login.html'));
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'html/index.html'));
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});