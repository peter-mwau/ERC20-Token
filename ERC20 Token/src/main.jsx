import React from 'react';
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom';
import Providers from './Provider.jsx';

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js').then(registration => {
      console.log('Service Worker registered with scope:', registration.scope)
    }).catch(error => {
      console.log('Service Worker registration failed:', error)
    })
  })
}


createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Providers>
    <BrowserRouter>
    <App />
    </BrowserRouter>
    </Providers>
  </React.StrictMode>,
)
