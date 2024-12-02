import React from 'react';
interface Props {
    showTasks: boolean;
    openEarn: () => void;
    onTaskComplete: (reward: number) => void;
}
declare const Tasks: React.FC<Props>;
export default Tasks;
