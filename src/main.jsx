import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { BrowserRouter } from 'react-router-dom';
import { LayoutProvider } from './components/Layouts/provider/LayoutProvider.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <LayoutProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </LayoutProvider>
);
