import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter as Router } from 'react-router-dom';
import { Amplify } from 'aws-amplify';
import config from './config';
import { initSentry } from './libs/errorLib';
import { I18nextProvider } from "react-i18next";
import i18n from "./i18n";
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.css';
import '@fortawesome/fontawesome-free/js/all';

initSentry();

Amplify.configure({
  API: {
    endpoints: [
      {
        name: "privatebin",
        endpoint: config.apiGateway.URL,
        region: config.apiGateway.REGION
      },
    ]
  },
  Auth: {
    mandatorySignIn: false,
    region: config.cognito.REGION,
    userPoolId: config.cognito.USER_POOL_ID,
    userPoolWebClientId: config.cognito.APP_CLIENT_ID
  },
});

///////////

// window.addEventListener("beforeinstallprompt", event => {
//   // Suppress automatic prompting.
//   event.preventDefault();
//
//   alert("beforeinstallprompt");
//   console.log("beforeinstallprompt");
//
//   // Show the (disabled-by-default) install button. This button
//   // resolves the installButtonClicked promise when clicked.
//   // installButton.disabled = false;
//
//   // Wait for the user to click the button.
//   // installButton.addEventListener("click", async e => {
//   //   // The prompt() method can only be used once.
//   //   installButton.disabled = true;
//   //
//   //   // Show the prompt.
//   //   const { userChoice } = await event.prompt();
//   //   console.info(`user choice was: ${userChoice}`);
//   // });
// });
//
// /////
//
// function handleInstalled(ev) {
//   const date = new Date(ev.timeStamp / 1000);
//   console.log(`Yay! Our app got installed at ${date.toTimeString()}.`);
// }
//
// // Using the event handler IDL attribute
// window.onappinstalled = handleInstalled;
//
// // Using .addEventListener()
// window.addEventListener("appinstalled", handleInstalled);


////////

ReactDOM.render(
  <Router>
    <I18nextProvider i18n={i18n}>
      <App />
    </I18nextProvider>,
  </Router>,
  document.getElementById('root')
);
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();

serviceWorker.register();
// .then(function(registration) {
//   // registration worked
//   console.log('Registration succeeded.');
//   // button.onclick = function() {
//     registration.update();
//   // }
// }).catch(function(error) {
//   // registration failed
//   console.log('Registration failed with ' + error);
// });

//doesn't work :(
// serviceWorker.register(
//   '/service-worker.js', {
//     updateViaCache: 'none',
//     // Optionally, set 'scope' here, if needed.
//   }
// );
