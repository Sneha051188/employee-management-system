import './App.css'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import HomePage from './home/page'
import SignupPage from './signup/page'
import LoginPage from './login/page'
import EmployeeDashboard from './employeeDashboard/page'
import AdminDashboard from './adminDashboard/page'

// Employee pages
import Profile from './employee/Profile'
import Attendance from './employee/Attendance'
import Salary from './employee/Salary'
import Leaves from './employee/Leaves'
import Reports from './employee/Reports'
import Announcements from './employee/Announcements'

// Admin pages
import ManageEmployees from './admin/ManageEmployees'
import ManageDepartments from './admin/ManageDepartments'
import ViewAttendance from './admin/ViewAttendance'
import ManageLeaves from './admin/ManageLeaves'
import ManagePayroll from './admin/ManagePayroll'
import ViewReports from './admin/ViewReports'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/employee-dashboard" element={<EmployeeDashboard />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        
        {/* Employee Routes */}
        <Route path="/employee/profile" element={<Profile />} />
        <Route path="/employee/attendance" element={<Attendance />} />
        <Route path="/employee/salary" element={<Salary />} />
        <Route path="/employee/leaves" element={<Leaves />} />
        <Route path="/employee/reports" element={<Reports />} />
        <Route path="/employee/announcements" element={<Announcements />} />

        {/* Admin Routes */}
        <Route path="/admin/employees" element={<ManageEmployees />} />
        <Route path="/admin/departments" element={<ManageDepartments />} />
        <Route path="/admin/attendance" element={<ViewAttendance />} />
        <Route path="/admin/leaves" element={<ManageLeaves />} />
        <Route path="/admin/payroll" element={<ManagePayroll />} />
        <Route path="/admin/reports" element={<ViewReports />} />
      </Routes>
    </Router>
  )
}

export default App