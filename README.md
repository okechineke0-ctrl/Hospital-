# Hospital Management System

A comprehensive Hospital Management System built with React, Express, and Node.js.

## Features

- **User Authentication**: Secure login and registration for different user roles
- **Patient Management**: Register and manage patient information
- **Doctor Management**: Manage doctor profiles and specializations
- **Appointment Scheduling**: Book and manage appointments
- **Analytics Dashboard**: View system statistics and analytics
- **Role-Based Access Control**: Different permissions for Admin, Doctor, and Patient roles

## Project Structure

```
Hospital-/
├── backend/
│   ├── routes/
│   ├── middleware/
│   ├── server.js
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── pages/
│   │   ├── components/
│   │   ├── services/
│   │   ├── App.jsx
│   │   ├── index.jsx
│   │   └── index.css
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
└── README.md
```

## Installation

### Backend

```bash
cd backend
npm install
cp .env.example .env
npm run dev
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login
- `GET /api/auth/verify` - Verify token

### Patients
- `GET /api/patients` - Get all patients
- `GET /api/patients/:id` - Get patient by ID
- `POST /api/patients` - Create new patient
- `PUT /api/patients/:id` - Update patient
- `DELETE /api/patients/:id` - Delete patient

### Doctors
- `GET /api/doctors` - Get all doctors
- `GET /api/doctors/:id` - Get doctor by ID
- `POST /api/doctors` - Create new doctor
- `PUT /api/doctors/:id` - Update doctor
- `DELETE /api/doctors/:id` - Delete doctor

### Appointments
- `GET /api/appointments` - Get all appointments
- `GET /api/appointments/:id` - Get appointment by ID
- `POST /api/appointments` - Create appointment
- `PUT /api/appointments/:id` - Update appointment
- `DELETE /api/appointments/:id` - Cancel appointment

### Analytics
- `GET /api/analytics/dashboard` - Get dashboard analytics
- `GET /api/analytics/patient-growth` - Get patient growth data
- `GET /api/analytics/revenue` - Get revenue analytics
- `GET /api/analytics/departments` - Get department statistics
- `GET /api/analytics/appointment-status` - Get appointment status
- `GET /api/analytics/metrics` - Get key metrics

### Admin
- `GET /api/admin/users` - Get all users
- `GET /api/admin/users/:id` - Get user by ID
- `POST /api/admin/users` - Create new user
- `PUT /api/admin/users/:id` - Update user
- `DELETE /api/admin/users/:id` - Deactivate user
- `GET /api/admin/statistics` - Get system statistics

## Technologies Used

### Backend
- Express.js
- Node.js
- bcrypt (password hashing)
- jsonwebtoken (JWT authentication)
- CORS

### Frontend
- React 18
- React Router
- Tailwind CSS
- Axios
- Recharts (for analytics)
- Lucide React (icons)

## User Roles

1. **Admin**: Full system access, manage users, doctors, patients, view analytics
2. **Doctor**: View appointments, manage patient records
3. **Patient**: Book appointments, view medical records
4. **Receptionist**: Manage appointments and patient registrations

## Environment Variables

### Backend
```
PORT=5000
NODE_ENV=development
JWT_SECRET=your_jwt_secret_key_here
DB_URL=mongodb://localhost:27017/hospital
```

### Frontend
```
VITE_API_URL=http://localhost:5000/api
```

## Getting Started

1. Clone the repository
2. Install dependencies for both backend and frontend
3. Set up environment variables
4. Run backend: `npm run dev` (from backend directory)
5. Run frontend: `npm run dev` (from frontend directory)
6. Access the application at `http://localhost:3000`

## Default Credentials

Use the registration page to create your account or test with:
- Email: test@example.com
- Password: password123

## License

MIT
