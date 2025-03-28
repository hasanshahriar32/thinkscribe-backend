import cron from 'node-cron';

const CRON_INTERVALS = {
  ONE_MIN: '* * * * *',
} as const;

cron.schedule(CRON_INTERVALS.ONE_MIN, () => {
  console.log('Cron job running every minute');
  // You can replace this with your task, such as sending an email, cleaning up data, etc.
});
