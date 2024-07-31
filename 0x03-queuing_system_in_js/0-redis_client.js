import redis from 'redis';

// Create a Redis Client
const client = redis.createClient({
  url: 'redis://127.0.0.1:6379',
});

// Connect to Redis
client.connect();

client.on('error', (err) => {
  console.error(`Redis client not connected to the server: ${err.message}`);
});

client.on('connect', () => {
  console.log('Redis client connected to the server');
});
