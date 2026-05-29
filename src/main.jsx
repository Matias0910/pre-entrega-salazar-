import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

// 1. Importamos Bootstrap (asegurate de haberlo instalado con npm install bootstrap)
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

// 2. Importamos el proveedor de Helmet para el SEO
import { HelmetProvider } from 'react-helmet-async';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* 3. Envolvemos la App con el HelmetProvider */}
    <HelmetProvider>
      <App />
    </HelmetProvider>
  </React.StrictMode>,
)