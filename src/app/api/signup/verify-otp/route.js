import { getConnection } from '@/dbConfig/dbConfig';

export async function POST(request) {
    try {
        const connection = await getConnection();

        const reqBody = await request.json();
        const { token } = reqBody;
        console.log(token);

        // Find user with the provided verification token
        const [userRows] = await connection.query('SELECT * FROM users WHERE verifyToken = ? AND verifyTokenExpiry > ?', [token, Date.now()]);

        if (userRows.length === 0) {
            return { error: "Invalid token" }, { status: 400 };
        }

        // Update user to mark as verified
        const [updateResult] = await connection.query('UPDATE users SET isVerified = ?, verifyToken = ?, verifyTokenExpiry = ? WHERE id = ?', [true, null, null, userRows[0].id]);

        if (updateResult.affectedRows !== 1) {
            throw new Error("Failed to update user verification status");
        }

        return {
            message: "Email verified successfully",
            success: true
        };
    } catch (error) {
        return { error: error.message };
    }
}

