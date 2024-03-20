import { connectDB } from "@/dbConfig";
import bcryptjs from 'bcryptjs';
import sendEmail from '@/helpers/mailer';

export async function POST(request) {
    try {
        const connection = await connectDB();

        // Extract data from request body
        const { username, email, password } = await request.body.json();

        // Check if user already exists
        const [existingUser] = await connection.query('SELECT * FROM users WHERE email = ?', [email]);

        if (existingUser.length > 0) {
            return { error: "User already exists" };
        }

        // Hash the password
        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password, salt);

        // Insert new user into the database
        const [result] = await connection.query('INSERT INTO users (username, email, password) VALUES (?, ?, ?)', [username, email, hashedPassword]);

        if (result.affectedRows !== 1) {
            throw new Error("Failed to create user");
        }

        // Send verification email
        await sendEmail({ email, emailType: "VERIFY", userId: result.insertId });

        return  {
            message: "User created successfully",
            success: true
        };
    } catch (error) {
        return { error: error.message };
    }
}
