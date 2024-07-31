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
  // Subscribe to the channel
  client.subscribe('holberton school channel', (message, channel) => {
    console.log(message);
    // Unsubscribe and quit if message is KILL_SERVER
    if (message === 'KILL_SERVER') {
      client.unsubscribe(channel, () => {
        client.quit();
      });
    }
  });
});
