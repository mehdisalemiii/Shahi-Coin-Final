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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// © 2024 Malith Rukshan - https://github.com/Malith-Rukshan
// © 2024 Malith Rukshan - https://github.com/Malith-Rukshan
const react_1 = __importStar(require("react"));
const Arrow_tsx_1 = __importDefault(require("./assets/Arrow.tsx"));
const Tasks = () => {
    const [tasks, setTasks] = (0, react_1.useState)([
        { id: 1, description: 'Subscribe to YouTube', reward: 500, completed: false, link: 'https://youtube.com/yourchannel' },
        { id: 2, description: 'Join Telegram Group', reward: 1000, completed: false, link: 'https://t.me/yourgroup' },
        // Add more tasks here
    ]);
    const handleTaskComplete = (taskId) => {
        setTasks(prevTasks => prevTasks.map(task => task.id === taskId ? Object.assign(Object.assign({}, task), { completed: true }) : task));
        // Here you can add logic to reward the user, e.g.,
        // setPoints(points + task.reward);
    };
    return (react_1.default.createElement("div", { className: "bg-gradient-main min-h-screen px-4 flex flex-col items-center text-white font-medium", style: { userSelect: 'none' } },
        react_1.default.createElement("div", { className: "absolute inset-0 h-1/2 bg-gradient-overlay z-0" }),
        react_1.default.createElement("div", { className: "absolute inset-0 flex items-center justify-center z-0" },
            react_1.default.createElement("div", { className: "radial-gradient-overlay" })),
        react_1.default.createElement("div", { className: "w-full z-10 min-h-screen flex flex-col items-center text-white" },
            react_1.default.createElement("div", { className: "fixed top-0 left-0 w-full px-6 pt-8 z-10 flex flex-col items-center text-white" },
                react_1.default.createElement("div", { className: "w-full cursor-pointer" },
                    react_1.default.createElement("div", { className: "bg-[#1f1f1f] text-center py-2 rounded-xl backdrop-blur-md" },
                        react_1.default.createElement("a", { href: "https://t.me/SingleDevelopers" },
                            react_1.default.createElement("p", { className: "text-lg" },
                                "Join squad ",
                                react_1.default.createElement(Arrow_tsx_1.default, { size: 18, className: "ml-0 mb-1 inline-block" })))))),
            react_1.default.createElement("div", { className: "mt-20 flex-grow flex flex-col items-center justify-center select-none" },
                react_1.default.createElement("h2", { className: "text-2xl font-bold mb-4" }, "Tasks"),
                react_1.default.createElement("ul", { className: "bg-[#1f1f1f] rounded-xl p-4 backdrop-blur-md w-full max-w-md" }, tasks.map(task => (react_1.default.createElement("li", { key: task.id, className: "mb-2 flex items-center justify-between" },
                    react_1.default.createElement("span", { className: `text-lg ${task.completed ? 'line-through text-gray-400' : ''}` }, task.description),
                    task.link && !task.completed && (react_1.default.createElement("a", { href: task.link, target: "_blank", rel: "noopener noreferrer", className: "px-4 py-2 bg-blue-500 rounded-xl text-white" }, "Go")),
                    !task.completed && !task.link && (react_1.default.createElement("button", { onClick: () => handleTaskComplete(task.id), className: "px-4 py-2 bg-green-500 rounded-xl text-white" }, "Complete")),
                    task.completed && (react_1.default.createElement("span", { className: "text-green-500" }, "Completed!"))))))))));
};
exports.default = Tasks;
