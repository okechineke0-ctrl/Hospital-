const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');

// Mock appointment database
const appointments = [];

// Get all appointments
router.get('/', authMiddleware, (req, res) => {
  try {
    res.json({
      message: 'Appointments retrieved successfully',
      count: appointments.length,
      data: appointments
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get appointment by ID
router.get('/:id', authMiddleware, (req, res) => {
  try {
    const appointment = appointments.find(a => a.id === req.params.id);
    if (!appointment) {
      return res.status(404).json({ error: 'Appointment not found' });
    }
    res.json({ data: appointment });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Book new appointment
router.post('/', authMiddleware, roleMiddleware('patient', 'receptionist', 'admin'), (req, res) => {
  try {
    const { patientId, doctorId, appointmentDate, notes } = req.body;

    if (!patientId || !doctorId || !appointmentDate) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const appointment = {
      id: Date.now().toString(),
      patientId,
      doctorId,
      appointmentDate,
      status: 'scheduled',
      notes: notes || '',
      createdAt: new Date()
    };

    appointments.push(appointment);

    res.status(201).json({
      message: 'Appointment booked successfully',
      data: appointment
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update appointment
router.put('/:id', authMiddleware, roleMiddleware('admin', 'doctor', 'receptionist'), (req, res) => {
  try {
    const appointment = appointments.find(a => a.id === req.params.id);
    if (!appointment) {
      return res.status(404).json({ error: 'Appointment not found' });
    }

    Object.assign(appointment, req.body);
    appointment.updatedAt = new Date();

    res.json({
      message: 'Appointment updated successfully',
      data: appointment
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Cancel appointment
router.delete('/:id', authMiddleware, roleMiddleware('admin', 'patient'), (req, res) => {
  try {
    const appointment = appointments.find(a => a.id === req.params.id);
    if (!appointment) {
      return res.status(404).json({ error: 'Appointment not found' });
    }

    appointment.status = 'cancelled';
    appointment.updatedAt = new Date();

    res.json({
      message: 'Appointment cancelled successfully',
      data: appointment
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;