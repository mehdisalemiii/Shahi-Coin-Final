import TelegramBot from 'node-telegram-bot-api';
import express from 'express';
import { MongoClient } from 'mongodb';

const app = express();
const port = process.env.PORT || 3001;

// Replace with your actual bot token
const TOKEN = '7371789173:AAHUm3X77BWTeHlVDEmTqL1OG9UsDYTL_q0';

const bot = new TelegramBot(TOKEN, { polling: true });

// Connect to MongoDB
const uri = 'mongodb://root:w11gtQZhbR1xHT33jpvuEjs8@monte-rosa.liara.cloud:33997/my-app?authSource=admin';
const client = new MongoClient(uri);

async function connectToDatabase() {
  try {
    await client.connect();
    console.log('Connected to MongoDB!');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
}

connectToDatabase();

// Define a function to get a user's data from MongoDB
async function getUserData(chatId) {
  const db = client.db('my-app');
  const collection = db.collection('users');
  const userData = await collection.findOne({ chatId });
  return userData;
}

// Define a function to update a user's data in MongoDB
async function updateUserData(chatId, data) {
  const db = client.db('my-app');
  const collection = db.collection('users');
  await collection.updateOne({ chatId }, { $set: data }, { upsert: true });
}

// Handle `/start` command
bot.onText(/\/start/, async (msg) => {
  const chatId = msg.chat.id;
  const userData = await getUserData(chatId);
  if (!userData) {
    await updateUserData(chatId, { points: 0 });
  }
  bot.sendMessage(chatId, 'Welcome! Use these commands:\n/earn - See available tasks\n/balance - Check your balance\n/withdraw - Withdraw your earnings');
});

// Sample tasks (replace with your actual tasks)
const tasks = [
  { id: 1, description: 'Subscribe to YouTube', link: 'https://www.youtube.com/@ShahiCoinCrypto', reward: 10 },
  { id: 2, description: 'Join Telegram Group', link: 'https://t.me/ShahiCoinCrypto', reward: 5 },
  // ... more tasks
];

// Handle `/earn` command
bot.onText(/\/earn/, async (msg) => {
  const chatId = msg.chat.id;
  const taskList = tasks.map((task) => `${task.id}. ${task.description} - ${task.link} (Reward: ${task.reward} coins)`).join('\n');
  bot.sendMessage(chatId, `Complete these tasks:\n${taskList}`);
});

// Handle `/balance` command
bot.onText(/\/balance/, async (msg) => {
  const chatId = msg.chat.id;
  const userData = await getUserData(chatId);
  bot.sendMessage(chatId, `Your balance is: ${userData.points} coins`);
});

// Handle `/withdraw` command
bot.onText(/\/withdraw/, async (msg) => {
  const chatId = msg.chat.id;
  const userData = await getUserData(chatId);
  if (userData.points >= 100) {
    await updateUserData(chatId, { points: userData.points - 100 });
    bot.sendMessage(chatId, 'Withdrawal successful!');
  } else {
    bot.sendMessage(chatId, 'Insufficient balance!');
  }
});

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});