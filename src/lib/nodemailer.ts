import "server-only";

import nodemailer from "nodemailer";

const transport = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    type: "OAuth2",
    user: process.env.NODE_MAILER_GOOGLE_SMTP_USER,
    clientId: process.env.AUTH_GOOGLE_ID,
    clientSecret: process.env.AUTH_GOOGLE_SECRET,
    accessToken: process.env.NODE_MAILER_GOOGLE_ACCESS_TOKEN,
    refreshToken: process.env.NODE_MAILER_GOOGLE_REFRESH_TOKEN,
  },
});

export default transport;
