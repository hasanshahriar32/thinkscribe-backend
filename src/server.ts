import app from './app';
import dotenv from 'dotenv';

// Load environment variables from the .env file
dotenv.config();

// Define the server port: use the PORT from environment variables or default to 3000
const PORT = process.env.PORT || 3000;

// Start the Express server and listen on the specified port
app.listen(PORT, () => {
  // Log a message once the server is successfully running
  console.log(`🚀 Server running on port ${PORT}`);
});
