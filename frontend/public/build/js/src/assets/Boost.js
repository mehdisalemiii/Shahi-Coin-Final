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
class InAppPurchase {
    constructor() {
        this.items = [
            { name: 'Turbo', cost: 2000, energyLimit: 3 },
            { name: 'Full Energy', cost: 2000, energyLimit: 1 },
            { name: 'Basic', cost: 2000, energyLimit: 1 },
            { name: 'Neon Coin', cost: 2000, energyLimit: 1 },
            { name: 'Galloon Gold', cost: 2000, energyLimit: 1 },
            { name: 'Fanton', cost: 2000, energyLimit: 1 },
            { name: 'Solidus AI Tech', cost: 2000, energyLimit: 1 },
            { name: 'Whale', cost: 2000, energyLimit: 1 },
        ];
    }
    purchaseItem(itemName) {
        const item = this.items.find((i) => i.name === itemName);
        if (item) {
            // Logic to handle the purchase (e.g., deduct coins, apply boost)
            return `Purchased ${item.name} for ${item.cost} coins.`;
        }
        else {
            return `Item ${itemName} not found.`;
        }
    }
    getAvailableItems() {
        return this.items;
    }
}
const Boosts = ({ showBoosts, openBoosts, onBoostPurchase }) => {
    const [iap] = (0, react_1.useState)(new InAppPurchase());
    const handlePurchase = (itemName, cost) => {
        // Assuming you have a function like deductPoints in App.tsx
        onBoostPurchase(cost);
        iap.purchaseItem(itemName);
        // Additional logic after successful purchase, like applying the boost
    };
    return (react_1.default.createElement("div", { className: `${showBoosts ? 'fixed' : 'hidden'} top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 z-20` },
        react_1.default.createElement("div", { className: "bg-gradient-main p-6 rounded-lg w-full max-w-md relative" },
            react_1.default.createElement("button", { className: "absolute top-2 right-2 text-white", onClick: openBoosts },
                react_1.default.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", className: "h-6 w-6", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor" },
                    react_1.default.createElement("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M6 18L18 6M6 6l12 12" }))),
            react_1.default.createElement("h2", { className: "text-2xl font-bold text-center mb-4" }, "Buy Boosts"),
            react_1.default.createElement("ul", { className: "space-y-4" }, iap.getAvailableItems().map((item) => (react_1.default.createElement("li", { key: item.name, className: "bg-[#1f1f1f] p-4 rounded-lg flex items-center justify-between" },
                react_1.default.createElement("div", null,
                    react_1.default.createElement("p", { className: "text-lg font-bold" }, item.name),
                    react_1.default.createElement("p", { className: "text-sm" },
                        "Cost: ",
                        item.cost,
                        " coins")),
                react_1.default.createElement("button", { className: "bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full", onClick: () => handlePurchase(item.name, item.cost) }, "Buy"))))))));
};
exports.default = Boosts;
