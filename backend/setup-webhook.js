// setup-webhook.js

import TelegramBot from 'node-telegram-bot-api';
import dotenv from 'dotenv';

dotenv.config(); // Load .env file
const TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const apiBaseUrl = process.env.APP_BASE_URL;


const bot = new TelegramBot(TOKEN);

//set webhook
bot.setWebHook(`${apiBaseUrl}/api/telegram/webhook`).then(res => {
  console.log(res);
}).catch(err => {
  console.log(err);
})
