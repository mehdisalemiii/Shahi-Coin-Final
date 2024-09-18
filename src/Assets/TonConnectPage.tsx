import { useTonConnectUI } from '@tonconnect/ui-react';
import { Address } from '@ton/core';
import React, { useState, useEffect } from 'react';


const TonConnectPage: React.FC = () => {
  const [tonConnectUI] = useTonConnectUI();
  const [tonWalletAddress, setTonWalletAddress] = useState<string | null>(null);
  const [isConnecting, setIsConnecting] = useState(false);

  const handleWalletConnection = (address: string) => {
    setTonWalletAddress(address);
    console.log('Wallet connected successfully!');
    setIsConnecting(false);
  };

  const handleWalletDisconnection = () => {
    setTonWalletAddress(null);
    console.log('Wallet disconnected successfully!');
  };

  const handleWalletAction = async () => {
    if (tonConnectUI.connected) {
      await tonConnectUI.disconnect();
    } else {
      setIsConnecting(true);
      await tonConnectUI.openModal();
    }
  };

  useEffect(() => {
    const checkWalletConnection = async () => {
      if (tonConnectUI.account?.address) {
        handleWalletConnection(tonConnectUI.account?.address);
      } else {
        handleWalletDisconnection();
      }
    };

    checkWalletConnection();

    const unsubscribe = tonConnectUI.onStatusChange((wallet) => {
      if (wallet) {
        handleWalletConnection(wallet.account.address);
      } else {
        handleWalletDisconnection();
      }
    });

    return () => {
      unsubscribe();
    };
  }, [tonConnectUI]);

  const formatAddress = (address: string) => {
    const tempAddress = Address.parse(address).toString();
    return `${tempAddress.slice(0, 4)}...${tempAddress.slice(-4)}`;
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold mb-8">TON Connect</h1>
      {tonWalletAddress ? (
        <div className="bg-white p-6 rounded-lg shadow-md">
          <p className="text-lg mb-4">
            Connected with: {formatAddress(tonWalletAddress)}
          </p>
          <button
            onClick={handleWalletAction}
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
          >
            Disconnect Wallet
          </button>
        </div>
      ) : (
        <button
          onClick={handleWalletAction}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          disabled={isConnecting}
        >
          {isConnecting ? 'Connecting...' : 'Connect TON Wallet'}
        </button>
      )}
    </div>
  );
};

export default TonConnectPage;