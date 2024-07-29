import express from "express";
import mongoose from "mongoose";
import session from "express-session";
import passport from "passport";
import { PORT, MONGO_URI, SESSION_SECRET, CLIENT_URL } from "./config.js";
import "./passportConfig.js"; // Ensure this file is correctly set up
import MongoStore from "connect-mongo";
import authRoutes from "./routes/auth.js";
import webhookRoutes from "./routes/webhook.js"; // Import the new webhook route

const app = express();

mongoose
  .connect(MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({ mongoUrl: MONGO_URI }),
    cookie: {
      secure: process.env.NODE_ENV === "production",
    },
  })
);

app.use(passport.initialize());
app.use(passport.session());

// Define routes
app.use("/auth", authRoutes);
app.use("/webhook", webhookRoutes); // Use the new webhook route

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
