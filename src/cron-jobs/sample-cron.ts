import cron from 'node-cron';

const CRON_INTERVALS = {
  TEN_MIN: '*/10 * * * *', // Every 10 minutes
  ONE_HOUR: '0 * * * *', // At minute 0 past every hour
  SIX_HOUR: '0 */6 * * *', // Every 6th hour
  TWELVE_HOUR: '0 */12 * * *', // Every 12th hour
  ONE_DAY: '0 0 * * *', // At 00:00 (midnight) every day
  ONE_WEEK: '0 0 * * 0', // At 00:00 every Sunday (weekly)
  ONE_MONTH: '0 0 1 * *', // At 00:00 on the 1st day of every month
} as const;

cron.schedule(CRON_INTERVALS.TEN_MIN, () => {
  console.log('Cron job running every 10 minutes');
  // You can replace this with your task, such as sending an email, cleaning up data, etc.
});
