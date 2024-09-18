"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
// © 2024 Malith Rukshan - https://github.com/Malith-Rukshan
const react_1 = __importStar(require("react"));
const Tasks = ({ showTasks, openEarn, onTaskComplete }) => {
    const [tasks, setTasks] = (0, react_1.useState)([
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
            link: 'https://t.me/yourgroup',
        },
        // Add more tasks here
    ]);
    const handleTaskComplete = (taskId) => {
        const completedTask = tasks.find(task => task.id === taskId);
        if (completedTask && !completedTask.completed) {
            setTasks(prevTasks => prevTasks.map(task => task.id === taskId ? Object.assign(Object.assign({}, task), { completed: true }) : task));
            onTaskComplete(completedTask.reward); // Notify App.tsx about the reward
        }
    };
    return (react_1.default.createElement("div", { className: `${showTasks ? 'fixed' : 'hidden'} top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 z-20` },
        react_1.default.createElement("div", { className: "bg-gradient-main p-6 rounded-lg w-full max-w-md relative" },
            react_1.default.createElement("button", { className: "absolute top-2 right-2 text-white", onClick: openEarn },
                react_1.default.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", className: "h-6 w-6", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor" },
                    react_1.default.createElement("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M6 18L18 6M6 6l12 12" }))),
            react_1.default.createElement("h2", { className: "text-2xl font-bold text-center mb-4" }, "Earn Rewards"),
            react_1.default.createElement("ul", { className: "space-y-4" }, tasks.map((task) => (react_1.default.createElement("li", { key: task.id, className: `bg-[#1f1f1f] p-4 rounded-lg flex items-center justify-between ${task.completed ? 'opacity-50 line-through' : ''}` },
                react_1.default.createElement("div", null,
                    react_1.default.createElement("p", { className: "text-lg" }, task.description),
                    task.completed && (react_1.default.createElement("span", { className: "text-green-500" }, "Completed!"))),
                !task.completed && (react_1.default.createElement("a", { href: task.link, target: "_blank", rel: "noopener noreferrer", className: "bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full", onClick: () => handleTaskComplete(task.id) }, "Go")))))))));
};
exports.default = Tasks;
