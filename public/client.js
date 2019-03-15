// client-side js
// run by the browser each time your view template is loaded

console.log('hello world :o');

// our default array of dreams
const dreams = [
  'Find and count some sheep',
  'Climb a really tall mountain',
  'Wash the dishes'
];

// define variables that reference elements on our page
const dreamsList = document.getElementById('dreams');
const dreamsForm = document.forms[0];
const dreamInput = dreamsForm.elements['dream'];

// a helper function that creates a list item for a given dream
const appendNewDream = function(dream) {
  
    console.log('appendNewDream will happen')


  const newListItem = document.createElement('li');
  newListItem.innerHTML = dream;
  dreamsList.appendChild(newListItem);
}

// iterate through every dream and add it to our page
dreams.forEach( function(dream) {
  appendNewDream(dream);
});

// listen for the form to be submitted and add a new dream when it is
dreamsForm.onsubmit = function(event) {
  
  console.log('on submit will happen')
  
  // stop our form submission from refreshing the page
  event.preventDefault();

  // get dream value and add it to the list
  dreams.push(dreamInput.value);
  appendNewDream(dreamInput.value);

  // send message
  console.log('will send message: ' + dreamInput.value)
  sendMessage(dreamInput.value)
  
  // reset form 
  dreamInput.value = '';
  dreamInput.focus();
};

function sendMessage(message) {
  
  console.log('sending message: ')

const accountSid = 'AC6451fad108c7427784dfc197990b9b7e'; 
const authToken = 'dadaa6600fa88811d513ae0dbd7d530b'; 
const client = require('twilio')(accountSid, authToken); 
 
client.messages 
      .create({ 
         body: 'Your appointment is coming up on July 21 at 3PM', 
         from: 'whatsapp:+14155238886',       
         to: 'whatsapp:+16264989505' 
       }) 
      .then(message => console.log(message.sid)) 
      .done();
}