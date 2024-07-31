import pkg from 'redis';
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
client.on('connect', () => {
  console.log('Redis client connected to the server');
});

// Function to set a new school value
async function setNewSchool(schoolName, value) {
  const stat = await client.set(schoolName, value, print);
  console.log(`Reply: ${stat}`);
}

// Function to display the value of a school
async function displaySchoolValue(schoolName) {
  const reply = await client.get(schoolName);
  console.log(reply);
}

// Call the functions as required
displaySchoolValue('Holberton');
setNewSchool('HolbertonSanFrancisco', '100');
displaySchoolValue('HolbertonSanFrancisco');
