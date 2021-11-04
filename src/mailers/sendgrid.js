require('dotenv').config();

const sendgridMail = require('@sendgrid/mail');

sendgridMail.setApiKey(process.env.SENDGRID_API_KEY);

module.exports = sendgridMail;
