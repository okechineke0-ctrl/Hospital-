import mockAuthAPI from '../services/mockApi'

// Detect if running as demo (no backend URL)
const isDemoMode = !import.meta.env.VITE_API_URL || import.meta.env.VITE_API_URL.includes('localhost')

export const useApi = () => {
  if (isDemoMode) {
    return {
      authAPI: mockAuthAPI,
      patientAPI: mockPatientAPI,
      doctorAPI: mockDoctorAPI,
      appointmentAPI: mockAppointmentAPI,
      analyticsAPI: mockAnalyticsAPI,
      adminAPI: mockAdminAPI,
      isDemoMode: true
    }
  }
  // Will use real API when configured
  return {
    isDemoMode: false
  }
}

export default useApi