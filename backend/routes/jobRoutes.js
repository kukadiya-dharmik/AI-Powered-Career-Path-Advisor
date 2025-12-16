const express = require('express');
const router = express.Router();
const { getJobs, createJob, updateJob, deleteJob } = require('../controllers/jobController');

// Get all jobs
router.get('/', getJobs);

// Create a job
router.post('/', createJob);

// Update a job
router.put('/:id', updateJob);

// Delete a job
router.delete('/:id', deleteJob);

module.exports = router; 