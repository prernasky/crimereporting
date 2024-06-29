// routes/reports.js
const express = require('express');
const CrimeReport = require('.../models/CrimeReport');
const auth = require('../middleware/auth');
const router = express.Router();

router.post('/report', auth, async (req, res) => {
  const { type, location, time, description, media, anonymous } = req.body;
  const newReport = new CrimeReport({
    type,
    location,
    time,
    description,
    media,
    reporter: req.user.id,
    anonymous
  });
  await newReport.save();
  res.status(201).send('Report submitted');
});

module.exports = router;
