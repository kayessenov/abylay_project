require("dotenv").config();
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid,authToken);

function send(body, to){
    client.messages
  .create({
     body,
     from: '+12534001865',
     to
   })
  .then(message => console.log(message.sid)).catch(err=>console.error(err));
}

module.exports = send;

