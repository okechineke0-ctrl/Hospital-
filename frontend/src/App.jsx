import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import PatientDashboard from './pages/PatientDashboard'
import DoctorDashboard from './pages/DoctorDashboard'
import AdminDashboard from './pages/AdminDashboard'
import Appointments from './pages/Appointments'
import Patients from './pages/Patients'
import Doctors from './pages/Doctors'
import Navigation from './components/Navigation'

function App() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem('token')
    const userData = localStorage.getItem('user')
    if (token && userData) {
      setUser(JSON.parse(userData))
    }
    setLoading(false)
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-50 to-secondary-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  return (
    <Router>
      {user && <Navigation user={user} setUser={setUser} />}
      <Routes>
        <Route path="/login" element={!user ? <Login setUser={setUser} /> : <Navigate to="/" />} />
        <Route path="/register" element={!user ? <Register /> : <Navigate to="/" />} />
        
        {user ? (
          <>
            <Route path="/" element={<Dashboard user={user} />} />
            <Route path="/patient-dashboard" element={user.role === 'patient' ? <PatientDashboard /> : <Navigate to="/" />} />
            <Route path="/doctor-dashboard" element={user.role === 'doctor' ? <DoctorDashboard /> : <Navigate to="/" />} />
            <Route path="/admin-dashboard" element={user.role === 'admin' ? <AdminDashboard /> : <Navigate to="/" />} />
            <Route path="/appointments" element={<Appointments user={user} />} />
            <Route path="/patients" element={user.role === 'admin' ? <Patients /> : <Navigate to="/" />} />
            <Route path="/doctors" element={user.role === 'admin' ? <Doctors /> : <Navigate to="/" />} />
          </>
        ) : (
          <Route path="*" element={<Navigate to="/login" />} />
        )}
      </Routes>
    </Router>
  )
}

export default App