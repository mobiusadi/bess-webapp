import React from 'react';
import ReactDOM from 'react-dom/client';
// THIS IS THE FIX: Import BrowserRouter from the library
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App';
import 'leaflet/dist/leaflet.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);