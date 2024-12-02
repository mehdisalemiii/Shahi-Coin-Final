// © 2024 Malith Rukshan - https://github.com/Malith-Rukshan
import React, { useState, useEffect } from 'react';

interface Props {
  showFrens: boolean;
  openFrens: () => void;
}

const Frens: React.FC<Props> = ({ showFrens, openFrens }) => {
  const [referralLink, setReferralLink] = useState('');

  useEffect(() => {
    const generateReferralLink = () => {
      const uniqueId = Math.random().toString(36).substring(2, 15);
      return `https://shahcoin.liara.run/referral/${uniqueId}`; // Replace with your actual app URL
    };

    setReferralLink(generateReferralLink());
  }, []);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(referralLink)
      .then(() => {
        alert('Referral link copied to clipboard!');
      })
      .catch((err) => {
        console.error("Failed to copy link: ", err);
      });
  };

  const handleShareToTelegram = () => {
    const telegramShareUrl = `https://telegram.me/share/url?url=${encodeURIComponent(referralLink)}&text=${encodeURIComponent('Check out this awesome app!')}`;
    window.open(telegramShareUrl, '_blank');
  };

  return (
    <div
      className={`${
        showFrens ? 'fixed' : 'hidden'
      } top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 z-20`}
    >
      <div className="bg-gradient-main p-6 rounded-lg w-full max-w-md relative">
        {/* Close Button */}
        <button
          className="absolute top-2 right-2 text-white"
          onClick={openFrens}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        <h2 className="text-2xl font-bold text-center mb-4">Invite Friends</h2>
        <p className="text-lg mb-4 text-center">
          Share your link and earn rewards!
        </p>

        <div className="bg-[#1f1f1f] p-4 rounded-lg flex items-center justify-between w-full mb-2">
          <input
            type="text"
            className="bg-transparent text-white w-full mr-2"
            value={referralLink}
            readOnly
          />
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
            onClick={handleCopyLink}
          >
            Copy
          </button>
        </div>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full w-full"
          onClick={handleShareToTelegram}
        >
          Share on Telegram
        </button>
      </div>
    </div>
  );
};

export default Frens;
