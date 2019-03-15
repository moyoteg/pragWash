// client-side js
// run by the browser each time your view template is loaded

// var request = require('request');

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
const phoneNumberInput = dreamsForm.elements['phoneNumber'];

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
  
  console.log('on submit will happen');
  console.log(event);
  
  // stop our form submission from refreshing the page
  event.preventDefault();

  // get dream value and add it to the list
  dreams.push(dreamInput.value);
  appendNewDream(dreamInput.value);

  // send message
  console.log('will send message: ' + dreamInput.value)
  sendMessage({ message: dreamInput.value, phoneNumber: phoneNumberInput.value });
  
  // reset form 
  dreamInput.value = '';
  dreamInput.focus();
};

function sendMessage({ message, phoneNumber }) {
  
  console.log('sending message: ' + message)

  const url='https://pragwash.glitch.me/sendmessage';
  
  var data = { message, phoneNumber };

  fetch(url, {
    method: 'POST', // or 'PUT'
    body: JSON.stringify(data), // data can be `string` or {object}!
    headers:{
      'Content-Type': 'application/json'
    }
  }).then(res => res.json())
  .then(response => console.log('Success:', JSON.stringify(response)))
  .catch(error => console.error('Error:', error));
}

// function sendMessage(message) {
  
//   console.log('sending message: ' + message)

//   // https://pragwash.glitch.me/sendmessage
  
//   const Http = new XMLHttpRequest();
//   const url='https://pragwash.glitch.me/sendmessage';
//   Http.open("POST", url);
//   Http.setRequestHeader('Content-Type', 'application/json');
//   Http.send({ message });
//   Http.onreadystatechange=(e)=>{
//     console.log(Http.responseText)
//   }
// }