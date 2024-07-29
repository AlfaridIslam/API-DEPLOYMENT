// src/app.js
import express from "express";
import session from "express-session";
import passport from "passport";
import { PORT, SESSION_SECRET } from "./config.js";
import connectDB from "./database.js";
import "./passportConfig.js";
import authRoutes from "./routes/auth.js";
import cors from "cors"


const app = express();

// Connect to MongoDB
connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
  })
);

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: "GET,POST,PUT,DELETE",
    credentials: true,
  })
);

app.use(passport.initialize());
app.use(passport.session());

// Define routes
app.use("/auth", authRoutes);
app.use("/webhook", webhookRoutes);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
