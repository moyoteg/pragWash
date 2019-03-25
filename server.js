// server.js
// where your node app starts

// init project
const express = require('express')
const revision = require('child_process')
const bodyParser = require('body-parser');
const cors = require('cors')
var nodegit = require( 'nodegit');
var path = require("path");

require('dotenv').config();

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors())
app.use(express.static('public'));

// twilio
const accountSid = process.env.accountSid; 
const authToken = process.env.authToken; 
console.log('process.env.accountSid: ' + accountSid)
console.log('process.env.authToken: ' + authToken)
const client = require('twilio')(accountSid, authToken);

// http://expressjs.com/en/starter/basic-routing.html
app.get('/', function(request, response) {
  response.sendFile(__dirname + '/views/index.html');
});

app.get('/get-commit-hash', function(req, res) {
  // revision.execSync('git rev-list --count master')
  // .toString()
  // res.send(JSON.stringify({'get-commit-count': revision}));
  
  console.log('/get-commit-hash was called')
    
  res.setHeader('Content-Type', 'application/json');
  
  nodegit.Repository.open(path.resolve(__dirname, ".git"))
    .then(function(repo) {
      return repo.getMasterCommit();
    })
    .then(function(firstCommitOnMaster){
      // History returns an event.
      var history = firstCommitOnMaster.history(nodegit.Revwalk.SORT.TIME);

      // History emits "commit" event for each commit in the branch's history
      history.on("commit", function(commit) {          
        console.log('history.on')
        res.end(JSON.stringify({
          'sha': commit.sha(),
          'author': commit.author().name() + " <" + commit.author().email() + ">",
          'date': commit.date(),
          'message': "\n    " + commit.message()
        }));
      });

      // Don't forget to call `start()`!
      history.start();
    })
    .done();
});


app.get('/get-git-history', function(req, res) {
  // This code walks the history of the master branch and prints results
// that look very similar to calling `git log` from the command line

nodegit.Repository.open(path.resolve(__dirname, ".git"))
  .then(function(repo) {
    return repo.getMasterCommit();
  })
  .then(function(firstCommitOnMaster){
    // History returns an event.
    var history = firstCommitOnMaster.history(nodegit.Revwalk.SORT.TIME);

    // History emits "commit" event for each commit in the branch's history
    history.on("commit", function(commit) {
      console.log("commit " + commit.sha());
      console.log("Author:", commit.author().name() +
        " <" + commit.author().email() + ">");
      console.log("Date:", commit.date());
      console.log("\n    " + commit.message());
        res.send(JSON.stringify({'get-git-history': 'success'}));
    });

    // Don't forget to call `start()`!
    history.start();
  })
  .done();
});

app.post('/send-update', function(res,req) {  
  
  console.log('/send-update was called');
  
  // phones
  const fromTel = '+14155238886'
  // const qTel   =   '+527222338404'
  // const moiTel =   '+16264989505'
  // const ferTel =   '+5217224188115'
  
  var { message, phoneNumber, messagingService } = res.body;
  console.log("request post body: " + message);
  
  switch(messagingService) {
    case 'whatsapp':
      break;
    case 'sms':
      messagingService = ''
      break;
  }
  
  client.messages 
        .create({ 
           body: "pragWash: " + message, 
           from: `${messagingService}:${fromTel}`,       
           to: `${messagingService}:${phoneNumber}`
        }) 
        .then(message => {
          const log = 'message with id:' + message.sid + ' sent successfully'
          console.log(log);
          res.res.send(log);
        })
        .done();
});

// listen for requests :)
const listener = app.listen(process.env.PORT, function() {
  console.log('Your app is listening on port ' + listener.address().port);
});