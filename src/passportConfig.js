// src/passportConfig.js
import passport from "passport";
import { Strategy as FacebookStrategy } from "passport-facebook";
import { FACEBOOK_APP_ID, FACEBOOK_APP_SECRET } from "./config.js";
import User from "./models/User.js"; // Assuming you have a User model

passport.use(
  new FacebookStrategy(
    {
      clientID: FACEBOOK_APP_ID,
      clientSecret: FACEBOOK_APP_SECRET,
      callbackURL: "http://localhost:8000/auth/facebook/callback",
      profileFields: [
        "id",
        "displayName",
        "email",
        "name",
        "picture.type(large)",
      ],
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        let user = await User.findOne({ facebookId: profile.id });
        if (!user) {
          user = new User({
            facebookId: profile.id,
            fullName: profile.displayName,
            email: profile.emails[0].value,
            avatar: profile.photos[0].value,
            accessToken,
            refreshToken,
          });
          await user.save();
        }
        return done(null, user);
      } catch (error) {
        return done(error, false);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (err) {
    done(err, null);
  }
});
