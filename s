// © 2024 Malith Rukshan - https://github.com/Malith-Rukshan
// © 2024 Malith Rukshan - https://github.com/Malith-Rukshan
import React, { useState } from 'react';
import { Task } from './types'; 
import Arrow from './Arrow.tsx'; 

const Tasks: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([
    { id: 1, description: 'Subscribe to YouTube', reward: 500, completed: false, link: 'https://youtube.com/yourchannel' },
    { id: 2, description: 'Join Telegram Group', reward: 1000, completed: false, link: 'https://t.me/yourgroup' },
    // Add more tasks here
  ]);

  const handleTaskComplete = (taskId: number) => {
    setTasks(prevTasks => prevTasks.map(task => 
      task.id === taskId ? { ...task, completed: true } : task
    ));
    // Here you can add logic to reward the user, e.g.,
    // setPoints(points + task.reward);
  };

  return (
   <div className={`tasks-panel ${showTasks ? 'open' : ''}`}> 
    <div className="bg-gradient-main min-h-screen px-4 flex flex-col items-center text-white font-medium" style={{ userSelect: 'none' }}>
      <div className="absolute inset-0 h-1/2 bg-gradient-overlay z-0"></div>
      <div className="absolute inset-0 flex items-center justify-center z-0">
        <div className="radial-gradient-overlay"></div>
      </div>

      <div className="w-full z-10 min-h-screen flex flex-col items-center text-white">
        <div className="fixed top-0 left-0 w-full px-6 pt-8 z-10 flex flex-col items-center text-white">
          <div className="w-full cursor-pointer">
            <div className="bg-[#1f1f1f] text-center py-2 rounded-xl backdrop-blur-md">
              <a href="https://t.me/SingleDevelopers">
                <p className="text-lg">Join squad <Arrow size={18} className="ml-0 mb-1 inline-block" /></p>
              </a>
            </div>
          </div>
          {/* You can add or remove elements from the header as needed */}
        </div>

        <div className="mt-20 flex-grow flex flex-col items-center justify-center select-none"> 
          <h2 className="text-2xl font-bold mb-4">Tasks</h2>
          <ul className="bg-[#1f1f1f] rounded-xl p-4 backdrop-blur-md w-full max-w-md">
            {tasks.map(task => (
              <li key={task.id} className="mb-2 flex items-center justify-between">
                <span className={`text-lg ${task.completed ? 'line-through text-gray-400' : ''}`}>
                  {task.description}
                </span>
                {task.link && !task.completed && (
                  <a href={task.link} target="_blank" rel="noopener noreferrer" className="px-4 py-2 bg-blue-500 rounded-xl text-white">
                    Go
                  </a>
                )}
                {!task.completed && !task.link && (
                  <button onClick={() => handleTaskComplete(task.id)} className="px-4 py-2 bg-green-500 rounded-xl text-white">
                    Complete
                  </button>
                )}
                {task.completed && (
                  <span className="text-green-500">Completed!</span>
                )}
              </li>
            ))}
          </ul>
        </div>

        {/* You can add a footer similar to the main page if needed */}
      </div>
    </div>
  </div>
  );
};

export default Tasks;
