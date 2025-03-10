"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// © 2024 Malith Rukshan - https://github.com/Malith-Rukshan
const react_1 = __importDefault(require("react"));
const client_1 = __importDefault(require("react-dom/client"));
const App_tsx_1 = __importDefault(require("./App.tsx"));
require("./index.css");
client_1.default.createRoot(document.getElementById('root')).render(react_1.default.createElement(react_1.default.StrictMode, null,
    react_1.default.createElement(App_tsx_1.default, null)));
