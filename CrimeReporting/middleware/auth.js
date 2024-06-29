// middleware/auth.js
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('.../models/User');
const bcrypt = require('bcryptjs');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

passport.use(new LocalStrategy(
  async (username, password, done) => {
    try {
      const user = await User.findOne({ username });
      if (!user) return done(null, false, { message: 'Incorrect username.' });

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) return done(null, false, { message: 'Incorrect password.' });

      return done(null, user);
    } catch (err) {
      return done(err);
    }
  }
));

passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: '/auth/google/callback'
}, async (token, tokenSecret, profile, done) => {
  try {
    let user = await User.findOne({ googleId: profile.id });
    if (!user) {
      user = new User({ googleId: profile.id, username: profile.displayName });
      await user.save();
    }
    return done(null, user);
  } catch (err) {
    return done(err);
  }
}));

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => done(err, user));
});

module.exports = passport;
