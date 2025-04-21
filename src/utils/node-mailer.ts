import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.FROM_EMAIL,
    pass: process.env.PASSWORD,
  },
});

async function sendEmail(mailOptions: any) {
  return transporter.sendMail(mailOptions);
}

export default sendEmail;
