// client-side js
// run by the browser each time your view template is loaded

console.log('loaded client.js');

// our default array of updates
const updates = [
  'Historial de actualizaciones...',
];

// define variables that reference elements on our page
const updatesList = document.getElementById('updates');
const updatesForm = document.forms[0];
const updateInput = updatesForm.elements['update'];
const phoneNumberInput = updatesForm.elements['phoneNumber'];
const messagingServiceSelect = updatesForm.elements['messagingService'];

// a helper function that creates a list item for a given update
const appendNewUpdate = function(update) {
  
    console.log('appendNewUpdate will happen')


  const newListItem = document.createElement('li');
  newListItem.innerHTML = update;
  updatesList.appendChild(newListItem);
}

// iterate through every update and add it to our page
updates.forEach( function(update) {
  appendNewUpdate(update);
});

// listen for the form to be submitted and add a new update when it is
updatesForm.onsubmit = function(event) {
  
  console.log('on submit will happen')
  
  // check message service conditions
  console.log('messaging service selected: ' + messagingServiceSelect.value)
  switch(messagingServiceSelect.value) {
    case 'whatsapp':
      console.log('using whatsapp')
      break
    case 'sms':
      console.log('using sms')
      break
    default:
      alert("Por favor escoja servicio de mensajeria");    
      return
      break
  }
  
  // check required info conditions
  if (phoneNumberInput.value == '') {
    alert("Por favor introduzca un numero de telefono")
    return
  } else if (updateInput.value == '') {
    alert("Por favor introduzca un mensaje")
    return
  }
  
  // stop our form submission from refreshing the page
  event.preventDefault();

  // get update value and add it to the list
  updates.push(updateInput.value);
  appendNewUpdate(updateInput.value);

  // send message
  console.log('will send message: ' + updateInput.value)
  console.log('to phone number: ' + phoneNumberInput.value)
  sendUpdate({ 
    message: updateInput.value, 
    phoneNumber: phoneNumberInput.value,
    messagingService: messagingServiceSelect.value
  });

  // reset form 
  updateInput.value = '';
  updateInput.focus();
};

function sendUpdate(update) {
  
  const { message, phoneNumber, messagingService } = update;
  console.log('sending update: \"' + message + '\" to: ' + phoneNumber + ' with messaging service: ' + messagingService)

  const url='https://pragwash.glitch.me/send-update';

  fetch(url, {
    method: 'POST', // or 'PUT'
    body: JSON.stringify(update), // data can be `string` or {object}!
    headers:{
            'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  })
  .then(response => {
        console.log('sent update to server: ' + response)
        console.log('Success:', JSON.stringify(response))
        })
  .catch(error => console.error('Error:', error));
}
