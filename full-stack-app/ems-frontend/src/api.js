import axios from "axios";

const API_BASE_URL = "http://localhost:8081/api";

export const signup = (data) => axios.post(`${API_BASE_URL}/signup`, data);
export const login = (data) => axios.post(`${API_BASE_URL}/login`, data);

// Employee APIs
export const getAllEmployees = () => axios.get(`${API_BASE_URL}/employees`);
export const getEmployeeById = (id) => axios.get(`${API_BASE_URL}/employees/${id}`);
export const createEmployee = (data) => axios.post(`${API_BASE_URL}/employees`, data);
export const updateEmployee = (id, data) => axios.put(`${API_BASE_URL}/employees/${id}`, data);
export const deleteEmployee = (id) => axios.delete(`${API_BASE_URL}/employees/${id}`);

// Department APIs
export const getAllDepartments = () => axios.get(`${API_BASE_URL}/departments`);
export const getDepartmentById = (id) => axios.get(`${API_BASE_URL}/departments/${id}`);
export const createDepartment = (data) => axios.post(`${API_BASE_URL}/departments`, data);
export const updateDepartment = (id, data) => axios.put(`${API_BASE_URL}/departments/${id}`, data);
export const deleteDepartment = (id) => axios.delete(`${API_BASE_URL}/departments/${id}`);

// Attendance APIs
export const getAllAttendance = () => axios.get(`${API_BASE_URL}/attendance`);
export const getAttendanceById = (id) => axios.get(`${API_BASE_URL}/attendance/${id}`);
export const getAttendanceByEmployeeId = (employeeId) => axios.get(`${API_BASE_URL}/attendance/employee/${employeeId}`);
export const createAttendance = (data) => axios.post(`${API_BASE_URL}/attendance`, data);
export const updateAttendance = (id, data) => axios.put(`${API_BASE_URL}/attendance/${id}`, data);
export const deleteAttendance = (id) => axios.delete(`${API_BASE_URL}/attendance/${id}`);

// Leave APIs
export const getAllLeaves = () => axios.get(`${API_BASE_URL}/leave`);
export const getLeaveById = (id) => axios.get(`${API_BASE_URL}/leave/${id}`);
export const getLeavesByEmployeeId = (employeeId) => axios.get(`${API_BASE_URL}/leave/employee/${employeeId}`);
export const createLeave = (data) => axios.post(`${API_BASE_URL}/leave`, data);
export const updateLeave = (id, data) => axios.put(`${API_BASE_URL}/leave/${id}`, data);
export const deleteLeave = (id) => axios.delete(`${API_BASE_URL}/leave/${id}`);

// Payroll APIs
export const getAllPayroll = () => axios.get(`${API_BASE_URL}/payroll`);
export const getPayrollById = (id) => axios.get(`${API_BASE_URL}/payroll/${id}`);
export const getPayrollByEmployeeId = (employeeId) => axios.get(`${API_BASE_URL}/payroll/employee/${employeeId}`);
export const createPayroll = (data) => axios.post(`${API_BASE_URL}/payroll`, data);
export const updatePayroll = (id, data) => axios.put(`${API_BASE_URL}/payroll/${id}`, data);
export const deletePayroll = (id) => axios.delete(`${API_BASE_URL}/payroll/${id}`);

// Report APIs
export const getAllReports = () => axios.get(`${API_BASE_URL}/reports`);
export const getReportById = (id) => axios.get(`${API_BASE_URL}/reports/${id}`);
export const getReportsByEmployeeId = (employeeId) => axios.get(`${API_BASE_URL}/reports/employee/${employeeId}`);
export const createReport = (data) => axios.post(`${API_BASE_URL}/reports`, data);
export const updateReport = (id, data) => axios.put(`${API_BASE_URL}/reports/${id}`, data);
export const deleteReport = (id) => axios.delete(`${API_BASE_URL}/reports/${id}`);
