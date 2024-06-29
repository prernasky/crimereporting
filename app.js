// app.js
const express = require('express');
const mongoose = require('mongoose');
const passport = require('./middleware/auth');
const authRoutes = require('./routes/auth');
const reportRoutes = require('./routes/reports');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
app.use(express.json());

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error(err));

app.use(passport.initialize());

app.use('/auth', authRoutes);
app.use('/reports', reportRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
