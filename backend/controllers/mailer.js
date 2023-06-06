import nodemailer from 'nodemailer';
import Mailgen from 'mailgen';

import ENV from '../config.js'

//https://ethereal.email/create
const nodeConfig = {
  host: "smtp.ethereal.email",
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: ENV.EMAIL, // generated ethereal user
    pass: ENV.PASSWORD, // generated ethereal password
  },
};

const transporter = nodemailer.createTransport(nodeConfig);

const MailGenerator  = new Mailgen({
    theme: "default",
    product: {
        name: "Mailgen",
        link: 'https://mailgen.js/'
    }
})


/** POST: http://localhost:8080/api/registerMail 
 * @param: {
  "username" : "example123",
  "userEmail" : "admin123@gmail.com",
  "text" : "",
  "subject" : "",
}
*/

export const registerMail = async (req, res) => {
  const { username, userEmail, text, subject } = req.body;

  // Body of the email
  const email = {
    body: {
      name: username,
      intro:
        text ||
        "Welcome to Daily Tuition! We're very excited to have you on board.",
      outro:
        "Need help, or have questions? Just reply to this email, we'd love to help.",
    },
  };

  const emailBody = MailGenerator.generate(email);

  const message = {
    from: ENV.EMAIL, // Make sure you have ENV.EMAIL defined
    to: userEmail,
    subject: subject || "Signup Successful",
    html: emailBody,
  };

  // Send mail
  try {
    await transporter.sendMail(message);
    return res
      .status(200)
      .send({ msg: "You should receive an email from us." });
  } catch (error) {
    return res.status(500).send({ error });
  }
};




