const express = require('express');
const router = express.Router();
const cors = require('cors');
const nodeMailer = require('nodemailer');

// server used to send emails
const app = express();
app.use(cors());
app.use('/', router);
app.listen(3000, () => console.log('Server Running'));
console.log(process.env.EMAIL_USER);
console.log(process.env.EMAIL_PASS);

const contactEmail = nodeMailer.createTransport({
    service: 'gmail',
    user: 'pry20001028@gmail.com',
    pass: '13ADFG56yuopkj',
});