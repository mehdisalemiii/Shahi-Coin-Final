import { PrismaClient } from '@prisma/client';
import { createClient } from '@supabase/supabase-js';
import type { NextApiRequest, NextApiResponse } from 'next'; // If using Next.js


const prisma = new PrismaClient();
const supabase = createClient('https://oyscvyoyggihyzxvtuus.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im95c2N2eW95Z2dpaHl6eHZ0dXVzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzI2MjgxMjIsImV4cCI6MjA0ODIwNDEyMn0.LQQLq_7Enqtsi8s4bm9DAEXU_O3BUI1hOI7GsmFVcW');


async function importTelegramUsers(users: any) {
    try {
        const { error } = await supabase.from('telegram_users').insert(users);
        if (error) {
            console.error('Error importing users:', error);
            throw error;  // Re-throw the error to be caught by the outer try...catch
        } else {
            console.log('Users imported successfully!');
        }
    } catch (error) {
        console.error('Error importing users:', error);
        throw error;  // Re-throw the error
    }
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) { // If using Next.js API routes
    try {
        const users = await prisma.telegramUser.findMany();

        await importTelegramUsers(users); // Call the import function


        res.status(200).json({ message: 'Users exported and imported successfully' });

    } catch (error) {
        console.error('Error exporting or importing users:', error);
        res.status(500).json({ error: 'Failed to export or import users' });
    } finally {
        await prisma.$disconnect();
    }
}

