const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');

// Mock users database
let users = [];

// Get all users (Admin only)
router.get('/users', authMiddleware, roleMiddleware('admin'), (req, res) => {
  try {
    res.json({
      message: 'Users retrieved successfully',
      count: users.length,
      data: users
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
    res.json({ data: user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create new user (Admin only)
router.post('/users', authMiddleware, roleMiddleware('admin'), (req, res) => {
  try {
    const { email, firstName, lastName, role } = req.body;

    if (!email || !firstName || !lastName || !role) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const user = {
      id: Date.now().toString(),
      email,
      firstName,
      lastName,
      role,
      isActive: true,
      createdAt: new Date()
    };

    users.push(user);

    res.status(201).json({
      message: 'User created successfully',
      data: user
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update user (Admin only)
router.put('/users/:id', authMiddleware, roleMiddleware('admin'), (req, res) => {
  try {
    const user = users.find(u => u.id === req.params.id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    Object.assign(user, req.body);
    user.updatedAt = new Date();

    res.json({
      message: 'User updated successfully',
      data: user
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Deactivate user (Admin only)
router.delete('/users/:id', authMiddleware, roleMiddleware('admin'), (req, res) => {
  try {
    const user = users.find(u => u.id === req.params.id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    user.isActive = false;
    user.updatedAt = new Date();

    res.json({
      message: 'User deactivated successfully',
      data: user
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get system statistics (Admin only)
router.get('/statistics', authMiddleware, roleMiddleware('admin'), (req, res) => {
  try {
    const roleDistribution = {
      admin: users.filter(u => u.role === 'admin').length,
      doctor: users.filter(u => u.role === 'doctor').length,
      nurse: users.filter(u => u.role === 'nurse').length,
      patient: users.filter(u => u.role === 'patient').length,
      receptionist: users.filter(u => u.role === 'receptionist').length,
    };

    res.json({
      message: 'System statistics retrieved',
      totalUsers: users.length,
      activeUsers: users.filter(u => u.isActive).length,
      roleDistribution
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;