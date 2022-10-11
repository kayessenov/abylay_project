const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')('AC5f63b3db77ac0c09691830210629d431', '6e2d82186f325ceab8b80d46ce0b9e67');

client.messages
  .create({
     body: 'This is the ship that made the Kessel Run in fourteen parsecs?',
     from: '+12534001865',
     to: '+77752076321'
   })
  .then(message => console.log(message.sid)).catch(err=>console.error(err));