import express from "express";
import axios from "axios";

const router = express.Router();

router.get("/fetch-pages", (req, res) => {
  if (!req.isAuthenticated()) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const accessToken = req.user.accessToken; // Ensure this is stored when the user logs in

  axios
    .get(
      `https://graph.facebook.com/v11.0/me/accounts?access_token=${accessToken}`
    )
    .then((response) => {
      res.json(response.data);
    })
    .catch((error) => {
      console.error("Error fetching pages:", error);
      res.status(500).json({ message: "Error fetching pages" });
    });
});

router.get("/", (req, res) => {
  if (
    req.query["hub.mode"] === "subscribe" &&
    req.query["hub.verify_token"] === process.env.VERIFY_TOKEN
  ) {
    res.status(200).send(req.query["hub.challenge"]);
  } else {
    res.sendStatus(403);
  }
});

router.post("/", (req, res) => {
  const data = req.body;
  if (data.object === "page") {
    data.entry.forEach((entry) => {
      const pageID = entry.id;
      const timeOfEvent = entry.time;
      entry.changes.forEach((change) => {
        console.log(change);
        // Handle the event change
      });
    });
    res.sendStatus(200);
  }
});

export default router;