import mysql from 'mysql'

export async function connectDB() {
    try {
        const connection = await mysql.createConnection({
            host : process.env.NEXT_PUBLIC_DBHOST,
            port : process.env.NEXT_PUBLIC_PORT,
            user : process.env.NEXT_PUBLIC_USER,
            password : process.env.NEXT_PUBLIC_PASSWORD,
            database : process.env.NEXT_PUBLIC_DBNAME
        });

        await connection.connect((err) => {
            if (err) {
              console.error('error connecting mysql database: ' + err.stack);
              return;
            }
          
            console.log('mysql connected as id ' + connection.threadId);
          });
    } catch (error) {
        
    }
}