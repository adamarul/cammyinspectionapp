import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
// Import Firebase analytics if you are going to use it
import { app, analytics } from './firebaseConfig';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
