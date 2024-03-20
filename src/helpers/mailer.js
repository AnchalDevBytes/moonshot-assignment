import nodemailer from 'nodemailer'
import bcryptjs from 'bcryptjs'
import { connectDB } from '@/dbConfig';

const sendEmail = async ({ email, emailType, userId }) => {
    try {
        // Create a hashed token
        const hashedToken = await bcryptjs.hash(userId.toString(), 10);

        // Establish connection to MySQL database
        const connection = await connectDB();

        // Update user document based on email type
        let updateFields;
        if (emailType === "VERIFY") {
            updateFields = { verifyToken: hashedToken, verifyTokenExpiry: Date.now() + 3600000 };
        } else if (emailType === "RESET") {
            updateFields = { forgotPasswordToken: hashedToken, forgotPasswordTokenExpiry: Date.now() + 3600000 };
        }

        const [result] = await connection.query('UPDATE users SET ? WHERE id = ?', [updateFields, userId]);

        if (result.affectedRows !== 1) {
            throw new Error("Failed to update user");
        }

        // Create nodemailer transporter
        const transporter = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
                user: "your_mailtrap_user",
                pass: "your_mailtrap_password"
            }
            // TODO: Add these credentials to .env file
        });

        // Compose email options
        const mailOptions = {
            from: 'hitesh@gmail.com',
            to: email,
            subject: emailType === "VERIFY" ? "Verify your email" : "Reset your password",
            html: `<p>Click <a href="${process.env.DOMAIN}/verifyemail?token=${hashedToken}">here</a> to ${emailType === "VERIFY" ? "verify your email" : "reset your password"}
            or copy and paste the link below in your browser. <br> ${process.env.DOMAIN}/verifyemail?token=${hashedToken}
            </p>`
        };

        // Send email
        const mailResponse = await transporter.sendMail(mailOptions);
        return mailResponse;

    } catch (error) {
        throw new Error(error.message);
    }
};

module.exports = sendEmail;
