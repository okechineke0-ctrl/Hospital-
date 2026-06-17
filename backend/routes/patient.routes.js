const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');

// Mock patient database
const patients = [];

// Get all patients (Admin only)
router.get('/', authMiddleware, roleMiddleware('admin', 'doctor', 'nurse'), (req, res) => {
  try {
    res.json({
      message: 'Patients retrieved successfully',
      count: patients.length,
      data: patients
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get patient by ID
router.get('/:id', authMiddleware, (req, res) => {
  try {
    const patient = patients.find(p => p.id === req.params.id);
    if (!patient) {
      return res.status(404).json({ error: 'Patient not found' });
    }
    res.json({ data: patient });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create new patient
router.post('/', authMiddleware, roleMiddleware('admin', 'receptionist'), (req, res) => {
  try {
    const { userId, dateOfBirth, gender, bloodType, address, emergencyContact } = req.body;

    const patient = {
      id: Date.now().toString(),
      userId,
      dateOfBirth,
      gender,
      bloodType,
      address,
      emergencyContact,
      medicalHistory: [],
      appointments: [],
      createdAt: new Date()
    };

    patients.push(patient);

    res.status(201).json({
      message: 'Patient created successfully',
      data: patient
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update patient
router.put('/:id', authMiddleware, roleMiddleware('admin', 'receptionist'), (req, res) => {
  try {
    const patient = patients.find(p => p.id === req.params.id);
    if (!patient) {
      return res.status(404).json({ error: 'Patient not found' });
    }

    Object.assign(patient, req.body);
    patient.updatedAt = new Date();

    res.json({
      message: 'Patient updated successfully',
      data: patient
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete patient
router.delete('/:id', authMiddleware, roleMiddleware('admin'), (req, res) => {
  try {
    const index = patients.findIndex(p => p.id === req.params.id);
    if (index === -1) {
      return res.status(404).json({ error: 'Patient not found' });
    }

    const deletedPatient = patients.splice(index, 1);
    res.json({
      message: 'Patient deleted successfully',
      data: deletedPatient[0]
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;