-- Sample Data for Company Management System

-- Insert Departments
INSERT INTO departments (name, description, head) VALUES
('Engineering', 'Software Development and Engineering Team', 'John Smith'),
('Human Resources', 'HR and Employee Management', 'Sarah Johnson'),
('Marketing', 'Marketing and Sales Department', 'Mike Williams'),
('Finance', 'Finance and Accounting', 'Emily Davis');

-- Insert Employees
INSERT INTO employees (first_name, last_name, email, department_id, role, salary, date_of_joining) VALUES
('Rishi Singh', 'Bedi', 'Rishi@gmail.com', 1, 'Software Engineer', 75000.00, '2024-01-15'),
('Rahul', 'Sharma', 'rahul@company.com', 1, 'Senior Developer', 95000.00, '2023-06-10'),
('Sneha', 'Patel', 'sneha@company.com', 2, 'HR Manager', 65000.00, '2023-03-20'),
('Amit', 'Singh', 'amit@company.com', 3, 'Marketing Executive', 55000.00, '2024-02-01'),
('Riya', 'Gupta', 'riya@company.com', 4, 'Accountant', 60000.00, '2023-11-15'),
('Priya', 'Verma', 'priya@company.com', 1, 'Junior Developer', 45000.00, '2024-03-15'),
('Vikram', 'Kumar', 'vikram@company.com', 2, 'HR Assistant', 40000.00, '2024-04-01');

-- Insert Users (for authentication)
INSERT INTO users (name, email, password, user_type, employee_id) VALUES
('Rishi Singh Bedi', 'Rishi@gmail.com', 'Rishi123', 'employee', 1),
('Rahul Sharma', 'rahul@company.com', 'Rahul123', 'employee', 2),
('Sneha Patel', 'sneha@company.com', 'Sneha123', 'employee', 3),
('Amit Singh', 'amit@company.com', 'Amit123', 'employee', 4),
('Riya Gupta', 'riya@company.com', 'Riya123', 'employee', 5),
('Priya Verma', 'priya@company.com', 'Priya123', 'employee', 6),
('Vikram Kumar', 'vikram@company.com', 'Vikram123', 'employee', 7),
('Admin User', 'admin@company.com', 'Admin123', 'company', NULL);

-- Insert Attendance Records
INSERT INTO attendance (employee_id, date, status) VALUES
(1, '2025-10-14', 'Present'),
(1, '2025-10-15', 'Present'),
(1, '2025-10-16', 'Present'),
(2, '2025-10-14', 'Present'),
(2, '2025-10-15', 'Late'),
(2, '2025-10-16', 'Present'),
(3, '2025-10-14', 'Present'),
(3, '2025-10-15', 'Present'),
(3, '2025-10-16', 'Absent'),
(4, '2025-10-14', 'Present'),
(4, '2025-10-15', 'Present'),
(4, '2025-10-16', 'Present'),
(5, '2025-10-14', 'Late'),
(5, '2025-10-15', 'Present'),
(5, '2025-10-16', 'Present'),
(6, '2025-12-14', 'Present'),
(6, '2025-12-15', 'Present'),
(6, '2025-12-16', 'Present'),
(6, '2025-12-17', 'Present'),
(6, '2025-12-18', 'Present'),
(7, '2025-12-14', 'Present'),
(7, '2025-12-15', 'Late'),
(7, '2025-12-16', 'Present'),
(7, '2025-12-17', 'Present'),
(7, '2025-12-18', 'Present');

-- Insert Leave Requests
INSERT INTO leaves (employee_id, leave_type, start_date, end_date, status) VALUES
(1, 'Casual', '2025-10-20', '2025-10-22', 'Approved'),
(2, 'Sick', '2025-10-18', '2025-10-19', 'Pending'),
(3, 'Earned', '2025-11-01', '2025-11-05', 'Approved'),
(4, 'Casual', '2025-10-25', '2025-10-25', 'Rejected'),
(5, 'Sick', '2025-10-17', '2025-10-17', 'Pending'),
(6, 'Sick', '2025-12-25', '2025-12-26', 'Pending'),
(7, 'Casual', '2025-12-30', '2025-12-31', 'Approved');

-- Insert Payroll Records
INSERT INTO payroll (employee_id, month, basic_salary, bonus, deductions, net_salary) VALUES
(1, 'September 2025', 75000.00, 5000.00, 3000.00, 77000.00),
(1, 'October 2025', 75000.00, 0.00, 3000.00, 72000.00),
(2, 'September 2025', 95000.00, 10000.00, 4000.00, 101000.00),
(2, 'October 2025', 95000.00, 0.00, 4000.00, 91000.00),
(3, 'September 2025', 65000.00, 3000.00, 2500.00, 65500.00),
(3, 'October 2025', 65000.00, 0.00, 2500.00, 62500.00),
(4, 'September 2025', 55000.00, 2000.00, 2000.00, 55000.00),
(4, 'October 2025', 55000.00, 0.00, 2000.00, 53000.00),
(5, 'September 2025', 60000.00, 4000.00, 2200.00, 61800.00),
(5, 'October 2025', 60000.00, 0.00, 2200.00, 57800.00),
(6, 'November 2025', 45000.00, 2000.00, 2000.00, 45000.00),
(6, 'December 2025', 45000.00, 0.00, 2000.00, 43000.00),
(7, 'November 2025', 40000.00, 1500.00, 1800.00, 39700.00),
(7, 'December 2025', 40000.00, 0.00, 1800.00, 38200.00);

-- Insert Reports
INSERT INTO reports (report_type, description, created_date) VALUES
('Monthly Performance', 'September 2025 team performance analysis showing 95% goal completion rate.', '2025-10-01'),
('Attendance Report', 'Q3 2025 attendance summary - 98% average attendance across all departments.', '2025-10-05'),
('Financial Report', 'Q3 2025 financial summary - Revenue increased by 15% compared to Q2.', '2025-10-10'),
('Training Completion', 'Annual mandatory training completion report - 92% completion rate.', '2025-10-12');
