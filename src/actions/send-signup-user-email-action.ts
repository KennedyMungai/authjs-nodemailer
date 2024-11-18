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
    from: `Team Rocket`,
    to: email,
    subject: "Verify your email address",
    html: `
        <div style="font-family: Arial, sans-serif; color: #333; line-height: 1.6; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #eaeaea; border-radius: 10px;">
            <h2 style="text-align: center; color: #3b82f6;">Team Rocket</h2>
            <p>Hi there!</p>
            <p>
                <a href="${process.env.NEXT_PUBLIC_APP_URL}/auth/signup/verify-email?token=${verificationToken}">Click here to verify your email address</a>
            </p>
        </div>
    `,
  });

  console.log(`Sent email to ${email}`);
};
