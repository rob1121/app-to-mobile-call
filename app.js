const sinchClient = new SinchClient({
  applicationKey: 'cc73566a-109c-4bdf-8107-c03513cb873d',
  capabilities: { calling: true },
  supportActiveConnection: true,
});

const loginObj = {
  username: 'robinson',
  email: 'robinson.legaspi@yahoo.com',
  password: 'Planetmax12',
};

const handleSuccess = function () {
  console.log('login success');

  const callListeners = {
    onCallProgressing(call) {
      $('audio#ringback').prop('currentTime', 0); // Ensure ringback start from beginning
      $('audio#ringback').trigger('play'); // Play ringback when call is progressing
    },
    onCallEstablished(call) {
      $('audio#ringback').trigger('pause'); // End ringback
      $('audio#incoming').attr('src', call.incomingStreamURL); // Connect incoming stream to audio element
    },
    onCallEnded(call) {
      $('audio#ringback').trigger('pause'); // End the ringback
      $('audio#incoming').attr('src', ''); // Ensure no incoming stream is playing
      // Optional: Enable user interface to make another call
    },
  };

  const callClient = sinchClient.getCallClient();
  const call = callClient.callPhoneNumber('+639232984610');
  call.addEventListener(callListeners);
};

const handleFail = function () {
  console.log('login failed');
};

const signUpObject = {
  username: 'robinson',
  password: 'Planetmax12',
};

sinchClient.start(signUpObject).then(handleSuccess).fail(handleFail);
