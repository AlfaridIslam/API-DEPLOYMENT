import dotenv from "dotenv";
dotenv.config();

export const PORT = process.env.PORT || 5000;
export const MONGO_URI = process.env.MONGO_URI;
export const SESSION_SECRET = process.env.SESSION_SECRET;
export const FACEBOOK_APP_ID = process.env.FACEBOOK_CLIENT_ID;
export const FACEBOOK_APP_SECRET = process.env.FACEBOOK_SECRET_KEY;
export const CLIENT_URL = process.env.CLIENT_URL || "http://localhost:5173";
