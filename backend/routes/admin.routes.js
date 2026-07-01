const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');

// Mock admin database
let users = [];

// Get all users
router.get('/users', authMiddleware, roleMiddleware('admin'), (req, res) => {
  try {
    res.json({
      message: 'Users retrieved successfully',
      count: users.length,
      data: users.map(u => ({ ...u, password: undefined }))
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get user by ID
router.get('/users/:id', authMiddleware, roleMiddleware('admin'), (req, res) => {
  try {
    const user = users.find(u => u.id === req.params.id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json({ data: { ...user, password: undefined } });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get system statistics
router.get('/statistics', authMiddleware, roleMiddleware('admin'), (req, res) => {
  try {
    res.json({
      message: 'System statistics retrieved',
      statistics: {
        totalUsers: users.length,
        activeUsers: users.filter(u => u.isActive !== false).length,
        adminCount: users.filter(u => u.role === 'admin').length,
        doctorCount: users.filter(u => u.role === 'doctor').length,
        patientCount: users.filter(u => u.role === 'patient').length,
        receptionistCount: users.filter(u => u.role === 'receptionist').length
      }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;