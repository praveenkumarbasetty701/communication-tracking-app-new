import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App.js'; // Ensure this matches the file name
import reportWebVitals from './reportWebVitals.js'; // Ensure this matches the file name

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

reportWebVitals();
