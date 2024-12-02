import TelegramBot from 'node-telegram-bot-api';
import dotenv from 'dotenv';
import HttpsProxyAgent from 'https-proxy-agent';



dotenv.config();

const TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const proxy = process.env.PROXY || null; // 'http://user:pass@host:port' or null if no proxy needed

const botOptions = {};

if (proxy){
    const agent = new HttpsProxyAgent(proxy);
    botOptions.request = { agent };
}


const bot = new TelegramBot(TOKEN, botOptions);

if (!TOKEN) {
  console.error('TELEGRAM_BOT_TOKEN not found in environment variables.');
  process.exit(1);
}



export default bot; // Export the bot instance
