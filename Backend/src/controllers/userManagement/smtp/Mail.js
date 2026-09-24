import nodemailer from 'nodemailer';

const sendMail = async (to, subject, htmlContent) => {
    const smtpUser = process.env.SMTP_USER;
    const smtpPass = process.env.SMTP_PASS;

    if (!smtpUser || !smtpPass) {
        console.warn("[SECURITY WARN] SMTP credentials are not configured in environment variables. Email sending suppressed.");
        return false;
    }

    try {
        const transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 465,
            secure: true,
            auth: {
                user: smtpUser,
                pass: smtpPass
            }
        });

        const mailOptions = {
            from: `"Harvest Lanka" <${smtpUser}>`,
            to: to,
            subject: subject,
            html: htmlContent
        };

        await transporter.sendMail(mailOptions);
        return true;
    } catch (error) {
        console.error("[ERROR] Failed to send email via SMTP:", error.message);
        return false;
    }
};

export default sendMail;