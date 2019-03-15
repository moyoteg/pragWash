// server.js
// where your node app starts

// init project
const express = require('express')
const bodyParser = require('body-parser');

const app = express();

// twilio
const accountSid = process.env.accountSid; 
const authToken = process.env.authToken; 
const client = require('twilio')(accountSid, authToken);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// we've started you off with Express, 
// but feel free to use whatever libs or frameworks you'd like through `package.json`.

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get('/', function(request, response) {
  response.sendFile(__dirname + '/views/index.html');
});

// listen for requests :)
const listener = app.listen(process.env.PORT, function() {
  console.log('Your app is listening on port ' + listener.address().port);
});

app.post('/sendupdate', function(res,req) {  
  
  console.log('/sendupdate was called');
  
  // phones
  const fromTel = '+14155238886'
  const qTel   =   '+527222338404'
  const moiTel =   '+16264989505'
  const ferTel =   '+5217224188115'
  
  const { message, phoneNumber } = res.body;
  console.log("request post body: " + message);

  client.messages 
        .create({ 
           body: "pragWash: " + message, 
           from: `whatsapp:${fromTel}`,       
           to: `whatsapp:${phoneNumber}`
         }) 
        .then(message => console.log(message.sid)) 
        .done();
});