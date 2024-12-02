// © 2024 Malith Rukshan - https://github.com/Malith-Rukshan
import React, { useState, useEffect } from 'react';

interface LeaderboardEntry {
  address: string;
  points: number;
}

interface Props {
  showLeaderboard: boolean;
  openLeaderboard: () => void;
}

const Leaderboard: React.FC<Props> = ({ showLeaderboard, openLeaderboard }) => {
  const [leaderboardData, setLeaderboardData] = useState<LeaderboardEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchLeaderboardData = async () => {
      try {
        const response = await fetch('/api/leaderboard'); // Call your API
        const data = await response.json();
        setLeaderboardData(data);
      } catch (error) {
        // ... (handle errors) ...
      } finally {
        setIsLoading(false);
      }
    };

    fetchLeaderboardData();
  }, []);

  return (
    <div
      className={`${
        showLeaderboard ? 'fixed' : 'hidden'
      } top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 z-20`}
    >
      <div className="bg-gradient-main p-6 rounded-lg w-full max-w-md relative">
        {/* Close Button */}
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

        <h1 className="text-4xl font-bold mb-8">Leaderboard</h1>

        {isLoading ? (
          <div className="text-lg">Loading leaderboard...</div>
        ) : (
          <table className="table-auto w-full md:w-3/4 lg:w-1/2">
            <thead>
              <tr className="bg-[#1f1f1f] text-left">
                <th className="px-4 py-2">Rank</th>
                <th className="px-4 py-2">Address</th>
                <th className="px-4 py-2">Points</th>
              </tr>
            </thead>
            <tbody>
              {leaderboardData.map((entry, index) => (
                <tr key={index} className="bg-[#1f1f1f] even:bg-[#2d2d2d]">
                  <td className="px-4 py-2">{index + 1}</td>
                  <td className="px-4 py-2">
                    {entry.address.slice(0, 6)}...{entry.address.slice(-4)}
                  </td>
                  <td className="px-4 py-2">{entry.points.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default Leaderboard;
