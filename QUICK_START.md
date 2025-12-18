# 🚀 Quick Start Guide - Company Management System Backend

## ✅ Project Status: READY TO USE

Your Spring Boot backend has been successfully extended with **5 new entities** and **complete CRUD APIs**!

---

## 📊 What Was Added

### New Entities (5)
1. **Department** - Manage company departments
2. **Attendance** - Track employee attendance
3. **Leave** - Handle leave requests
4. **Payroll** - Manage employee payroll
5. **Report** - Generate and store reports

### Updated Entity (1)
- **Employee** - Extended with department, role, salary, and joining date

### Total Files Created/Modified
- **53 source files** compiled successfully
- **6 Controllers** with full CRUD operations
- **6 Repositories** for database access
- **All with CORS enabled** for frontend integration

---

## 🎯 Quick Setup (3 Steps)

### Step 1: Update Database Password

Edit `src/main/resources/application.properties`:

```properties
spring.datasource.password=YOUR_MYSQL_ROOT_PASSWORD
```

Replace `YOUR_MYSQL_ROOT_PASSWORD` with your actual MySQL root password.

### Step 2: Create MySQL Database

Open MySQL and run:

```sql
CREATE DATABASE companydb;
```

### Step 3: Run the Application

```bash
cd C:\FSD_Project\ems-backend
.\mvnw.cmd spring-boot:run
```

The server will start on **http://localhost:8080**

---

## 📡 Available API Endpoints

All endpoints are accessible at `http://localhost:8080`

### Departments
- `GET    /api/departments` - Get all departments
- `POST   /api/departments` - Create department
- `GET    /api/departments/{id}` - Get department by ID
- `PUT    /api/departments/{id}` - Update department
- `DELETE /api/departments/{id}` - Delete department

### Employees
- `GET    /api/employees` - Get all employees
- `POST   /api/employees` - Create employee
- `GET    /api/employees/{id}` - Get employee by ID
- `PUT    /api/employees/{id}` - Update employee
- `DELETE /api/employees/{id}` - Delete employee

### Attendance
- `GET    /api/attendance` - Get all attendance
- `POST   /api/attendance` - Mark attendance
- `GET    /api/attendance/employee/{employeeId}` - Get employee's attendance
- `GET    /api/attendance/date/{date}` - Get attendance by date
- `PUT    /api/attendance/{id}` - Update attendance
- `DELETE /api/attendance/{id}` - Delete attendance

### Leave
- `GET    /api/leave` - Get all leaves
- `POST   /api/leave` - Apply for leave
- `GET    /api/leave/employee/{employeeId}` - Get employee's leaves
- `GET    /api/leave/status/{status}` - Get leaves by status
- `PUT    /api/leave/{id}` - Update leave
- `DELETE /api/leave/{id}` - Delete leave

### Payroll
- `GET    /api/payroll` - Get all payroll records
- `POST   /api/payroll` - Create payroll
- `GET    /api/payroll/employee/{employeeId}` - Get employee's payroll
- `GET    /api/payroll/month/{month}` - Get payroll by month
- `PUT    /api/payroll/{id}` - Update payroll
- `DELETE /api/payroll/{id}` - Delete payroll

### Reports
- `GET    /api/reports` - Get all reports
- `POST   /api/reports` - Create report
- `GET    /api/reports/type/{reportType}` - Get reports by type
- `PUT    /api/reports/{id}` - Update report
- `DELETE /api/reports/{id}` - Delete report

---

## 🧪 Quick Test with cURL

### 1. Create a Department
```bash
curl -X POST http://localhost:8080/api/departments ^
  -H "Content-Type: application/json" ^
  -d "{\"name\":\"Engineering\",\"description\":\"Software Development\",\"head\":\"John Smith\"}"
```

### 2. Create an Employee
```bash
curl -X POST http://localhost:8080/api/employees ^
  -H "Content-Type: application/json" ^
  -d "{\"firstName\":\"Jane\",\"lastName\":\"Doe\",\"email\":\"jane@company.com\",\"departmentId\":1,\"role\":\"Developer\",\"salary\":65000,\"dateOfJoining\":\"2024-10-01\"}"
```

### 3. Get All Employees
```bash
curl http://localhost:8080/api/employees
```

---

## 📝 Sample Request Bodies

### Create Department
```json
{
  "name": "Engineering",
  "description": "Software Development Department",
  "head": "John Smith"
}
```

### Create Employee
```json
{
  "firstName": "Jane",
  "lastName": "Doe",
  "email": "jane.doe@company.com",
  "departmentId": 1,
  "role": "Software Engineer",
  "salary": 75000.00,
  "dateOfJoining": "2024-10-16"
}
```

### Mark Attendance
```json
{
  "employeeId": 1,
  "date": "2024-10-16",
  "status": "Present"
}
```

### Apply Leave
```json
{
  "employeeId": 1,
  "leaveType": "Sick",
  "startDate": "2024-10-20",
  "endDate": "2024-10-22",
  "status": "Pending"
}
```

### Create Payroll
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

### Create Report
```json
{
  "reportType": "Monthly Performance",
  "description": "Performance report for October 2024",
  "createdDate": "2024-10-16"
}
```

---

## 🗄️ Database Tables Auto-Created

When you run the application, these tables will be created automatically:

1. `departments`
2. `employees` (with new fields)
3. `attendance`
4. `leaves`
5. `payroll`
6. `reports`
7. `users` (for authentication)

---

## 🌐 Frontend Integration

Your frontend running on **http://localhost:3000** can now call these APIs.

CORS is already configured for:
- `http://localhost:3000`

If your frontend runs on a different port, update the `@CrossOrigin` annotation in each controller.

---

## ✨ Key Features

✅ **Complete CRUD** operations for all entities  
✅ **JPA Relationships** properly configured  
✅ **Department-Employee** one-to-many relationship  
✅ **Employee relationships** with Attendance, Leave, and Payroll  
✅ **CORS enabled** for frontend integration  
✅ **Exception handling** with meaningful error messages  
✅ **Auto-generated IDs** for all entities  
✅ **JSON responses** for all endpoints  

---

## 📚 Documentation

For detailed API documentation and project structure, see:
- **BACKEND_EXTENSION_DOCUMENTATION.md** - Complete technical documentation
- **SETUP_COMPLETE.md** - Authentication setup guide

---

## 🔧 Troubleshooting

### Database Connection Error
- Ensure MySQL is running
- Check database name is `companydb`
- Verify password in `application.properties`

### Port Already in Use
- Stop any other process using port 8080
- Or change port in `application.properties`: `server.port=8081`

### Build Errors
- Run `.\mvnw.cmd clean compile` to recompile
- Check Java 21 is installed: `java -version`

---

## 🎉 Success Checklist

- [x] All 53 source files compiled successfully
- [x] 6 entities created/updated
- [x] 6 controllers with CRUD operations
- [x] 6 repositories for data access
- [x] Database configuration updated
- [x] CORS enabled for frontend

---

## 🚀 Next Steps

1. **Test the APIs** using Postman or cURL
2. **Integrate with Frontend** (React on localhost:3000)
3. **Add Validation** using `@Valid` annotations
4. **Add Security** using Spring Security
5. **Add Pagination** for large datasets
6. **Add API Documentation** using Swagger/OpenAPI

---

**Your backend is ready! Start the server and begin testing! 🎊**

For questions or issues, refer to BACKEND_EXTENSION_DOCUMENTATION.md
