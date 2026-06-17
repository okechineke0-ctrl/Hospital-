const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health Check Route
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'Hospital API is running', 
    timestamp: new Date(),
    environment: process.env.NODE_ENV 
  });
});

// API Routes (will be implemented)
app.use('/api/auth', require('./routes/auth.routes'));
app.use('/api/patients', require('./routes/patient.routes'));
app.use('/api/doctors', require('./routes/doctor.routes'));
app.use('/api/appointments', require('./routes/appointment.routes'));
app.use('/api/admin', require('./routes/admin.routes'));
app.use('/api/analytics', require('./routes/analytics.routes'));

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({ 
    error: err.message || 'Something went wrong!' 
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`✅ Hospital API Server running on port ${PORT}`);
  console.log(`📍 Environment: ${process.env.NODE_ENV}`);
});

module.exports = app;