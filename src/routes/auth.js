// src/routes/auth.js
import express from "express";
import passport from "passport";

const router = express.Router();

router.get(
  "/facebook",
  passport.authenticate("facebook", { scope: ["email"] })
);

router.get(
  "/facebook/callback",
  passport.authenticate("facebook", {
    failureRedirect: "http://localhost:5173/",
    successRedirect: "http://localhost:5173/success",
  })
);

router.get("/success", (req, res) => {
  if (req.user) {
    res.json(req.user);
  } else {
    res.status(401).json({ message: "Not authenticated" });
  }
});

router.get("/logout", (req, res) => {
  req.logout((err) => {
    if (err) {
      return res.status(500).json({ message: "Logout failed" });
    }
    req.session.destroy(() => {
      res.clearCookie("connect.sid", { path: "/" }); // clear the cookie after session is destroyed
      res.status(200).json({ message: "Logout successful" });
    });
  });
});

export default router;
