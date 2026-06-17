const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');

// Mock doctor database
const doctors = [];

// Get all doctors
router.get('/', authMiddleware, (req, res) => {
  try {
    res.json({
      message: 'Doctors retrieved successfully',
      count: doctors.length,
      data: doctors
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get doctor by ID
router.get('/:id', authMiddleware, (req, res) => {
  try {
    const doctor = doctors.find(d => d.id === req.params.id);
    if (!doctor) {
      return res.status(404).json({ error: 'Doctor not found' });
    }
    res.json({ data: doctor });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create new doctor (Admin only)
router.post('/', authMiddleware, roleMiddleware('admin'), (req, res) => {
  try {
    const { userId, licenseNumber, specialization, department, experience, consultationFee } = req.body;

    const doctor = {
      id: Date.now().toString(),
      userId,
      licenseNumber,
      specialization,
      department,
      experience,
      consultationFee,
      isAvailable: true,
      appointments: [],
      createdAt: new Date()
    };

    doctors.push(doctor);

    res.status(201).json({
      message: 'Doctor created successfully',
      data: doctor
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update doctor
router.put('/:id', authMiddleware, roleMiddleware('admin', 'doctor'), (req, res) => {
  try {
    const doctor = doctors.find(d => d.id === req.params.id);
    if (!doctor) {
      return res.status(404).json({ error: 'Doctor not found' });
    }

    Object.assign(doctor, req.body);
    doctor.updatedAt = new Date();

    res.json({
      message: 'Doctor updated successfully',
      data: doctor
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete doctor
router.delete('/:id', authMiddleware, roleMiddleware('admin'), (req, res) => {
  try {
    const index = doctors.findIndex(d => d.id === req.params.id);
    if (index === -1) {
      return res.status(404).json({ error: 'Doctor not found' });
    }

    const deletedDoctor = doctors.splice(index, 1);
    res.json({
      message: 'Doctor deleted successfully',
      data: deletedDoctor[0]
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;