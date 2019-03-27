const TuyAPI = require('tuyapi');

const device = new TuyAPI({
  id: '04200121ecfabc90097c',
  key: '790feda972754b9b'});

let stateHasChanged = false;

// Find device on network
device.find().then(() => {
  // Connect to device
  device.connect();

});

// Add event listeners
device.on('connected', () => {
  console.log('Connected to device!');
});

device.on('disconnected', () => {
  console.log('Disconnected from device.');
});

device.on('error', error => {
  console.log('Error!', error);
});
device.on('data', data => {

  console.log('Data from device:', data);


  // Set default property to opposite
  if (!stateHasChanged) {
    //device.set({set: !(data.dps['1'])});

device.set({dps: 5, set: '6666ff0000ffff'});

    // Otherwise we'll be stuck in an endless
    // loop of toggling the state.
    stateHasChanged = true;
  }
});

// Disconnect after 10 seconds
setTimeout(() => { device.disconnect(); }, 3000);