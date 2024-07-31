import { createQueue } from 'kue';
import redis from 'redis';

// Create a Redis client
const redisClient = redis.createClient({
  url: 'redis://127.0.0.1:6379',
  password: '   ', // Replace with your Redis password if needed
});

// Create a Kue queue
const queue = createQueue({name: 'push_notification_code'});

// Define a job
const job = queue.create('push_notification_code', {
  phoneNumber: '+250788637034',
  message: 'Account registered',
});

// Save the job and attach event listeners
job
  .on('enqueue', () => {
    console.log(`Notification job created: ${job.id}`);
  })
  .on('complete', () => {
    console.log('Notification job completed');
  })
  .on('failed attempt', (errorMessage) => {
    console.log(`Notification job failed: ${errorMessage}`);
  });

// Save the job to the queue
job.save((err) => {
  if (err) {
    console.error('Error saving job:', err);
  }
});
