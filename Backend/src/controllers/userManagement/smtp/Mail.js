import nodemailer from 'nodemailer'

const sendMail = (to, subject, htmlContent) => {
    const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        auth: {
            user: 'harvestlanka904@gmail.com',
            pass: process.env.SMTP_PASS
        }
    });

    const mailOptions = {
        from: '"Harvest Lanka" <harvestlanka904@gmail.com>',
        to: to,
        subject: subject,
        html: htmlContent
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
            return false
        } else {
            return true
        }
    });
}

export default sendMail