import sinon from 'sinon';
import { expect } from 'chai';
import kue from 'kue';
import createPushNotificationsJobs from './8-job.js';

describe('createPushNotificationsJobs', () => {
  let queue;
  let spyConsole;
  let jobInfos;

  before(() => {
    queue = kue.createQueue();
    queue.testMode.enter();
    spyConsole = sinon.spy(console, 'log');
    jobInfos = [
      {
        phoneNumber: '44556677889',
        message: 'Use the code 1982 to verify your account',
      },
      {
        phoneNumber: '98877665544',
        message: 'Use the code 1738 to verify your account',
      },
    ];
  });

  after(() => {
    queue.testMode.clear();
    queue.testMode.exit();
    spyConsole.restore();
  });

  it('displays an error message if jobs is not an array', () => {
    expect(() => createPushNotificationsJobs({}, queue)).to.throw('Jobs is not an array');
  });

  it('adds jobs to the queue with the correct type', (done) => {
    createPushNotificationsJobs(jobInfos, queue);

    // Check if jobs are added
    setImmediate(() => {
      const jobs = queue.testMode.jobs;
      expect(jobs.length).to.equal(2);

      // Verify job type and data for the first job
      const firstJob = jobs[0];
      expect(firstJob.data).to.deep.equal(jobInfos[0]);
      expect(firstJob.type).to.equal('push_notification_code_3');

      // Set up a job processor
      queue.process('push_notification_code_3', (job, done) => {
        done();
      });

      // Allow some time for the job to be processed
      setTimeout(() => {
        try {
          expect(spyConsole.calledWith(sinon.match('Notification job created:'))).to.be.true;
          done();
        } catch (err) {
          done(err);
        }
      }, 100);
    });
  });

  it('registers the progress event handler for a job', (done) => {
    createPushNotificationsJobs(jobInfos, queue);
    const job = queue.testMode.jobs[0];

    // Ensure the job is created before testing progress event
    setImmediate(() => {
      job.on('progress', (progress) => {
        expect(spyConsole.calledWith(`Notification job ${job.id} ${progress}% complete`)).to.be.true;
        done();
      });

      job.emit('progress', 25);
    });
  });

  it('registers the failed event handler for a job', (done) => {
    createPushNotificationsJobs(jobInfos, queue);
    const job = queue.testMode.jobs[0];

    // Ensure the job is created before testing failed event
    setImmediate(() => {
      job.on('failed', (error) => {
        expect(spyConsole.calledWith(`Notification job ${job.id} failed: Failed to send`)).to.be.true;
        done();
      });

      job.emit('failed', new Error('Failed to send'));
    });
  });

  it('registers the complete event handler for a job', (done) => {
    createPushNotificationsJobs(jobInfos, queue);
    const job = queue.testMode.jobs[0];

    // Ensure the job is created before testing complete event
    setImmediate(() => {
      job.on('complete', () => {
        expect(spyConsole.calledWith(`Notification job ${job.id} completed`)).to.be.true;
        done();
      });

      job.emit('complete');
    });
  });
});
