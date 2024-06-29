// models/CrimeReport.js
const mongoose = require('mongoose');

const CrimeReportSchema = new mongoose.Schema({
  type: { type: String, required: true },
  location: {
    type: { type: String },
    coordinates: [Number],
  },
  time: { type: Date, required: true },
  description: String,
  media: [String],
  reporter: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  anonymous: { type: Boolean, default: false }
});

CrimeReportSchema.index({ location: '2dsphere' });
module.exports = mongoose.model('CrimeReport', CrimeReportSchema);
