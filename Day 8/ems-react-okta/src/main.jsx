import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Security } from '@okta/okta-react';
import { OktaAuth, toRelativeUrl } from '@okta/okta-auth-js';
import App from './App.jsx';
import { oktaConfig } from './oktaConfig.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './index.css';

const oktaAuth = new OktaAuth(oktaConfig);

const restoreOriginalUri = (_oktaAuth, originalUri) => {
  window.location.replace(toRelativeUrl(originalUri || '/', window.location.origin));
};

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Security oktaAuth={oktaAuth} restoreOriginalUri={restoreOriginalUri}>
        <App />
      </Security>
    </BrowserRouter>
  </React.StrictMode>
);
