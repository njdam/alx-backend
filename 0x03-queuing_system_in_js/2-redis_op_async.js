import pkg from 'redis';
import { promisify } from 'util';
const { createClient, print } = pkg;

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
client.on('connect', async () => {
  console.log('Redis client connected to the server');
  await main();
});

// Promisify Redis commands
const getAsync = promisify(client.get).bind(client);

// Function to set a new school value
async function setNewSchool(schoolName, value) {
  const stat = await client.set(schoolName, value, print);
  console.log(`Reply: ${stat}`);
}

// Function to display the value of a school
const displaySchoolValue = async (schoolName) => {
  const reply = await getAsync(schoolName);
  console.log(reply);
};

// Call the functions as required
async function main() {
  await displaySchoolValue('Holberton');
  setNewSchool('HolbertonSanFrancisco', '100');
  await displaySchoolValue('HolbertonSanFrancisco');
}
