-- Add Employees 6 and 7 with complete data

-- Insert Employees 6 and 7
INSERT INTO employees (first_name, last_name, email, department_id, role, salary, date_of_joining) VALUES
('Priya', 'Verma', 'priya@company.com', 1, 'Junior Developer', 45000.00, '2024-03-15'),
('Vikram', 'Kumar', 'vikram@company.com', 2, 'HR Assistant', 40000.00, '2024-04-01');

-- Insert Users for Employees 6 and 7
INSERT INTO users (name, email, password, user_type, employee_id) VALUES
('Priya Verma', 'priya@company.com', 'Priya123', 'employee', 6),
('Vikram Kumar', 'vikram@company.com', 'Vikram123', 'employee', 7);

-- Insert Attendance Records for Employee 6
INSERT INTO attendance (employee_id, date, status) VALUES
(6, '2025-12-14', 'Present'),
(6, '2025-12-15', 'Present'),
(6, '2025-12-16', 'Present'),
(6, '2025-12-17', 'Present'),
(6, '2025-12-18', 'Present');

-- Insert Attendance Records for Employee 7
INSERT INTO attendance (employee_id, date, status) VALUES
(7, '2025-12-14', 'Present'),
(7, '2025-12-15', 'Late'),
(7, '2025-12-16', 'Present'),
(7, '2025-12-17', 'Present'),
(7, '2025-12-18', 'Present');

-- Insert Leave Requests for Employees 6 and 7
INSERT INTO leaves (employee_id, leave_type, start_date, end_date, status) VALUES
(6, 'Sick', '2025-12-25', '2025-12-26', 'Pending'),
(7, 'Casual', '2025-12-30', '2025-12-31', 'Approved');

-- Insert Payroll Records for Employees 6 and 7
INSERT INTO payroll (employee_id, month, basic_salary, bonus, deductions, net_salary) VALUES
(6, 'November 2025', 45000.00, 2000.00, 2000.00, 45000.00),
(6, 'December 2025', 45000.00, 0.00, 2000.00, 43000.00),
(7, 'November 2025', 40000.00, 1500.00, 1800.00, 39700.00),
(7, 'December 2025', 40000.00, 0.00, 1800.00, 38200.00);
