import Mailgen from "mailgen";
import nodemailer from "nodemailer";

const sendEmail = async (options) => {
  const mailGenerator = new Mailgen({
    theme: "default",
    product: {
      name: "Task Manager",
      link: "https://taskmanagerlink.com",
    },
  });
  const emailTextual = mailGenerator.generatePlaintext(options.mailgenContent);
  const emailHtml = mailGenerator.generate(options.mailgenContent);

  const transporter = nodemailer.createTransport({
    host: process.env.MAILTRAP_SMTP_HOST,
    port: process.env.MAILTRAP_SMTP_PORT,
    auth: {
      user: process.env.MAILTRAP_SMTP_USER,
      pass: process.env.MAILTRAP_SMTP_PASS,
    },
  });

  const mail = {
    from: "mail.taskmanager@projmanage.com",
    to: options.email,
    subject: options.email,
    text: emailTextual,
    html: emailHtml,
  };

  try {
    await transporter.sendMail(mail);
  } catch (err) {
    console.log("MailTrap failed");
    console.error(err);
  }
};

const emailVerificationMailgenContent = (username, verificationUrl) => {
  return {
    body: {
      name: username,
      intro: `Welcome ${username}! We are excited to have you on board`,
      action: {
        instructions: "To get started, please click here:",
        button: {
          color: "#22BC66", // Optional action button color
          text: "Verify your Email",
          link: verificationUrl,
        },
      },
      outro:
        "If you did not make this request, you can safely ignore this email. If you need any help, or have questions? Just reply to this email, we'd love to help.",
    },
  };
};

const forgotPasswordMailgenContent = (username, passwordResetUrl) => {
  return {
    body: {
      name: username,
      intro: `We got a request to reset the password for the account - ${username}`,
      action: {
        instructions: "To reset passowrd, please click here:",
        button: {
          color: "#bc2222ff", // Optional action button color
          text: "Reset Password",
          link: verificationUrl,
        },
      },
      outro:
        "If you did not make this request, you can safely ignore this email. If you need any help, or have questions? Just reply to this email, we'd love to help.",
    },
  };
};

export {
  emailVerificationMailgenContent,
  forgotPasswordMailgenContent,
  sendEmail,
};
