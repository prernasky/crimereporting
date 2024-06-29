// routes/auth.js
const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const passport = require('../middleware/auth');
const User = require('.../models/User');
const router = express.Router();

router.post('/register', async (req, res) => {
  const { username, password, role } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = new User({ username, password: hashedPassword, role });
  await newUser.save();
  res.status(201).send('User registered');
});

router.post('/login', async (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) return next(err);
    if (!user) return res.status(400).send(info.message);
    
    req.login(user, { session: false }, (err) => {
      if (err) return next(err);
      
      const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET);
      return res.json({ token });
    });
  })(req, res, next);
});

router.get('/auth/google',
  passport.authenticate('google', { scope: ['https://www.googleapis.com/auth/plus.login'] })
);

router.get('/auth/google/callback', 
  passport.authenticate('google', { failureRedirect: '/' }),
  (req, res) => {
    const token = jwt.sign({ id: req.user._id, role: req.user.role }, process.env.JWT_SECRET);
    res.redirect(`/auth/success?token=${token}`);
  }
);

module.exports = router;
