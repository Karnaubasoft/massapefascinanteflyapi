import dotenv from 'dotenv';
dotenv.config();

export const env = {
    JWT_SECRET: process.env.JWT_SECRET as string,
    PORT: process.env.PORT,
    PORTFRONT: process.env.PORTFRONT,
    NODE_ENV: process.env.NODE_ENV,
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID as string,
    GMAIL_USER: process.env.GMAIL_USER as string,
    PASSWORD_GMAIL: process.env.PASSWORD_GMAIL as string,
    REDIS_URL: process.env.REDIS_URL as string
}