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
  }
});

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
serviceWorker.unregister();
