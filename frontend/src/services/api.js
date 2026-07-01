import axios from 'axios'

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
})

// Add token to requests
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

export const authAPI = {
  login: (data) => apiClient.post('/auth/login', data),
  register: (data) => apiClient.post('/auth/register', data),
  verify: () => apiClient.get('/auth/verify')
}

export const patientAPI = {
  getAll: () => apiClient.get('/patients'),
  getById: (id) => apiClient.get(`/patients/${id}`),
  create: (data) => apiClient.post('/patients', data),
  update: (id, data) => apiClient.put(`/patients/${id}`, data),
  delete: (id) => apiClient.delete(`/patients/${id}`)
}

export const doctorAPI = {
  getAll: () => apiClient.get('/doctors'),
  getById: (id) => apiClient.get(`/doctors/${id}`),
  create: (data) => apiClient.post('/doctors', data),
  update: (id, data) => apiClient.put(`/doctors/${id}`, data),
  delete: (id) => apiClient.delete(`/doctors/${id}`)
}

export const appointmentAPI = {
  getAll: () => apiClient.get('/appointments'),
  getById: (id) => apiClient.get(`/appointments/${id}`),
  create: (data) => apiClient.post('/appointments', data),
  update: (id, data) => apiClient.put(`/appointments/${id}`, data),
  cancel: (id) => apiClient.delete(`/appointments/${id}`)
}

export const analyticsAPI = {
  getDashboard: () => apiClient.get('/analytics/dashboard'),
  getPatientGrowth: () => apiClient.get('/analytics/patient-growth'),
  getRevenue: () => apiClient.get('/analytics/revenue'),
  getDepartments: () => apiClient.get('/analytics/departments'),
  getAppointmentStatus: () => apiClient.get('/analytics/appointment-status'),
  getMetrics: () => apiClient.get('/analytics/metrics')
}

export const adminAPI = {
  getUsers: () => apiClient.get('/admin/users'),
  getUserById: (id) => apiClient.get(`/admin/users/${id}`),
  createUser: (data) => apiClient.post('/admin/users', data),
  updateUser: (id, data) => apiClient.put(`/admin/users/${id}`, data),
  deleteUser: (id) => apiClient.delete(`/admin/users/${id}`),
  getStatistics: () => apiClient.get('/admin/statistics')
}

export default apiClient