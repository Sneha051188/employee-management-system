# Authentication System Implementation

## ✅ What Was Created

### Backend Components (Java/Spring Boot)

1. **Entity Layer**
   - `User.java` - User entity with id, name, email, password, and userType fields

2. **DTO Layer**
   - `UserDto.java` - Data transfer object for user data
   - `LoginDto.java` - DTO for login requests
   - `AuthResponseDto.java` - DTO for authentication responses

3. **Repository Layer**
   - `UserRepository.java` - JPA repository with methods to find users by email

4. **Service Layer**
   - `AuthService.java` - Service interface
   - `AuthServiceImpl.java` - Service implementation with signup and login logic

5. **Controller Layer**
   - `AuthController.java` - REST endpoints for `/api/signup` and `/api/login`

6. **Mapper**
   - `UserMapper.java` - Maps between User entity and UserDto

### Frontend Updates

1. **API Updates**
   - Enhanced `api.js` with employee management functions
   
2. **Component Updates**
   - `signup/page.jsx` - Now redirects to login after successful signup
   - `login/page.jsx` - Stores user data in localStorage and redirects based on userType

### CORS Configuration
- Added `@CrossOrigin(origins = "*")` to both AuthController and EmployeeController

## 🔧 How to Test

### Step 1: Restart Backend
```powershell
cd C:\FSD_Project\ems-backend
.\mvnw spring-boot:run
```

### Step 2: Verify Database
The `users` table will be automatically created in your MySQL database (`ems`) when you start the application.

### Step 3: Test Signup
1. Go to `http://localhost:5173/signup` (or your frontend URL)
2. Fill in the signup form:
   - Name: Test User
   - Email: test@example.com
   - Password: password123
   - UserType: Select either Employee or Company
3. Click "Sign Up"
4. You should see "Signup successful! Redirecting to login..."
5. You'll be redirected to the login page after 2 seconds

### Step 4: Test Login
1. Enter the credentials you just created
2. Click "Login"
3. You should be redirected to:
   - Employee Dashboard (if you selected Employee)
   - Admin Dashboard (if you selected Company)

## 📝 API Endpoints

### Authentication Endpoints
- `POST /api/signup` - Register a new user
  ```json
  {
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123",
    "userType": "employee"
  }
  ```

- `POST /api/login` - Login with credentials
  ```json
  {
    "email": "john@example.com",
    "password": "password123"
  }
  ```

### Employee Endpoints (Existing)
- `GET /api/employees` - Get all employees
- `GET /api/employees/{id}` - Get employee by ID
- `POST /api/employees` - Create new employee
- `PUT /api/employees/{id}` - Update employee
- `DELETE /api/employees/{id}` - Delete employee

## ⚠️ Important Security Note

**WARNING**: The current implementation stores passwords in **PLAIN TEXT**, which is **NOT SECURE** for production use!

### For Production, You Should:

1. **Add Spring Security dependency** to `pom.xml`:
```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-security</artifactId>
</dependency>
```

2. **Hash passwords** using BCrypt in `AuthServiceImpl.java`:
```java
// For signup
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

// When saving user
user.setPassword(passwordEncoder.encode(userDto.getPassword()));

// For login
if (!passwordEncoder.matches(loginDto.getPassword(), user.getPassword())) {
    throw new ResourceNotFoundException("Invalid email or password");
}
```

3. **Add JWT tokens** for session management
4. **Implement proper authentication filters**
5. **Add input validation**
6. **Implement rate limiting**

## 🗄️ Database Schema

The `users` table will have the following structure:
```sql
CREATE TABLE users (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    user_type VARCHAR(255) NOT NULL
);
```

## ✅ Checklist

- [x] User entity created
- [x] User repository created
- [x] Authentication service implemented
- [x] Authentication controller created
- [x] CORS configuration added
- [x] Frontend signup updated
- [x] Frontend login updated
- [x] API integration complete
- [ ] Backend restarted
- [ ] Signup tested
- [ ] Login tested
- [ ] Password hashing (TODO for production)
- [ ] JWT implementation (TODO for production)

## 🐛 Troubleshooting

### Issue: "Email already exists"
- Solution: The email is already in the database. Use a different email or delete the existing user from the database.

### Issue: Backend not starting
- Check if MySQL is running
- Verify database credentials in `application.properties`
- Check if port 8080 is available

### Issue: CORS errors
- Make sure backend is running on port 8080
- Frontend should be on a different port (like 5173)
- CORS is configured to allow all origins (`*`)

### Issue: Login not working
- Verify the user was created successfully in the database
- Check the email and password match exactly (case-sensitive)
- Look at browser console for error messages
