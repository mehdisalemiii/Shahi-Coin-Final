// © 2024 Malith Rukshan - https://github.com/Malith-Rukshan
import React, { useState } from 'react';
import { Task } from './types'; 

interface Props {
  showTasks: boolean;
  openEarn: () => void; // Use openEarn instead of openFrens
  onTaskComplete: (reward: number) => void; // Function to update points in App.tsx
}

const Tasks: React.FC<Props> = ({ showTasks, openEarn, onTaskComplete }) => {
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: 1,
      description: 'Subscribe to YouTube',
      reward: 500,
      completed: false,
      link: 'https://www.youtube.com/@ShahiCoinCrypto',
    },
    {
      id: 2,
      description: 'Join Telegram Group',
      reward: 1000,
      completed: false,
      link: 'https://t.me/ShahiCoinCrypto',
    },
    // Add more tasks here
  ]);

  const handleTaskComplete = (taskId: number) => {
    const completedTask = tasks.find(task => task.id === taskId);

    if (completedTask && !completedTask.completed) {
      setTasks(prevTasks =>
        prevTasks.map(task =>
          task.id === taskId ? { ...task, completed: true } : task,
        ),
      );

      onTaskComplete(completedTask.reward); // Notify App.tsx about the reward
    }
  };

  return (
    <div
      className={`${
        showTasks ? 'fixed' : 'hidden'
      } top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 z-20`}
    >
      <div className="bg-gradient-main p-6 rounded-lg w-full max-w-md relative">
        {/* Close Button */}
        <button
          className="absolute top-2 right-2 text-white"
          onClick={openEarn} // Use openEarn to close the modal
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

        <h2 className="text-2xl font-bold text-center mb-4">Earn Rewards</h2>
        <ul className="space-y-4">
          {tasks.map((task) => (
            <li
              key={task.id}
              className={`bg-[#1f1f1f] p-4 rounded-lg flex items-center justify-between ${
                task.completed ? 'opacity-50 line-through' : ''
              }`}
            >
              <div>
                <p className="text-lg">{task.description}</p>
                {task.completed && (
                  <span className="text-green-500">Completed!</span>
                )}
              </div>
              {!task.completed && (
                <a
                  href={task.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
                  onClick={() => handleTaskComplete(task.id)}
                >
                  Go
                </a>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Tasks;