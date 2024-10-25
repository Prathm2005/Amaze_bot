import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx'; 
import ContextProvider from './context/context.jsx'; 
import './index.css'; 
import { ClerkProvider } from '@clerk/clerk-react';

const PUBLISHABLE_KEY = "pk_test_anVzdC10YXBpci03NC5jbGVyay5hY2NvdW50cy5kZXYk"

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl="/">
      <ContextProvider>
        <App />
      </ContextProvider>
    </ClerkProvider>
  </React.StrictMode>
);

