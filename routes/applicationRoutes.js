// routes/applicationRoutes.js
const express = require('express');
const router = express.Router();
const {
  getApplications,
  createApplication,
  updateApplication,
  deleteApplication,
} = require('../controllers/applicationController');

// Define route for fetching and adding applications
router.route('/').get(getApplications).post(createApplication);

// Define route for updating and deleting a specific application
router.route('/:id').put(updateApplication).delete(deleteApplication);

module.exports = router;
