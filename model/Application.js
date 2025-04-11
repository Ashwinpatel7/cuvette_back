// models/Application.js
const mongoose = require('mongoose');

const applicationSchema = new mongoose.Schema(
  {
    company: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ['Applied', 'Interview', 'Offer', 'Rejected'],
      required: true,
      default: 'Applied',
    },
    dateOfApplication: {
      type: Date,
      required: true,
    },
    link: {
      type: String,
      default: '',
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Application', applicationSchema);
