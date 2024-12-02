"use strict";
// © 2024 Malith Rukshan - https://github.com/Malith-Rukshan
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const Arrow_js_1 = __importDefault(require("./Assets/Arrow.js"));
const react_2 = __importDefault(require("react"));
const tasks_js_1 = __importDefault(require("./Assets/tasks.js"));
function App() {
    const [isPressed, setIsPressed] = (0, react_1.useState)(false);
    const [points, setPoints] = (0, react_1.useState)(42857775);
    const [energy, setEnergy] = (0, react_1.useState)(2532);
    const [clicks, setClicks] = (0, react_1.useState)([]);
    const pointsToAdd = 12;
    const energyToReduce = 12;
    const [showTasks, setShowTasks] = (0, react_1.useState)(false);
    const openFrens = () => {
        setShowTasks(!showTasks);
    };
    const handleMouseDown = () => setIsPressed(true);
    const handleMouseUp = () => setIsPressed(false);
    const openGithub = () => {
        window.open('https://github.com/Malith-Rukshan/NotCoin-Mini-App-Clone');
    };
    const handleClick = (e) => {
        if (energy - energyToReduce < 0) {
            return;
        }
        const rect = e.currentTarget.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        setPoints(points + pointsToAdd);
        setEnergy(energy - energyToReduce < 0 ? 0 : energy - energyToReduce);
        setClicks([...clicks, { id: Date.now(), x, y }]);
    };
    const handleAnimationEnd = (id) => {
        setClicks((prevClicks) => prevClicks.filter(click => click.id !== id));
    };
    // useEffect hook to restore energy over time
    (0, react_1.useEffect)(() => {
        const interval = setInterval(() => {
            setEnergy((prevEnergy) => Math.min(prevEnergy + 1, 6500));
        }, 200); // Resporce energy every 200ms
        return () => clearInterval(interval); // Clear interval on component unmount
    }, []);
    return (react_2.default.createElement("div", { className: "bg-gradient-main min-h-screen px-4 flex flex-col items-center text-white font-medium", style: { userSelect: `none` } },
        react_2.default.createElement("div", { className: "absolute inset-0 h-1/2 bg-gradient-overlay z-0" }),
        react_2.default.createElement("div", { className: "absolute inset-0 flex items-center justify-center z-0" },
            react_2.default.createElement("div", { className: "radial-gradient-overlay" })),
        react_2.default.createElement("div", { className: "w-full z-10 min-h-screen flex flex-col items-center text-white" },
            react_2.default.createElement("div", { className: "fixed top-0 left-0 w-full px-6 pt-8 z-10 flex flex-col items-center text-white" },
                react_2.default.createElement("div", { className: "w-full cursor-pointer" },
                    react_2.default.createElement("div", { className: "bg-[#1f1f1f] text-center py-2 rounded-xl backdrop-blur-md" },
                        react_2.default.createElement("a", { href: "https://t.me/SingleDevelopers" },
                            react_2.default.createElement("p", { className: "text-lg" },
                                "Join squad ",
                                react_2.default.createElement(Arrow_js_1.default, { size: 18, className: "ml-0 mb-1 inline-block" }))))),
                react_2.default.createElement("div", { className: "mt-12 text-5xl font-bold flex items-center" },
                    react_2.default.createElement("img", { src: './images/coin.png', width: 44, height: 44 }),
                    react_2.default.createElement("span", { className: "ml-2" }, points.toLocaleString())),
                react_2.default.createElement("div", { className: "text-base mt-2 flex items-center" },
                    react_2.default.createElement("img", { src: './images/trophy.png', width: 24, height: 24 }),
                    react_2.default.createElement("a", { href: "https://github.com/Malith-Rukshan", target: "_blank", rel: "noopener noreferrer" },
                        react_2.default.createElement("span", { className: "ml-1" },
                            "Gold ",
                            react_2.default.createElement(Arrow_js_1.default, { size: 18, className: "ml-0 mb-1 inline-block" }))))),
            react_2.default.createElement("div", { className: "fixed bottom-0 left-0 w-full px-6 pb-8 z-10" },
                react_2.default.createElement("div", { className: "w-full flex justify-between gap-2" },
                    react_2.default.createElement("div", { className: "w-1/3 flex items-center justify-start max-w-32" },
                        react_2.default.createElement("div", { className: "flex items-center justify-center" },
                            react_2.default.createElement("img", { src: './images/high-voltage.png', width: 44, height: 44, alt: "High Voltage" }),
                            react_2.default.createElement("div", { className: "ml-2 text-left" },
                                react_2.default.createElement("span", { className: "text-white text-2xl font-bold block" }, energy),
                                react_2.default.createElement("span", { className: "text-white text-large opacity-75" }, "/ 6500")))),
                    react_2.default.createElement("div", { className: "flex-grow flex items-center max-w-60 text-sm" },
                        react_2.default.createElement("div", { className: "w-full bg-[#fad258] py-4 rounded-2xl flex justify-around" },
                            react_2.default.createElement("button", { className: "flex flex-col items-center gap-1", onClick: openFrens },
                                react_2.default.createElement("div", { className: "bg-gradient-main ..." },
                                    showTasks && react_2.default.createElement(tasks_js_1.default, null),
                                    " "),
                                react_2.default.createElement("img", { src: './images/bear.png', width: 24, height: 24, alt: "High Voltage" }),
                                react_2.default.createElement("span", null, "Frens")),
                            react_2.default.createElement("div", { className: "h-[48px] w-[2px] bg-[#fddb6d]" }),
                            react_2.default.createElement("button", { className: "flex flex-col items-center gap-1", onClick: openGithub },
                                react_2.default.createElement("img", { src: './images/coin.png', width: 24, height: 24, alt: "High Voltage" }),
                                react_2.default.createElement("span", null, "Earn")),
                            react_2.default.createElement("div", { className: "h-[48px] w-[2px] bg-[#fddb6d]" }),
                            react_2.default.createElement("button", { className: "flex flex-col items-center gap-1", onClick: openGithub },
                                react_2.default.createElement("img", { src: './images/rocket.png', width: 24, height: 24, alt: "High Voltage" }),
                                react_2.default.createElement("span", null, "Boosts"))))),
                react_2.default.createElement("div", { className: "w-full bg-[#f9c035] rounded-full mt-4" },
                    react_2.default.createElement("div", { className: "bg-gradient-to-r from-[#f3c45a] to-[#fffad0] h-4 rounded-full", style: { width: `${(energy / 6500) * 100}%` } }))),
            react_2.default.createElement("div", { className: "flex-grow flex items-center justify-center select-none" },
                react_2.default.createElement("div", { className: "relative mt-4", onClick: handleClick, onMouseDown: handleMouseDown, onMouseUp: handleMouseUp, onMouseLeave: handleMouseUp, onTouchStart: handleMouseDown, onTouchEnd: handleMouseUp, onTouchCancel: handleMouseUp },
                    react_2.default.createElement("img", { src: './images/notcoin.png', width: 256, height: 256, alt: "notcoin", draggable: "false", style: {
                            pointerEvents: 'none',
                            userSelect: 'none',
                            transform: isPressed ? 'translateY(4px)' : 'translateY(0px)',
                            transition: 'transform 100ms ease',
                        }, className: 'select-none' }),
                    clicks.map((click) => (react_2.default.createElement("div", { key: click.id, className: "absolute text-5xl font-bold opacity-0", style: {
                            top: `${click.y - 42}px`,
                            left: `${click.x - 28}px`,
                            animation: `float 1s ease-out`,
                            pointerEvents: `none`
                        }, onAnimationEnd: () => handleAnimationEnd(click.id) }, energyToReduce))))))));
}
exports.default = App;
