-- Update existing users with employee IDs
UPDATE users SET employee_id = 1 WHERE email = 'Rishi@gmail.com';
UPDATE users SET employee_id = 2 WHERE email = 'rahul@company.com';
UPDATE users SET employee_id = 3 WHERE email = 'sneha@company.com';
UPDATE users SET employee_id = 4 WHERE email = 'amit@company.com';
UPDATE users SET employee_id = 5 WHERE email = 'riya@company.com';

-- Insert admin user if not exists
INSERT IGNORE INTO users (name, email, password, user_type, employee_id) VALUES
('Admin User', 'admin@company.com', 'Admin123', 'company', NULL);
