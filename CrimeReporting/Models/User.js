// models/User.js
const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['citizen', 'police', 'admin'], default: 'citizen' }
});

module.exports = mongoose.model('User', UserSchema);
