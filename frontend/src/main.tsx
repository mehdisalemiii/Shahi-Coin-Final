// © 2024 Malith Rukshan - https://github.com/Malith-Rukshan
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { TonConnectUIProvider } from '@tonconnect/ui-react';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <TonConnectUIProvider manifestUrl="https://salmon-imaginative-tuna-68.mypinata.cloud/ipfs/QmZHfh3HgPBrNSbKR55rq5mZ3mCbzServJN53gPiKhPbdB">
      <App />
    </TonConnectUIProvider>
  </React.StrictMode>
);
