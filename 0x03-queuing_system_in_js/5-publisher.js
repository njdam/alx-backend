import pkg from 'redis';
const { createClient } = pkg;

// Create a Redis Client
const client = createClient({
  url: 'redis://127.0.0.1:6379',
});

// Connect to Redis
client.connect();

// Handle connection errors
client.on('error', (err) => {
  console.error(`Redis client not connected to the server: ${err}`);
});

// Log when the Redis client connects
client.on('connect', () => {
  console.log('Redis client connected to the server');
});

// Function to publish a message
function publishMessage(message, time) {
  setTimeout(() => {
    console.log(`About to send ${message}`);
    client.publish('holberton school channel', message);
  }, time);
}

// Call the function with the messages
publishMessage("Holberton Student #1 starts course", 100);
publishMessage("Holberton Student #2 starts course", 200);
publishMessage("KILL_SERVER", 300);
publishMessage("Holberton Student #3 starts course", 400);
