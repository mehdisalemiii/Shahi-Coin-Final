module.exports = {
  apps: [
    {
      name: "my-telegram-bot",
      script: require.resolve("./webhook"), // Or __dirname + '/webhook.js'
      instances: 1, // Or more if you want multiple instances/clustering
      exec_mode: "cluster", // If using multiple instances
      autorestart: true, // Restart the app if it crashes
      watch: false,  // Don't restart on file changes in development. Use true in development with nodemon or similar.
      max_memory_restart: "1G", // Optional: restart if memory usage exceeds 1GB
      env: {
        NODE_ENV: "production",
        TELEGRAM_BOT_TOKEN: process.env.TELEGRAM_BOT_TOKEN,  // Add your environment variables here
        DATABASE_URL: process.env.DATABASE_URL,
        // ... other environment variables
      },
      env_development: { // Separate env variables for development if needed
        NODE_ENV: "development",
        // ... other dev environment variables
      },
    },
  ],
};
