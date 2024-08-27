import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { BrowserRouter } from 'react-router-dom';
import { LayoutProvider } from './components/Layouts/provider/LayoutProvider.jsx';
import { LoginInfoProvider } from './provider/LoginInfoProvider.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <LayoutProvider>
    <LoginInfoProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </LoginInfoProvider>
  </LayoutProvider>
);
