import React from 'react';
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom';
import Providers from './Providers.jsx';
import "core-js/stable";
import "regenerator-runtime/runtime";

(window.global = window);


createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Providers>
    <BrowserRouter>
    <App />
    </BrowserRouter>
    </Providers>
  </React.StrictMode>,
)