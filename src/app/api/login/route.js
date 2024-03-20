import { connectDB } from "@/dbConfig";
import bcryptjs from 'bcryptjs'
import jwt from 'jsonwebtoken'

export async function POST(request) {
    try {
        const connection = await connectDB();

        const reqBody = await request.json();
        const { email, password } = reqBody;
        console.log(reqBody);

        // Query user from the database
        const [userRows] = await connection.query('SELECT * FROM users WHERE email = ?', [email]);
        
        // Check if user exists
        if (userRows.length === 0) {
            return { error: "User does not exist" };
        }

        const user = userRows[0];

        // Check if password is correct
        const validPassword = await bcryptjs.compare(password, user.password);
        if (!validPassword) {
            return { error: "Invalid password" };
        }

        // Create token data
        const tokenData = {
            id: user.id,
            email: user.email
        };

        // Create token
        const token = jwt.sign(tokenData, process.env.TOKEN_SECRET, { expiresIn: "1d" });

        // Return response with token
        return {
            message: "Login successful",
            success: true,
            token: token
        };
    } catch (error) {
        return { error: error.message };
    }
}

