import cron from 'node-cron';

cron.schedule('* * * * *', () => {
  console.log('Cron job running every minute');
  // You can replace this with your task, such as sending an email, cleaning up data, etc.
});
