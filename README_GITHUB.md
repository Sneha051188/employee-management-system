# 🏢 Employee Management System

A full-stack web application for comprehensive employee management, built with modern technologies and best practices.

[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react)](https://react.dev/)
[![Spring Boot](https://img.shields.io/badge/Spring%20Boot-3.5.6-6DB33F?logo=springboot)](https://spring.io/projects/spring-boot)
[![Java](https://img.shields.io/badge/Java-21-007396?logo=openjdk)](https://www.oracle.com/java/)
[![MySQL](https://img.shields.io/badge/MySQL-8.0-4479A1?logo=mysql)](https://www.mysql.com/)

## ✨ Features

### 👤 Employee Portal
- 📊 **Personal Dashboard** - View attendance, salary, and leave balance
- 📅 **Attendance Tracking** - Mark attendance and view history
- 💰 **Salary Management** - View payslips and salary history
- 🌴 **Leave Management** - Apply for leave and track status
- 📄 **Reports Access** - View company reports and announcements
- 👤 **Profile Management** - Update personal information

### 👨‍💼 Admin Portal
- 👥 **Employee Management** - Add, edit, delete employee records
- 🏢 **Department Management** - Organize departments
- ✅ **Attendance Monitoring** - View and manage all attendance records
- 🌴 **Leave Approval** - Approve or reject leave requests
- 💵 **Payroll Management** - Generate and manage salary records
- 📊 **Reporting System** - Generate company-wide reports

### 🔐 Authentication System
- User registration with automatic profile creation
- Secure login for employees and admins
- Role-based access control
- Auto-creation of attendance, payroll, and leave records for new users

## 🛠️ Tech Stack

### Frontend
- **Framework:** React 19
- **Build Tool:** Vite
- **Routing:** React Router v7
- **HTTP Client:** Axios
- **Styling:** Pure CSS with custom animations
- **Icons:** Font Awesome

### Backend
- **Framework:** Spring Boot 3.5.6
- **Language:** Java 21
- **Database:** MySQL 8.0
- **ORM:** JPA/Hibernate
- **Build Tool:** Maven
- **Architecture:** Layered (Controller → Service → Repository)

## 📁 Project Structure

```
employee-management-system/
├── ems-backend/                    # Spring Boot Backend
│   ├── src/main/java/sk/tech/ems_backend/
│   │   ├── controller/             # REST API endpoints
│   │   ├── service/                # Business logic
│   │   ├── repository/             # Data access layer
│   │   ├── entity/                 # JPA entities
│   │   ├── dto/                    # Data transfer objects
│   │   ├── mapper/                 # Entity-DTO converters
│   │   └── exception/              # Custom exceptions
│   ├── src/main/resources/
│   │   └── application.properties  # Database config
│   ├── sample_data.sql             # Sample data for testing
│   └── pom.xml                     # Maven dependencies
│
└── full-stack-app/ems-frontend/    # React Frontend
    ├── src/
    │   ├── home/                   # Landing page
    │   ├── login/                  # Login page
    │   ├── signup/                 # Registration page
    │   ├── employeeDashboard/      # Employee dashboard
    │   ├── employee/               # Employee features
    │   │   ├── Profile.jsx
    │   │   ├── Attendance.jsx
    │   │   ├── Salary.jsx
    │   │   ├── Leaves.jsx
    │   │   └── Reports.jsx
    │   ├── adminDashboard/         # Admin dashboard
    │   ├── admin/                  # Admin features
    │   │   ├── ManageEmployees.jsx
    │   │   ├── ManageDepartments.jsx
    │   │   ├── ManageLeaves.jsx
    │   │   ├── ViewAttendance.jsx
    │   │   ├── ManagePayroll.jsx
    │   │   └── ViewReports.jsx
    │   ├── api.js                  # API service functions
    │   ├── animations.css          # Reusable animations
    │   └── App.jsx                 # Main routing
    └── package.json
```

## 🚀 Quick Start

### Prerequisites
- Java 21
- Node.js 18+ & npm
- MySQL 8.0
- Git

### 1. Clone the Repository
```bash
git clone https://github.com/YOUR_USERNAME/employee-management-system.git
cd employee-management-system
```

### 2. Setup Database
```sql
-- Create database
CREATE DATABASE companydb;

-- Import sample data
mysql -u root -p companydb < ems-backend/sample_data.sql
```

### 3. Configure Backend
Edit `ems-backend/src/main/resources/application.properties`:
```properties
spring.datasource.url=jdbc:mysql://localhost:3306/companydb
spring.datasource.username=root
spring.datasource.password=YOUR_PASSWORD
```

### 4. Run Backend
```bash
cd ems-backend
./mvnw spring-boot:run
# Backend runs on http://localhost:8080
```

### 5. Run Frontend
```bash
cd full-stack-app/ems-frontend
npm install
npm run dev
# Frontend runs on http://localhost:3001
```

### 6. Access the Application
- **Frontend:** http://localhost:3001
- **Backend API:** http://localhost:8080/api

## 🔐 Default Login Credentials

| Role | Email | Password |
|------|-------|----------|
| Admin | admin@company.com | Admin123 |
| Employee | Rishi@gmail.com | Rishi123 |
| Employee | rahul@company.com | Rahul123 |

## 📊 Database Schema

### Core Tables
- **employees** - Employee information
- **departments** - Department details
- **users** - Authentication data
- **attendance** - Daily attendance records
- **leaves** - Leave requests and status
- **payroll** - Salary and payment records
- **reports** - Company reports

## 🎨 Design System

### Color Palette
- **Primary (Navy):** `#0F172A` - Navigation, headings
- **Secondary (Indigo):** `#6366F1` - Interactive elements
- **Accent (Cyan):** `#22D3EE` - Buttons, highlights
- **Background:** `#F8FAFC` - Page backgrounds
- **Text:** `#111827` - Primary text

### Key Features
- 40+ custom CSS animations
- Responsive design
- Staggered loading animations
- Toast notifications system
- Empty state designs

## 🔌 API Endpoints

### Authentication
- `POST /api/auth/signup` - Register new user
- `POST /api/auth/login` - User login

### Employees
- `GET /api/employees` - Get all employees
- `GET /api/employees/{id}` - Get employee by ID
- `POST /api/employees` - Create employee
- `PUT /api/employees/{id}` - Update employee
- `DELETE /api/employees/{id}` - Delete employee

### Departments, Attendance, Leaves, Payroll, Reports
Similar CRUD operations available for each resource.

## 📖 Documentation

- [Quick Start Guide](QUICK_START.md)
- [GitHub Upload Guide](GITHUB_UPLOAD_GUIDE.md)
- [Authentication Setup](AUTHENTICATION_SETUP.md)
- [Backend Documentation](BACKEND_EXTENSION_DOCUMENTATION.md)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 👨‍💻 Author

**Your Name**
- GitHub: [@yourusername](https://github.com/yourusername)
- Email: your.email@example.com

## 🙏 Acknowledgments

- React team for the amazing framework
- Spring Boot community for comprehensive documentation
- Font Awesome for beautiful icons

## 📞 Support

For support, email your.email@example.com or open an issue on GitHub.

---

**⭐ Star this repo if you find it helpful!**
