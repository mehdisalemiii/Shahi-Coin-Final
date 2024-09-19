// © 2024 Malith Rukshan - https://github.com/Malith-Rukshan
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { TonConnectUIProvider } from '@tonconnect/ui-react';


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <TonConnectUIProvider manifestUrl="%PUBLIC_URL%/tonconnect-manifest.json"> 
      <App />
    </TonConnectUIProvider>
  </React.StrictMode>
);
