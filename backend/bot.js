import TelegramBot from 'node-telegram-bot-api';
import express from 'express';
import { json } from 'body-parser'; 
import { db, app as firebaseApp } from './firebase'; // Import Firebase
import { getDatabase, ref, set, get, update } from 'firebase/database';

// Replace with your actual bot token
const TOKEN = '7371789173:AAHUm3X77BWTeHlVDEmTqL1OG9UsDYTL_q0'; 

const bot = new TelegramBot(TOKEN, { polling: true });
const app = express();
const port = process.env.PORT || 3000;

// Basic setup for Express to handle POST requests
app.use(json()); 

// Handle `/start` command
bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;
  bot.sendMessage(chatId, 'Welcome! Use these commands:\n/earn - See available tasks\n/balance - Check your balance\n/withdraw - Withdraw your earnings');
});

// Sample tasks (replace with your actual tasks)
const tasks = [
  { id: 1, description: 'Subscribe to YouTube', link: 'https://www.youtube.com/@ShahiCoinCrypto', reward: 10 },
  { id: 2, description: 'Join Telegram Group', link: 'https://t.me/ShahiCoinCrypto', reward: 5 },
  // ... more tasks
];


// User data (in-memory storage for simplicity, use a database in production)
const users = {};

// Handle `/earn` command
bot.onText(/\/earn/, (msg) => {
  const chatId = msg.chat.id;
  const taskList = tasks.map((task) => `${task.id}. ${task.description} - ${task.link} (Reward: ${task.reward} coins)`).join('\n');
  bot.sendMessage(chatId, `Complete these tasks:\n${taskList}`);
});

// Handle task completion (example: user sends task ID after completion)
bot.on('message', (msg) => {
  const chatId = msg.chat.id;
  const taskId = parseInt(msg.text);

  if (!isNaN(taskId)) {
    const task = tasks.find((t) => t.id === taskId);
    if (task) {
      const userId = chatId; // Use chatId as user ID
      const userRef = ref(getDatabase(firebaseApp), `users/${userId}`);

      get(userRef).then((snapshot) => {
        if (snapshot.exists()) {
          const currentBalance = snapshot.val().balance || 0;
          update(userRef, { balance: currentBalance + task.reward });
        } else {
          set(userRef, { balance: task.reward });
        }
        bot.sendMessage(chatId, `Task ${taskId} completed! You earned ${task.reward} coins.`);
      }).catch((error) => {
        console.error("Error updating balance:", error);
        bot.sendMessage(chatId, "An error occurred. Please try again later.");
      });
    } else {
      bot.sendMessage(chatId, 'Invalid task ID.');
    }
  }
});

// Handle `/balance` command
bot.onText(/\/balance/, (msg) => {
  const chatId = msg.chat.id;
  const userRef = ref(getDatabase(firebaseApp), `users/${chatId}`); // Use firebaseApp here

  get(userRef).then((snapshot) => {
    const balance = snapshot.exists() ? snapshot.val().balance : 0;
    bot.sendMessage(chatId, `Your balance: ${balance} coins`);
  }).catch((error) => {
    console.error("Error fetching balance:", error);
    bot.sendMessage(chatId, "An error occurred. Please try again later.");
  });
});

// Handle `/withdraw` command (example: placeholder)
bot.onText(/\/withdraw/, (msg) => {
  const chatId = msg.chat.id;
  bot.sendMessage(chatId, 'Withdraw feature is coming soon!');
});

// Error handling for the bot
bot.on('polling_error', (error) => {
  console.error("Polling error:", error); 
});

// Start the Express server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
