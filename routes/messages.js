const express = require("express");
const router = express.Router();
const nodemailer = require('sendmail')();

/* Messages – BREAD

Browse – USER can view all their messages
    = GET / messages
Read – USER can read a specific message
    = GET / messages / :id
Add – USER can send a message
    = POST / messages
*/

const sendmail = require('sendmail')();

sendmail({
  from: 'test@finra.org',
  to: 'YOUR@gmail.com',
  subject: 'Hello World',
  html: 'Mail of test sendmail '
}, function (err, reply) {
  console.log(err && err.stack)
  console.dir(reply)
})




