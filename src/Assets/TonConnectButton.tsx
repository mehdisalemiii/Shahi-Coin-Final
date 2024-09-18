import React from 'react';
import { useNavigate } from 'react-router-dom'; // If using React Router

const TonConnectButton: React.FC = () => {
  const navigate = useNavigate(); // If using React Router

  const handleClick = () => {
    // Navigate to your TON Connect page
    navigate('/ton-connect'); 
  };

  return (
    <button
      onClick={handleClick}
      className="bg-gradient-main py-4 rounded-2xl flex justify-around w-full"
    >
      <img src="./images/ton-icon.svg" alt="TON Icon" className="w-6 h-6" /> {/* Replace with your TON icon */}
      <span>Connect TON Wallet</span>
    </button>
  );
};

export default TonConnectButton;
