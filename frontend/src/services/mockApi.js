// Mock data API - replaces real API calls for demo

const mockData = {
  user: {
    id: '1',
    firstName: 'John',
    lastName: 'Doe',
    email: 'john@example.com',
    phone: '1234567890',
    role: 'patient'
  },
  patients: [
    { id: '1', userId: 'user1', firstName: 'John', lastName: 'Doe', dateOfBirth: '1990-01-15', gender: 'Male', bloodType: 'O+', address: '123 Main St' },
    { id: '2', userId: 'user2', firstName: 'Jane', lastName: 'Smith', dateOfBirth: '1985-05-20', gender: 'Female', bloodType: 'A+', address: '456 Oak Ave' },
    { id: '3', userId: 'user3', firstName: 'Mike', lastName: 'Johnson', dateOfBirth: '1992-03-10', gender: 'Male', bloodType: 'B+', address: '789 Pine Rd' },
  ],
  doctors: [
    { id: '1', userId: 'doc1', firstName: 'Dr.', lastName: 'Smith', specialization: 'Cardiology', department: 'Cardiology', experience: 15, consultationFee: 100, licenseNumber: 'LIC001' },
    { id: '2', userId: 'doc2', firstName: 'Dr.', lastName: 'Johnson', specialization: 'Neurology', department: 'Neurology', experience: 12, consultationFee: 90, licenseNumber: 'LIC002' },
    { id: '3', userId: 'doc3', firstName: 'Dr.', lastName: 'Williams', specialization: 'Pediatrics', department: 'Pediatrics', experience: 10, consultationFee: 80, licenseNumber: 'LIC003' },
  ],
  appointments: [
    { id: '1', patientId: '1', doctorId: '1', appointmentDate: '2024-07-15T10:00:00', status: 'scheduled', notes: 'Regular checkup' },
    { id: '2', patientId: '2', doctorId: '2', appointmentDate: '2024-07-16T14:30:00', status: 'scheduled', notes: 'Follow-up visit' },
    { id: '3', patientId: '3', doctorId: '3', appointmentDate: '2024-07-17T09:00:00', status: 'completed', notes: 'Vaccination' },
  ],
  analytics: {
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
    ]
  }
}

// Mock API service
export const mockAuthAPI = {
  login: (data) => Promise.resolve({ data: { token: 'mock-token-123', user: mockData.user } }),
  register: (data) => Promise.resolve({ data: { message: 'Registered successfully' } }),
  verify: () => Promise.resolve({ data: { valid: true, user: mockData.user } })
}

export const mockPatientAPI = {
  getAll: () => Promise.resolve({ data: { count: mockData.patients.length, data: mockData.patients } }),
  getById: (id) => Promise.resolve({ data: { data: mockData.patients.find(p => p.id === id) } }),
  create: (data) => Promise.resolve({ data: { message: 'Patient created', data: { id: Date.now().toString(), ...data } } }),
  update: (id, data) => Promise.resolve({ data: { message: 'Patient updated', data } }),
  delete: (id) => Promise.resolve({ data: { message: 'Patient deleted' } })
}

export const mockDoctorAPI = {
  getAll: () => Promise.resolve({ data: { count: mockData.doctors.length, data: mockData.doctors } }),
  getById: (id) => Promise.resolve({ data: { data: mockData.doctors.find(d => d.id === id) } }),
  create: (data) => Promise.resolve({ data: { message: 'Doctor created', data: { id: Date.now().toString(), ...data } } }),
  update: (id, data) => Promise.resolve({ data: { message: 'Doctor updated', data } }),
  delete: (id) => Promise.resolve({ data: { message: 'Doctor deleted' } })
}

export const mockAppointmentAPI = {
  getAll: () => Promise.resolve({ data: { count: mockData.appointments.length, data: mockData.appointments } }),
  getById: (id) => Promise.resolve({ data: { data: mockData.appointments.find(a => a.id === id) } }),
  create: (data) => Promise.resolve({ data: { message: 'Appointment created', data: { id: Date.now().toString(), status: 'scheduled', ...data } } }),
  update: (id, data) => Promise.resolve({ data: { message: 'Appointment updated', data } }),
  cancel: (id) => Promise.resolve({ data: { message: 'Appointment cancelled' } })
}

export const mockAnalyticsAPI = {
  getDashboard: () => Promise.resolve({ data: { data: mockData.analytics } }),
  getPatientGrowth: () => Promise.resolve({ data: { data: mockData.analytics.monthlyData } }),
  getRevenue: () => Promise.resolve({ data: { totalRevenue: mockData.analytics.totalRevenue } }),
  getDepartments: () => Promise.resolve({ data: { data: mockData.analytics.departmentData } }),
  getAppointmentStatus: () => Promise.resolve({ data: { data: [{ status: 'Completed', count: 298 }, { status: 'Scheduled', count: 35 }, { status: 'Cancelled', count: 9 }] } }),
  getMetrics: () => Promise.resolve({ data: { metrics: { totalPatients: mockData.analytics.totalPatients, totalDoctors: mockData.analytics.totalDoctors, totalAppointments: mockData.analytics.totalAppointments } } })
}

export const mockAdminAPI = {
  getUsers: () => Promise.resolve({ data: { count: 50, data: [] } }),
  getUserById: (id) => Promise.resolve({ data: { data: mockData.user } }),
  createUser: (data) => Promise.resolve({ data: { message: 'User created' } }),
  updateUser: (id, data) => Promise.resolve({ data: { message: 'User updated' } }),
  deleteUser: (id) => Promise.resolve({ data: { message: 'User deleted' } }),
  getStatistics: () => Promise.resolve({ data: { statistics: { totalUsers: 156, activeUsers: 145, adminCount: 5, doctorCount: 24, patientCount: 120, receptionistCount: 7 } } })
}