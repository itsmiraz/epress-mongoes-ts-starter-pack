import nodemailer from 'nodemailer';
import config from '../config';

export const sendEmail = async (to: string, subject: string, body: string) => {
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: config.NODE_ENV === 'production',
    auth: {
      // TODO: replace `user` and `pass` values from <https://forwardemail.net>
      user: 'hamu37999@gmail.com',
      pass: 'nnwr qzpj rnhk edyg',
    },
  });

  await transporter.sendMail({
    from: 'hamu37999@gmail.com', // sender address
    to, // list of receivers
    subject, // Subject line

    html: body, // html body
  });
};
