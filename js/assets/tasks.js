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
// © 2024 Malith Rukshan - https://github.com/Malith-Rukshan
const react_1 = __importStar(require("react"));
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
    function openFrens(event) {
        throw new Error('Function not implemented.');
    }
    return (react_1.default.createElement("div", { className: "bg-gradient-main min-h-screen px-4 flex flex-col\r\n    items-center text-white font-medium" },
        react_1.default.createElement("div", { className: "fixed top-0 left-0 w-full px-4 pt-8 z-10\r\n        flex flex-col items-center text-white" },
            react_1.default.createElement("div", { className: "w-full cursor-pointer" },
                react_1.default.createElement("div", { className: "bg-[#1f1f1f] text-center py-2\r\n            rounded-xl" },
                    react_1.default.createElement("button", { className: "flex-col items-center" },
                        react_1.default.createElement("p", { className: "text-lg" }, "Invite Friends")))),
            react_1.default.createElement("div", { className: "fixed top-10 left-0 w-full px-8 pt-16 z-18\r\n          flex flex-col items-center text-white" },
                react_1.default.createElement("div", { className: "w-full cursor-pointer" },
                    react_1.default.createElement("div", { className: "bg-[#ff0000] text-center py-2\r\n              rounded-xl" },
                        react_1.default.createElement("button", { className: "flex-col items-center" },
                            react_1.default.createElement("a", { href: "www.youtube.com" },
                                react_1.default.createElement("p", { className: "text-lg" }, "YouTube Sub")))))))));
};
exports.default = Tasks;
