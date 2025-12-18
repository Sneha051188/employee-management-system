# Company Management System - Backend Extension Documentation

## Overview
Your Spring Boot backend has been successfully extended with additional entities and full CRUD REST APIs to support a comprehensive Company Admin Panel.

---

## Database Configuration

### application.properties
```properties
spring.application.name=ems-backend

# MySQL Database Configuration
spring.datasource.url=jdbc:mysql://localhost:3306/companydb
spring.datasource.username=root
spring.datasource.password=yourpassword

# JPA/Hibernate Configuration
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.MySQLDialect
spring.jpa.properties.hibernate.format_sql=true

# Server Configuration
server.port=8080
```

**Important:** Update `spring.datasource.password` with your actual MySQL root password before running.

---

## Entities Created

### 1. Department
**Fields:**
- `id` (Long, Primary Key)
- `name` (String)
- `description` (String)
- `head` (String)

**Relationship:** One-to-Many with Employee

### 2. Attendance
**Fields:**
- `id` (Long, Primary Key)
- `employee` (ManyToOne → Employee)
- `date` (LocalDate)
- `status` (String: Present/Absent/Late)

### 3. Leave
**Fields:**
- `id` (Long, Primary Key)
- `employee` (ManyToOne → Employee)
- `leaveType` (String: Sick/Casual/Earned)
- `startDate` (LocalDate)
- `endDate` (LocalDate)
- `status` (String: Pending/Approved/Rejected)

### 4. Payroll
**Fields:**
- `id` (Long, Primary Key)
- `employee` (ManyToOne → Employee)
- `month` (String)
- `basicSalary` (Double)
- `bonus` (Double)
- `deductions` (Double)
- `netSalary` (Double)

### 5. Report
**Fields:**
- `id` (Long, Primary Key)
- `reportType` (String)
- `description` (String)
- `createdDate` (LocalDate)

### 6. Employee (Updated)
**New Fields Added:**
- `department` (ManyToOne → Department)
- `role` (String)
- `salary` (Double)
- `dateOfJoining` (LocalDate)

**Existing Fields:**
- `id` (Long, Primary Key)
- `firstName` (String)
- `lastName` (String)
- `email` (String, Unique)

---

## REST API Endpoints

All endpoints use `@CrossOrigin(origins = "http://localhost:3000")` for frontend integration.

### Employee Endpoints (`/api/employees`)
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/employees` | Create new employee |
| GET | `/api/employees` | Get all employees |
| GET | `/api/employees/{id}` | Get employee by ID |
| PUT | `/api/employees/{id}` | Update employee |
| DELETE | `/api/employees/{id}` | Delete employee |

**Sample Request Body (POST/PUT):**
```json
{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john.doe@company.com",
  "departmentId": 1,
  "role": "Software Engineer",
  "salary": 75000.00,
  "dateOfJoining": "2024-01-15"
}
```

### Department Endpoints (`/api/departments`)
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/departments` | Create new department |
| GET | `/api/departments` | Get all departments |
| GET | `/api/departments/{id}` | Get department by ID |
| PUT | `/api/departments/{id}` | Update department |
| DELETE | `/api/departments/{id}` | Delete department |

**Sample Request Body (POST/PUT):**
```json
{
  "name": "Engineering",
  "description": "Software Development Department",
  "head": "Jane Smith"
}
```

### Attendance Endpoints (`/api/attendance`)
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/attendance` | Create attendance record |
| GET | `/api/attendance` | Get all attendance records |
| GET | `/api/attendance/{id}` | Get attendance by ID |
| GET | `/api/attendance/employee/{employeeId}` | Get attendance by employee |
| GET | `/api/attendance/date/{date}` | Get attendance by date (YYYY-MM-DD) |
| PUT | `/api/attendance/{id}` | Update attendance |
| DELETE | `/api/attendance/{id}` | Delete attendance |

**Sample Request Body (POST/PUT):**
```json
{
  "employeeId": 1,
  "date": "2024-10-16",
  "status": "Present"
}
```

### Leave Endpoints (`/api/leave`)
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/leave` | Create leave request |
| GET | `/api/leave` | Get all leave requests |
| GET | `/api/leave/{id}` | Get leave by ID |
| GET | `/api/leave/employee/{employeeId}` | Get leaves by employee |
| GET | `/api/leave/status/{status}` | Get leaves by status |
| PUT | `/api/leave/{id}` | Update leave |
| DELETE | `/api/leave/{id}` | Delete leave |

**Sample Request Body (POST/PUT):**
```json
{
  "employeeId": 1,
  "leaveType": "Sick",
  "startDate": "2024-10-20",
  "endDate": "2024-10-22",
  "status": "Pending"
}
```

### Payroll Endpoints (`/api/payroll`)
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/payroll` | Create payroll record |
| GET | `/api/payroll` | Get all payroll records |
| GET | `/api/payroll/{id}` | Get payroll by ID |
| GET | `/api/payroll/employee/{employeeId}` | Get payroll by employee |
| GET | `/api/payroll/month/{month}` | Get payroll by month |
| PUT | `/api/payroll/{id}` | Update payroll |
| DELETE | `/api/payroll/{id}` | Delete payroll |

**Sample Request Body (POST/PUT):**
```json
{
  "employeeId": 1,
  "month": "October 2024",
  "basicSalary": 75000.00,
  "bonus": 5000.00,
  "deductions": 8000.00,
  "netSalary": 72000.00
}
```

### Report Endpoints (`/api/reports`)
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/reports` | Create report |
| GET | `/api/reports` | Get all reports |
| GET | `/api/reports/{id}` | Get report by ID |
| GET | `/api/reports/type/{reportType}` | Get reports by type |
| PUT | `/api/reports/{id}` | Update report |
| DELETE | `/api/reports/{id}` | Delete report |

**Sample Request Body (POST/PUT):**
```json
{
  "reportType": "Monthly Performance",
  "description": "Company performance report for October 2024",
  "createdDate": "2024-10-16"
}
```

---

## Project Structure

```
ems-backend/
├── src/main/java/sk/tech/ems_backend/
│   ├── controller/
│   │   ├── AuthController.java
│   │   ├── EmployeeController.java
│   │   ├── DepartmentController.java
│   │   ├── AttendanceController.java
│   │   ├── LeaveController.java
│   │   ├── PayrollController.java
│   │   └── ReportController.java
│   │
│   ├── dto/
│   │   ├── UserDto.java
│   │   ├── LoginDto.java
│   │   ├── AuthResponseDto.java
│   │   ├── EmployeeDto.java
│   │   ├── DepartmentDto.java
│   │   ├── AttendanceDto.java
│   │   ├── LeaveDto.java
│   │   ├── PayrollDto.java
│   │   └── ReportDto.java
│   │
│   ├── entity/
│   │   ├── User.java
│   │   ├── Employee.java
│   │   ├── Department.java
│   │   ├── Attendance.java
│   │   ├── Leave.java
│   │   ├── Payroll.java
│   │   └── Report.java
│   │
│   ├── exception/
│   │   └── ResourceNotFoundException.java
│   │
│   ├── mapper/
│   │   ├── UserMapper.java
│   │   ├── EmployeeMapper.java
│   │   ├── DepartmentMapper.java
│   │   ├── AttendanceMapper.java
│   │   ├── LeaveMapper.java
│   │   ├── PayrollMapper.java
│   │   └── ReportMapper.java
│   │
│   ├── repository/
│   │   ├── UserRepository.java
│   │   ├── EmployeeRepository.java
│   │   ├── DepartmentRepository.java
│   │   ├── AttendanceRepository.java
│   │   ├── LeaveRepository.java
│   │   ├── PayrollRepository.java
│   │   └── ReportRepository.java
│   │
│   ├── service/
│   │   ├── AuthService.java
│   │   ├── AuthServiceImpl.java
│   │   ├── EmployeeService.java
│   │   ├── EmployeeServiceImpl.java
│   │   ├── DepartmentService.java
│   │   ├── DepartmentServiceImpl.java
│   │   ├── AttendanceService.java
│   │   ├── AttendanceServiceImpl.java
│   │   ├── LeaveService.java
│   │   ├── LeaveServiceImpl.java
│   │   ├── PayrollService.java
│   │   ├── PayrollServiceImpl.java
│   │   ├── ReportService.java
│   │   └── ReportServiceImpl.java
│   │
│   └── EmsBackendApplication.java
│
└── src/main/resources/
    └── application.properties
```

---

## Database Setup

### Create Database
Before running the application, create the MySQL database:

```sql
CREATE DATABASE companydb;
```

### Auto-Generated Tables
When you run the application, Hibernate will automatically create these tables:
- `users`
- `employees`
- `departments`
- `attendance`
- `leaves`
- `payroll`
- `reports`

---

## How to Run

### 1. Update Database Configuration
Edit `application.properties` and set your MySQL password:
```properties
spring.datasource.password=YOUR_MYSQL_PASSWORD
```

### 2. Build the Project
```bash
cd C:\FSD_Project\ems-backend
.\mvnw clean install
```

### 3. Run the Application
```bash
.\mvnw spring-boot:run
```

The server will start on `http://localhost:8080`

---

## Testing the APIs

### Using cURL

**Create a Department:**
```bash
curl -X POST http://localhost:8080/api/departments \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Engineering",
    "description": "Software Development",
    "head": "John Smith"
  }'
```

**Create an Employee:**
```bash
curl -X POST http://localhost:8080/api/employees \
  -H "Content-Type: application/json" \
  -d '{
    "firstName": "Jane",
    "lastName": "Doe",
    "email": "jane.doe@company.com",
    "departmentId": 1,
    "role": "Developer",
    "salary": 65000,
    "dateOfJoining": "2024-10-01"
  }'
```

**Get All Employees:**
```bash
curl http://localhost:8080/api/employees
```

### Using Postman

1. Import the endpoints listed above
2. Set Content-Type header to `application/json`
3. Use the sample request bodies provided

---

## Entity Relationships

```
Department (1) ----< (Many) Employee
Employee (1) ----< (Many) Attendance
Employee (1) ----< (Many) Leave
Employee (1) ----< (Many) Payroll
Report (Independent entity)
```

---

## Features Included

✅ **Full CRUD Operations** for all entities  
✅ **JPA Relationships** properly configured  
✅ **CORS Support** for frontend integration (localhost:3000)  
✅ **DTO Pattern** for data transfer  
✅ **Service Layer** for business logic  
✅ **Repository Layer** for database operations  
✅ **Exception Handling** with ResourceNotFoundException  
✅ **Auto-generated Primary Keys**  
✅ **Database Auto-creation** via Hibernate  

---

## Next Steps

1. **Update Database Password** in `application.properties`
2. **Create MySQL Database** named `companydb`
3. **Build and Run** the application
4. **Test APIs** using Postman or cURL
5. **Integrate Frontend** (React app on localhost:3000)

---

## Important Notes

- All tables will be created automatically when you first run the application
- The `ddl-auto=update` setting preserves existing data
- CORS is configured for `http://localhost:3000` - update if your frontend runs on a different port
- All endpoints return JSON responses
- Validation can be added using `@Valid` and `@NotNull` annotations
- Consider adding Spring Security for production use

---

## File Summary

### Total Files Created/Updated

**Entities:** 6 files  
**DTOs:** 9 files  
**Repositories:** 6 files  
**Mappers:** 6 files  
**Services:** 10 files  
**Service Implementations:** 10 files  
**Controllers:** 6 files  
**Configuration:** 1 file  

**Total:** 54 files

---

## Contact & Support

For any issues or questions, please refer to:
- Spring Boot Documentation: https://spring.io/projects/spring-boot
- Spring Data JPA: https://spring.io/projects/spring-data-jpa
- Hibernate ORM: https://hibernate.org/

---

**Happy Coding! 🚀**
