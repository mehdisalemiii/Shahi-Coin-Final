// © 2024 Malith Rukshan - https://github.com/Malith-Rukshan
import React, { useState } from 'react';

interface Item {
  name: string;
  cost: number;
  energyLimit: number;
}

class InAppPurchase {
  items: Item[] = [
    { name: 'Turbo', cost: 2000, energyLimit: 3 },
    { name: 'Full Energy', cost: 2000, energyLimit: 1 },
    { name: 'Basic', cost: 2000, energyLimit: 1 },
    { name: 'Neon Coin', cost: 21, energyLimit: 1 },
  ];

  purchaseItem(itemName: string, setEnergy: React.Dispatch<React.SetStateAction<number>>): string { // Add setEnergy as a parameter
    const item = this.items.find((i) => i.name === itemName);
    if (item) {
      if (itemName === 'Full Energy') {
        setEnergy(2500); // Reset energy to 6500 for "Full Energy" purchase
        return 'Energy refilled!';
      } else {
        // Logic to handle other purchases (e.g., deduct coins, apply boost)
        return `Purchased ${item.name} for ${item.cost} coins.`;
      }
    } else {
      return `Item ${itemName} not found.`;
    }
  }

  getAvailableItems(): Item[] {
    return this.items;
  }
}

interface Props {
  showBoosts: boolean;
  openBoosts: () => void;
  onBoostPurchase: (cost: number) => void;
  points: number;
  setEnergy: React.Dispatch<React.SetStateAction<number>>; // Add setEnergy as a prop
}

const Boosts: React.FC<Props> = ({ showBoosts, openBoosts, onBoostPurchase, points, setEnergy }) => { // Pass setEnergy to Boosts
  const [iap] = useState(new InAppPurchase());

  const handlePurchase = (itemName: string, cost: number) => {
    if (points >= cost) {
      onBoostPurchase(cost);
      const purchaseMessage = iap.purchaseItem(itemName, setEnergy); // Pass setEnergy to purchaseItem
      alert(purchaseMessage); // Display the message from purchaseItem
      // Additional logic after successful purchase
    } else {
      alert('Not enough coins!');
    }
  };

  return (
    <div
      className={`${
        showBoosts ? 'fixed' : 'hidden'
      } top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 z-20`}
    >
      <div className="bg-gradient-main p-6 rounded-lg w-full max-w-md relative">
        {/* Close Button */}
        <button
          className="absolute top-2 right-2 text-white"
          onClick={openBoosts}
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

        <h2 className="text-2xl font-bold text-center mb-4">Buy Boosts</h2>
        <ul className="space-y-4">
          {iap.getAvailableItems().map((item) => (
            <li
              key={item.name}
              className="bg-[#1f1f1f] p-4 rounded-lg flex items-center justify-between" 
            >
              <div>
                <p className="text-lg font-bold">{item.name}</p>
                <p className="text-sm">Cost: {item.cost} coins</p>
              </div>
              <button
                className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full 
                  ${points >= item.cost ? '' : 'opacity-50 cursor-not-allowed'}`} // Apply styles to button only
                onClick={() => handlePurchase(item.name, item.cost)}
                disabled={points < item.cost}
              >
                Buy
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Boosts;
