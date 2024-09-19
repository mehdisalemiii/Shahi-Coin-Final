import React from 'react';
import { useTonConnectUI } from '@tonconnect/ui-react';

const TonConnectButton: React.FC = () => {
  const [tonConnectUI] = useTonConnectUI();

  const handleConnect = async () => {
    try {
      await tonConnectUI.openModal();
    } catch (error) {
      console.error('TON Connect Error:', error);
    }
  };

  return (
    <button
      onClick={handleConnect}
      className="bg-[#3886c8] text-center py-3 px-6 rounded-lg text-lg font-semibold backdrop-blur-md hover:bg-[#2c7ab0] transition-colors duration-300"
    >
      <p>Connect Wallet</p>
    </button>
  );
};

export default TonConnectButton;
