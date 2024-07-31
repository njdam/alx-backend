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
  // Call functions to set and display hash values
  setHashValues();
});

// Function to set hash values
function setHashValues() {
  client.hSet('HolbertonSchools', 'Portland', '50', print);
  client.hSet('HolbertonSchools', 'Seattle', '80', print);
  client.hSet('HolbertonSchools', 'New York', '20', print);
  client.hSet('HolbertonSchools', 'Bogota', '20', print);
  client.hSet('HolbertonSchools', 'Cali', '40', print);
  client.hSet('HolbertonSchools', 'Paris', '2', print);

  // After setting the hash values, display them
  displayHashValues();
}

// Function to display hash values
function displayHashValues() {
  client.hGetAll('HolbertonSchools', (err, res) => {
    if (err) {
      console.error('Error fetching hash values:', err);
    } else {
      console.log(res);
    }
    // Close the client after operations
    client.quit();
  });
}
