"use server";

import transport from "@/lib/nodemailer";

type Props = {
  email: string;
  verificationToken: string;
};

export const sendSignupUserEmailAction = async ({
  email,
  verificationToken,
}: Props) => {
  console.log(`Sending email to ${email} with token ${verificationToken}`);

  await transport.sendMail({
    from: `Team Rocket ${process.env.NODE_MAILER_GOOGLE_SMTP_USER}`,
    to: email,
    subject: "Verify your email address",
    html: `
        <div>
            <p>
                <a href="http://${process.env.NEXT_PUBLIC_APP_URL}/auth/signup/verify-email?token=${verificationToken}">Click here to verify your email address</a>
            </p>
        </div>
    `,
  });

  console.log(`Sent email to ${email}`);
};
