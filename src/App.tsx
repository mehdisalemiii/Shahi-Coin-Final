import React, { useState, useEffect } from 'react';
import Arrow from './Assets/Arrow.tsx';
import Tasks from './Assets/Earn.tsx';
import Boosts from './Assets/Boost';
import Frens from './Assets/Frens';
import Leaderboard from './Assets/Leaderboard';
import TonConnectButton from './Assets/TonConnectButton';
import { useTonConnectUI } from '@tonconnect/ui-react';
import * as enTranslations from './locales/en.json';
import * as faTranslations from './locales/fa.json';
import * as ruTranslations from './locales/ru.json';
import axios from 'axios';
import { libWeb } from '@tonclient/lib-web'; 
import { BinaryLibrary } from '@tonclient/core/dist/bin';
import notcoin from './images/notcoin.png'; 
import coin from './images/coin.png';
import trophy from './images/trophy.png';
import highVoltage from './images/high-voltage.png';
import bear from './images/bear.png';
import rocket from './images/rocket.png';
import { SessionContextProvider } from '@supabase/auth-helpers-react';
import MyComponent from './componenets/MyComponent'; // Import your MyComponent
import { createClient } from '@supabase/supabase-js' // Relative to your API route file
import { TonClient } from '@tonclient/core';


TonClient.useBinaryLibrary(libWeb as unknown as () => Promise<BinaryLibrary>);

// Define the type for your translations
interface Translations {
  [key: string]: string;
}

interface TonConnectUI {
  // ... other properties and methods
  open: () => void;
}

interface Wallet {
  account: {
    address: string;
  };
  provider: {
    getSigner: () => Promise<any>;
  };
}

interface ConnectedWallet {
  account: {
    address: string;
  };
  getSigner: () => Promise<any>;
  // other properties and methods of ConnectedWallet
}
const supabase = createClient('https://oyscvyoyggihyzxvtuus.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im95c2N2eW95Z2dpaHl6eHZ0dXVzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzI2MjgxMjIsImV4cCI6MjA0ODIwNDEyMn0.LQQLq_7Enqtsi8s4bm9DAEXU_O3BUI1hOI7GsmFVcW');

const unsubscribe = () => {
  // Add code here to unsubscribe from the event or subscription
};

// ...

  try {
    // Code that's causing the error
    const tonClient = new TonClient({
      network: {
        endpoints: ['https://main.ton.dev'],
      },
    });
  } catch (error) {
    console.error(error);
  }

const translations: { [key: string]: Translations } = {
  en: enTranslations,
  fa: faTranslations,
  ru: ruTranslations,
};

function App() {
  const [isPressed, setIsPressed] = useState(false);
  const [tonConnectUI, setTonConnectUI] = useTonConnectUI();
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [client, setClient] = useState<TonClient | null>(null);

  // State for points and energy, initialized from MongoDB (or with defaults)
  const [points, setPoints] = useState(0);
  const [energy, setEnergy] = useState(2500);

  useEffect(() => {
    
    const handleStatusChange = (wallet: ConnectedWallet | null) => {
      if (wallet) {
        setWalletAddress(wallet.account.address);
        wallet.getSigner().then((signer) => {
          setClient(new TonClient({
            network: {
              endpoints: ['https://mainnet.ton.dev'],
            },
          }));
        }).catch((error) => {
          console.error('Error getting signer or creating TonClient:', error);
        });
      } else {
        // Wallet disconnected
        setWalletAddress(null);
        setClient(null);
        // ... other cleanup or state updates ...
      }
    };
  
    // Subscribe to status changes when the component mounts
  
    // Unsubscribe when the component unmounts
    return () => unsubscribe();
  }, [tonConnectUI]);
  
  

  const handleConnect = () => {
    if (tonConnectUI && 'open' in tonConnectUI && typeof tonConnectUI.open === 'function') { tonConnectUI.open();
    }
  };
  const [clicks, setClicks] = useState<{ id: number; x: number; y: number }[]>(
    [],
  );
  const pointsToAdd = 1;
  const energyToReduce = 1;

  const [showTasks, setShowTasks] = useState(false);
  const [showLeaderboard, setShowLeaderboard] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('en');
  const [isLoading, setIsLoading] = useState(true);

  const openLeaderboard = () => {
    setShowLeaderboard(!showLeaderboard);
  };

  const openSettings = () => {
    setShowSettings(!showSettings);
  };

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

  const handleLanguageChange = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    setSelectedLanguage(event.target.value);
  };

  const handleMouseDown = () => setIsPressed(true);
  const handleMouseUp = () => setIsPressed(false);

  // Function to fetch user data from MongoDB
  const fetchUserData = async () => {
    try {
      if (!walletAddress) return;
      const response = await axios.get(`/api/users/${walletAddress}`);
      setPoints(response.data.user.points || 0); 
      setEnergy(response.data.user.energy || 2500); 
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  // Function to save user data to the server
  const saveUserData = async () => {
    try {
      if (!walletAddress) return; 
      const response = await axios.post('/api/users', {
        walletAddress,
        points,
        energy,
      });
      console.log(response.data.message);
    } catch (error) {
      console.error('Error saving user data:', error);
    }
  };

  const handleClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (energy - energyToReduce < 0) {
      return;
    }
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    setPoints(points + pointsToAdd);
    setEnergy(energy - energyToReduce < 0 ? 0 : energy - energyToReduce);
    setClicks([...clicks, { id: Date.now(), x, y }]);

    // Call saveUserData after updating points and energy
    saveUserData();
  };

  const handleAnimationEnd = (id: number) => {
    setClicks((prevClicks) => prevClicks.filter((click) => click.id !== id));
  };

  // useEffect hook to restore energy over time
  useEffect(() => {
    const interval = setInterval(() => {
      setEnergy((prevEnergy) => Math.min(prevEnergy + 1, 2500));
    }, 2000); // Resporce energy every 200ms

    return () => clearInterval(interval);
  }, []);

  setTimeout(() => {
    setIsLoading(false);
  }, 2000);

  // Function to get the translated text
  const t = (key: string) => {
    return translations[selectedLanguage][key] || key;
  };

  return (
    <SessionContextProvider supabaseClient={supabase} initialSession={null}>
      {isLoading ? (
        <div className="loading-screen">
        <div className=" flex flex-col items-center justify-center h-full">
          <img
            src={notcoin} // Using the imported image variable
            alt="Loading..."
            className="w-48 h-48 animate-spin "
          />
          <p className="text-white text-3xl mt-4 font-bold">
            {t('loading')}
          </p>
        </div>
      </div>
    ) : (   
      <div 
        className="bg-gradient-main min-h-screen px-4 flex flex-col items-center text-white font-medium"
        style={{ userSelect: 'none' }}
        >
        <div className="absolute inset-0 h-1/2 bg-gradient-overlay z-0" />
          <div className="absolute inset-0 flex items-center justify-center z-0">
            <div className="radial-gradient-overlay" />
          </div>
          <MyComponent />  
          <div className="w-full z-10 min-h-screen flex flex-col items-center text-white">
            <div className="fixed top-0 left-0 w-full px-6 pt-8 z-10 flex flex-col items-center text-white">
              <div className="w-full cursor-pointer">
                {walletAddress ? (
                  <div>
                    Connected: {walletAddress.slice(0, 6)}...
                    {walletAddress.slice(-4)}
                  </div>
                ) : (
                  <TonConnectButton />
                )}
              </div>

              <button
                className="fixed top-4 right-4 bg-gray-800 p-2 rounded-full"
                onClick={openSettings}
              >
                <svg 
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" 
                  />
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" 
                  />
                </svg>
              </button>
            </div>

            <div className="mt-36 text-5xl font-bold flex items-center">
              <img src={coin} width={44} height={44} alt="Coin" /> 
              <span className="ml-2">{points.toLocaleString()}</span>
            </div>

            <div
              className="text-base mt-2 flex items-center cursor-pointer"
              onClick={openLeaderboard}
            >
            <img
              src={trophy} 
              width={24}
              height={24}
              alt="Trophy"
            />
            <span className="ml-1">
              {t('gold')} {' '}
              <Arrow size={18} className="ml-0 mb-1 inline-block" />
            </span>
          </div>

          <div className="fixed bottom-0 left-0 w-full px-6 pb-8 z-10">
            <div className="w-full flex justify-between gap-2">
              <div className="w-1/3 flex items-center justify-start max-w-32">
                <div className="flex items-center justify-center">
                  <img
                    src={highVoltage} 
                    width={44}
                    height={44}
                    alt="Energy"
                  />
                    <div className="ml-2 text-left">
                      <span className="text-white text-2xl font-bold block">
                        {energy}
                      </span>
                      <span className="text-white text-large opacity-75">
                        / 2500
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
                        <Frens showFrens={showFrens} openFrens={openFrens} />
                      )}
                      <div className="bg-gradient-main" />
                      <img
                      src={bear} 
                      width={24}
                      height={24}
                      alt="Frens"
                    />
                    <span>{t('frens')}</span>
                  </button>

                    <div className="h-[48px] w-[2px] bg-[#000000]" />

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
                      src={coin} 
                      width={24}
                      height={24}
                      alt="Earn"
                    />
                    <span>{t('earn')}</span>
                  </button>

                    <div className="h-[48px] w-[2px] bg-[#000000]" />

                    <button
                      className="flex flex-col items-center gap-1"
                      onClick={openBoosts}
                    >
                      {showBoosts && (
                        <Boosts
                          points={points}
                          showBoosts={showBoosts}
                          openBoosts={openBoosts}
                          onBoostPurchase={(cost) => setPoints(points - cost)}
                          setEnergy={setEnergy}
                        />
                      )}
                    <img
                      src={rocket} 
                      width={24}
                      height={24}
                      alt="Boosts"
                    />
                    <span>{t('boosts')}</span>
                  </button>
                </div>
              </div>
            </div>

              <div className="w-full bg-[#9d909a] rounded-full mt-4">
                <div
                  className="bg-gradient-to-r from-[#40E0D0] to-[#66023c] h-4 rounded-full"
                  style={{ width: `${(energy / 2500) * 100}%` }}
                />
              </div>
            </div>

            <div className="flex-grow flex items-center justify-center select-none pb-24">
            <div
                className="relative mx-auto mt-0"
                onClick={handleClick}
                onMouseDown={handleMouseDown}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseUp}
                onTouchStart={handleMouseDown}
                onTouchEnd={handleMouseUp}
                onTouchCancel={handleMouseUp}
              >
                <img
                  src={notcoin} // Using the imported image variable
                  width={300}
                  height={300}
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
                      animation: 'float 1s ease-out',
                      pointerEvents: 'none',
                    }}
                    onAnimationEnd={() => handleAnimationEnd(click.id)}
                  >
                    {energyToReduce}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {showLeaderboard && (
            <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 z-20">
              <div className="bg-gradient-main p-6 rounded-lg w-full max-w-md relative">
                <button
                  className="absolute top-2 right-2 text-white"
                  onClick={openLeaderboard}
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
                <Leaderboard
                  showLeaderboard={showLeaderboard}
                  openLeaderboard={openLeaderboard}
                />
              </div>
            </div>
          )}

          {showSettings && (
            <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 z-20">
              <div className="bg-gradient-main p-6 rounded-lg w-full max-w-md relative">
                <h2 className="text-2xl font-bold text-center mb-4">
                  {t('settings')}
                </h2>
                <div className="flex items-center justify-between px-4 py-2 bg-[#1f1f1f] rounded-lg">
                  <span className="text-lg">{t('language')}</span>
                  <select
                    value={selectedLanguage}
                    onChange={handleLanguageChange}
                    className="bg-gray-700 text-white rounded-md px-2 py-1"
                  >
                    <option value="en">English</option>
                    <option value="fa">فارسی</option>
                    <option value="ru">Русский</option>
                  </select>
                </div>

                <h2 className="text-2xl font-bold text-center mb-4"></h2>

                <div className="flex items-center justify-between px-4 py-2 bg-[#1f1f1f] rounded-lg mb-2">
                  <span className="text-lg">{t('music')}</span>
                  <label className="switch">
                    <input type="checkbox" />
                    <span className="slider round" />
                  </label>
                </div>

                <div className="flex items-center justify-between px-4 py-2 bg-[#1f1f1f] rounded-lg">
                  <span className="text-lg">{t('soundEffects')}</span>
                  <label className="switch">
                    <input type="checkbox" />
                    <span className="slider round" />
                  </label>
                </div>

                <button 
                  className="absolute top-2 right-2 text-white" 
                  onClick={openSettings}
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
              </div>
            </div>
          )}
      </div>
      )} {/* Correct closing curly brace for ternary expression */}
    </SessionContextProvider>  // Correct closing of provider
  );
}


export default App;
