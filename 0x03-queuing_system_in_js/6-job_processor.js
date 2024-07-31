import { createQueue } from 'kue';
import redis from 'redis';

// Create a Redis client
const redisClient = redis.createClient({
  url: 'redis://127.0.0.1:6379',
  password: '   ', // Replace with your Redis password if needed
});

// Create a Kue queue
const queue = createQueue({name: 'push_notification_code'});

// Define the function to send notifications
function sendNotification(phoneNumber, message) {
  console.log(`Sending notification to ${phoneNumber}, with message: ${message}`);
}

// Define the queue process for 'push_notification_code'
queue.process('push_notification_code', (job, done) => {
  const { phoneNumber, message } = job.data;
  sendNotification(phoneNumber, message);
  done(); // Mark the job as completed
});

// Handle errors
queue.on('error', (err) => {
  console.error('Queue error:', err);
});

console.log('Job processor started');
