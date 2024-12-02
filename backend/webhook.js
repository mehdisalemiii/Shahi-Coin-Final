import express from 'express';
import bot from './bot.js';  // Correct import path
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL; // Move inside file since it is used here
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

const router = express.Router();

router.post('/webhook', async (req, res) => {
    try {
        const { message } = req.body;
        const { text, chat } = message;
        const { id: chatId } = chat;
        const telegramId = String(message.from.id); // Ensure telegramId is a string


        if (text === '/start') {

                const { data, error } = await supabase
                  .from('users')
                  .upsert([{ telegram_id: telegramId, chat_id: chatId }]); // Assuming 'users' is your table name
              
                if (error) {
                  console.error('Error upserting user:', error);
                  return bot.sendMessage(chatId, "There was an error registering you.");
                }
                await bot.sendMessage(chatId, "Welcome!");


        } else if (text === '/balance') {
            try {
              const { data, error } = await supabase
                .from('users') // Replace with your actual table name
                .select('balance') // Select the balance field
                .eq('telegram_id', telegramId); // Correctly query using the telegram_id field


              if (error) {
                console.error('Error fetching balance:', error);
                return bot.sendMessage(chatId, 'Error fetching your balance.');
              }


              if (!data || data.length === 0) {
                return bot.sendMessage(chatId, "You haven't started using the bot yet. Use /start.");
              }
              const balance = data[0].balance || 0;
              await bot.sendMessage(chatId, `Your balance is: ${balance} coins`);


            } catch (error) {
              console.error('Error during /balance command:', error);
              await bot.sendMessage(chatId, 'An unexpected error occurred during /balance.');

            }

        }
        // ... other commands
    } catch (error) {
        console.error('Error in webhook:', error);
        await bot.sendMessage(telegramId, 'Something went wrong. Please try again later.');
    }
});

export default router;

