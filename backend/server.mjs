import express from 'express';
import bot from './src/bot.js';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import webhookRouter from './webhook.js';
import userDataRoutes from './routes/userData.js';
import userRoutes from './routes/userRoutes.js'; // Import userRoutes


dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


// Combine dotenv calls for clarity
dotenv.config({ path: path.join(__dirname, '../.env') });

const startServer = async () => {
    try {

        const app = express();
        const port = process.env.PORT || 5000;

        app.use(express.json());

        // Correct path.join
        const buildPath = path.join(__dirname, '..', 'build'); // Assuming 'build' is directly under the project root
        app.use(express.static(buildPath));

        // Log environment variables *after* loading .env
        console.log("Supabase URL:", process.env.NEXT_PUBLIC_SUPABASE_URL);
        console.log("Supabase Anon Key:", process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);
        console.log("Supabase Service Role Key:", process.env.SUPABASE_SERVICE_ROLE_KEY)




        // API Routes
        app.use('/api/users', userRoutes);
        app.use('/api/telegram', webhookRouter);
        app.use('/api/userData', userDataRoutes);


        // Catch-all route for React Router.
        // Correct path.join
        app.get('*', (req, res) => {
          res.sendFile(path.join(buildPath, 'index.html')); // Corrected path
        });

        // Error handling middleware
        app.use((err, req, res, next) => {
            console.error(err.stack);
            res.status(500).send('Internal Server Error'); // Send plain text for errors.
        });

        app.listen(port, '0.0.0.0', () => {  // Explicitly listen on all interfaces
            console.log(`Server running on port ${port}`);
            console.log('Bot is listening for webhooks...');
        });

    } catch (error) {
        console.error('Error starting server:', error);
        process.exit(1); // Exit the process on a database or other critical error
    }
};

startServer();

export default startServer;

