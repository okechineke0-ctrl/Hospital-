const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');

// Mock data for analytics
let analyticsData = {
  totalPatients: 156,
  totalDoctors: 24,
  totalAppointments: 342,
  completedAppointments: 298,
  totalRevenue: 45000,
  monthlyData: [
    { month: 'Jan', patients: 12, appointments: 28, revenue: 3500 },
    { month: 'Feb', patients: 19, appointments: 35, revenue: 4200 },
    { month: 'Mar', patients: 15, appointments: 32, revenue: 3800 },
    { month: 'Apr', patients: 22, appointments: 42, revenue: 5100 },
    { month: 'May', patients: 25, appointments: 48, revenue: 5800 },
    { month: 'Jun', patients: 28, appointments: 52, revenue: 6300 },
  ],
  departmentData: [
    { name: 'Cardiology', doctors: 5, patients: 45 },
    { name: 'Neurology', doctors: 4, patients: 32 },
    { name: 'Pediatrics', doctors: 6, patients: 38 },
    { name: 'Orthopedics', doctors: 5, patients: 28 },
    { name: 'General', doctors: 4, patients: 13 },
  ],
  appointmentStatus: [
    { status: 'Completed', count: 298 },
    { status: 'Scheduled', count: 35 },
    { status: 'Cancelled', count: 9 }
  ]
};

// Get dashboard analytics (Admin only)
router.get('/dashboard', authMiddleware, roleMiddleware('admin'), (req, res) => {
  try {
    res.json({
      message: 'Dashboard analytics retrieved',
      data: analyticsData
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get patient growth data
router.get('/patient-growth', authMiddleware, roleMiddleware('admin', 'doctor'), (req, res) => {
  try {
    res.json({
      message: 'Patient growth data retrieved',
      data: analyticsData.monthlyData
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get revenue analytics
router.get('/revenue', authMiddleware, roleMiddleware('admin'), (req, res) => {
  try {
    res.json({
      message: 'Revenue analytics retrieved',
      totalRevenue: analyticsData.totalRevenue,
      monthlyRevenue: analyticsData.monthlyData.map(m => ({ month: m.month, revenue: m.revenue }))
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get department statistics
router.get('/departments', authMiddleware, roleMiddleware('admin', 'doctor'), (req, res) => {
  try {
    res.json({
      message: 'Department statistics retrieved',
      data: analyticsData.departmentData
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get appointment status distribution
router.get('/appointment-status', authMiddleware, roleMiddleware('admin', 'doctor', 'receptionist'), (req, res) => {
  try {
    res.json({
      message: 'Appointment status distribution retrieved',
      data: analyticsData.appointmentStatus
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get key metrics
router.get('/metrics', authMiddleware, roleMiddleware('admin'), (req, res) => {
  try {
    res.json({
      message: 'Key metrics retrieved',
      metrics: {
        totalPatients: analyticsData.totalPatients,
        totalDoctors: analyticsData.totalDoctors,
        totalAppointments: analyticsData.totalAppointments,
        completedAppointments: analyticsData.completedAppointments,
        totalRevenue: analyticsData.totalRevenue,
        appointmentCompletionRate: ((analyticsData.completedAppointments / analyticsData.totalAppointments) * 100).toFixed(2) + '%'
      }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;