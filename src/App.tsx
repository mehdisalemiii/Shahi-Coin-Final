// © 2024 Malith Rukshan - https://github.com/Malith-Rukshan

import { useState, useEffect } from 'react';
import Arrow from './Assets/Arrow.tsx';
import React from 'react';
import Tasks from './Assets/Earn.tsx'; // Make sure this is .tsx
import Boosts from './Assets/Boost';
import Frens from './Assets/Frens';
import TonConnectButton from './Assets/TonConnectButton'; 
import { useTonConnectUI } from '@tonconnect/ui-react';


function App() {
  const [isPressed, setIsPressed] = useState(false);
  const [tonConnectUI] = useTonConnectUI(); // Access TON Connect UI
  const [walletAddress, setWalletAddress] = useState<string | null>(null);

  useEffect(() => {
    // Check if already connected when component mounts
    if (tonConnectUI.connected) {
      setWalletAddress(tonConnectUI.account?.address || null);
    }
 // Listen for connection status changes
 const unsubscribe = tonConnectUI.onStatusChange((wallet) => {
  if (wallet) {
    setWalletAddress(wallet.account.address); 
    console.log("Wallet connected:", wallet.account.address);
  } else {
    setWalletAddress(null);
    console.log("Wallet disconnected");
  }
});

return () => unsubscribe(); // Clean up on component unmount
}, [tonConnectUI]); 

  const [points, setPoints] = useState(() => {
    const storedPoints = localStorage.getItem('points');
    return storedPoints ? parseInt(storedPoints, 10) : 0; // Load from localStorage
  });
  const [energy, setEnergy] = useState(6500);
  const [clicks, setClicks] = useState<{ id: number; x: number; y: number }[]>(
    []
  );
  const pointsToAdd = 1;
  const energyToReduce = 1;

  const [showTasks, setShowTasks] = useState(false);

  const openEarn = () => {
    setShowTasks(!showTasks);
  };

  const [showBoosts, setShowBoosts] = useState(false);

  const openBoosts = () => {
    setShowBoosts(!showBoosts);
  };

  const [showFrens, setShowFrens] = useState(false);

  const openFrens = () => {
    setShowFrens(!showFrens);
  };

  const handleMouseDown = () => setIsPressed(true);
  const handleMouseUp = () => setIsPressed(false);

  const handleClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (energy - energyToReduce < 0) {
      return;
    }
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    setPoints(points + pointsToAdd);
    setEnergy(
      energy - energyToReduce < 0 ? 0 : energy - energyToReduce
    );
    setClicks([...clicks, { id: Date.now(), x, y }]);
  };

  const handleAnimationEnd = (id: number) => {
    setClicks((prevClicks) =>
      prevClicks.filter((click) => click.id !== id)
    );
  };

  // useEffect hook to restore energy over time
  useEffect(() => {
    const interval = setInterval(() => {
      setEnergy((prevEnergy) => Math.min(prevEnergy + 1, 6500));
    }, 1000);
    localStorage.setItem('points', points.toString());

    return () => clearInterval(interval);
  }, [points]);

  return (
    <div
      className="bg-gradient-main min-h-screen px-4 flex flex-col items-center text-white font-medium"
      style={{ userSelect: `none` }}
    >
      <div className="absolute inset-0 h-1/2 bg-gradient-overlay z-0"></div>
      <div className="absolute inset-0 flex items-center justify-center z-0">
        <div className="radial-gradient-overlay"></div>
      </div>

      <div className="w-full z-10 min-h-screen flex flex-col items-center text-white">
        
      <div className="fixed top-0 left-0 w-full px-6 pt-8 z-10 flex flex-col items-center text-white">
      <div className="w-full cursor-pointer">
        {/* Conditionally render button or address */}
        {walletAddress ? ( 
          <div>Connected: {walletAddress.slice(0, 6)}...{walletAddress.slice(-4)}</div> 
        ) : (
          <TonConnectButton /> 
        )}
      </div>
          <div className="mt-12 text-5xl font-bold flex items-center">
            <img src="./images/coin.png" width={44} height={44} />
            <span className="ml-2">{points.toLocaleString()}</span>
          </div>
          <div className="text-base mt-2 flex items-center">
            <img src="./images/trophy.png" width={24} height={24} />
            <a
              href="https://github.com/Malith-Rukshan"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="ml-1">
                Gold <Arrow size={18} className="ml-0 mb-1 inline-block" />
              </span>
            </a>
          </div>
        </div>

        <div className="fixed bottom-0 left-0 w-full px-6 pb-8 z-10">
          <div className="w-full flex justify-between gap-2">
            <div className="w-1/3 flex items-center justify-start max-w-32">
              <div className="flex items-center justify-center">
                <img
                  src="./images/high-voltage.png"
                  width={44}
                  height={44}
                  alt="High Voltage"
                />
                <div className="ml-2 text-left">
                  <span className="text-white text-2xl font-bold block">
                    {energy}
                  </span>
                  <span className="text-white text-large opacity-75">
                    / 6500
                  </span>
                </div>
              </div>
            </div>
            <div className="flex-grow flex items-center max-w-60 text-sm">
              <div className="w-full bg-[#665b6940] py-4 rounded-2xl flex justify-around">
                <button
                  className="flex flex-col items-center gap-1"
                  onClick={openFrens}
                >
                  {showFrens && (
                    <Frens
                      showFrens={showFrens}
                      openFrens={openFrens}
                    />
                  )}
                  <div className="bg-gradient-main ..."></div>
                  <img
                    src="./images/bear.png"
                    width={24}
                    height={24}
                    alt="High Voltage"
                  />
                  <span>Frens</span>
                </button>
                <div className="h-[48px] w-[2px] bg-[#000000]"></div>
                <button
                  className="flex flex-col items-center gap-1"
                  onClick={openEarn}
                >
                  {showTasks && (
                    <Tasks
                      showTasks={showTasks}
                      openEarn={openEarn}
                      onTaskComplete={(reward) =>
                        setPoints(points + reward)
                      }
                    />
                  )}
                  <img
                    src="./images/coin.png"
                    width={24}
                    height={24}
                    alt="High Voltage"
                  />
                  <span>Earn</span>
                </button>
                <div className="h-[48px] w-[2px] bg-[#000000]"></div>
                <button
                  className="flex flex-col items-center gap-1"
                  onClick={openBoosts}
                >
                  {showBoosts && (
                    <Boosts
                      showBoosts={showBoosts}
                      openBoosts={openBoosts}
                      onBoostPurchase={(cost) =>
                        setPoints(points - cost)
                      }
                    />
                  )}
                  <img
                    src="./images/rocket.png"
                    width={24}
                    height={24}
                    alt="High Voltage"
                  />
                  <span>Boosts</span>
                </button>
              </div>
            </div>
          </div>
          <div className="w-full bg-[#9d909a] rounded-full mt-4">
            <div
              className="bg-gradient-to-r from-[#40E0D0] to-[#66023c] h-4 rounded-full"
              style={{ width: `${(energy / 6500) * 100}%` }}
            ></div>
          </div>
        </div>

        <div className="flex-grow flex items-center justify-center select-none">
          <div
            className="relative mt-4"
            onClick={handleClick}
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            onTouchStart={handleMouseDown}
            onTouchEnd={handleMouseUp}
            onTouchCancel={handleMouseUp}
          >
            <img
              src="./images/notcoin.png"
              width={256}
              height={256}
              alt="notcoin"
              draggable="false"
              style={{
                pointerEvents: 'none',
                userSelect: 'none',
                transform: isPressed
                  ? 'translateY(4px)'
                  : 'translateY(0px)',
                transition: 'transform 100ms ease',
              }}
              className="select-none"
            />
            {clicks.map((click) => (
              <div
                key={click.id}
                className="absolute text-5xl font-bold opacity-0"
                style={{
                  top: `${click.y - 42}px`,
                  left: `${click.x - 28}px`,
                  animation: `float 1s ease-out`,
                  pointerEvents: `none`,
                }}
                onAnimationEnd={() => handleAnimationEnd(click.id)}
              >
                {energyToReduce}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
