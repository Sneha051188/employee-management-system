-- Insert missing employee user accounts
INSERT IGNORE INTO users (name, email, password, user_type, employee_id) VALUES
('Rahul Sharma', 'rahul@company.com', 'Rahul123', 'employee', 2),
('Sneha Patel', 'sneha@company.com', 'Sneha123', 'employee', 3),
('Amit Singh', 'amit@company.com', 'Amit123', 'employee', 4),
('Riya Gupta', 'riya@company.com', 'Riya123', 'employee', 5);
