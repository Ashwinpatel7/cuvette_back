// controllers/applicationController.js
const Application = require('../models/Application');

// @desc    Get all applications with optional filters (status, date)
// @route   GET /api/applications
const getApplications = async (req, res, next) => {
  try {
    const { status, date } = req.query;
    let query = {};

    // Filter by status if provided
    if (status) query.status = status;

    // Filter by date; expects date in YYYY-MM-DD format
    if (date) {
      const filterDate = new Date(date);
      query.dateOfApplication = {
        $gte: filterDate,
        $lt: new Date(filterDate.getTime() + 24 * 60 * 60 * 1000),
      };
    }

    // Fetch applications sorted by creation date (latest first)
    const applications = await Application.find(query).sort({ createdAt: -1 });
    res.json(applications);
  } catch (error) {
    next(error);
  }
};

// @desc    Create a new job application
// @route   POST /api/applications
const createApplication = async (req, res, next) => {
  try {
    const application = new Application(req.body);
    const savedApp = await application.save();
    res.status(201).json(savedApp);
  } catch (error) {
    next(error);
  }
};

// @desc    Update an application (e.g., change status)
// @route   PUT /api/applications/:id
const updateApplication = async (req, res, next) => {
  try {
    const updatedApp = await Application.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedApp)
      return res.status(404).json({ message: 'Application not found' });
    res.json(updatedApp);
  } catch (error) {
    next(error);
  }
};

// @desc    Delete an application
// @route   DELETE /api/applications/:id
const deleteApplication = async (req, res, next) => {
  try {
    const deletedApp = await Application.findByIdAndDelete(req.params.id);
    if (!deletedApp)
      return res.status(404).json({ message: 'Application not found' });
    res.json({ message: 'Application removed' });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getApplications,
  createApplication,
  updateApplication,
  deleteApplication,
};
