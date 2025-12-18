package sk.tech.ems_backend.service;

import java.time.LocalDate;

import org.springframework.stereotype.Service;

import lombok.AllArgsConstructor;
import sk.tech.ems_backend.dto.AttendanceDto;
import sk.tech.ems_backend.dto.AuthResponseDto;
import sk.tech.ems_backend.dto.EmployeeDto;
import sk.tech.ems_backend.dto.LeaveDto;
import sk.tech.ems_backend.dto.LoginDto;
import sk.tech.ems_backend.dto.PayrollDto;
import sk.tech.ems_backend.dto.UserDto;
import sk.tech.ems_backend.entity.Employee;
import sk.tech.ems_backend.entity.User;
import sk.tech.ems_backend.exception.ResourceNotFoundException;
import sk.tech.ems_backend.mapper.EmployeeMapper;
import sk.tech.ems_backend.mapper.UserMapper;
import sk.tech.ems_backend.repository.EmployeeRepository;
import sk.tech.ems_backend.repository.UserRepository;

@Service
@AllArgsConstructor
public class AuthServiceImpl implements AuthService {

    private final UserRepository userRepository;
    private final EmployeeRepository employeeRepository;
    private final EmployeeService employeeService;
    private final AttendanceService attendanceService;
    private final PayrollService payrollService;
    private final LeaveService leaveService;

    @Override
    public AuthResponseDto signup(UserDto userDto) {
        // Check if email already exists
        if (userRepository.existsByEmail(userDto.getEmail())) {
            throw new RuntimeException("Email already exists");
        }

        // Create new user
        User user = UserMapper.mapToUser(userDto);
        
        // If userType is "employee", create an employee record
        Long employeeId = null;
        if ("employee".equalsIgnoreCase(userDto.getUserType())) {
            // Check if employee already exists with this email
            Employee existingEmployee = employeeRepository.findByEmail(userDto.getEmail()).orElse(null);
            
            if (existingEmployee != null) {
                // Link to existing employee
                employeeId = existingEmployee.getId();
            } else {
                // Create new employee record
                EmployeeDto employeeDto = new EmployeeDto();
                
                // Parse full name into first and last name
                String[] nameParts = userDto.getName().trim().split("\\s+", 2);
                employeeDto.setFirstName(nameParts[0]);
                employeeDto.setLastName(nameParts.length > 1 ? nameParts[1] : "");
                
                employeeDto.setEmail(userDto.getEmail());
                employeeDto.setRole("Employee"); // Default role
                employeeDto.setSalary(50000.0); // Default salary
                employeeDto.setDateOfJoining(java.time.LocalDate.now());
                
                EmployeeDto savedEmployee = employeeService.createEmployee(employeeDto);
                employeeId = savedEmployee.getId();
                
                // Create default attendance records for the last 5 days
                createDefaultAttendance(employeeId);
                
                // Create default payroll record for current month
                createDefaultPayroll(employeeId, employeeDto.getSalary());
                
                // Create a sample leave request
                createDefaultLeave(employeeId);
            }
            user.setEmployeeId(employeeId);
        }
        
        // In production, you should hash the password using BCrypt
        // For now, storing plain text (NOT RECOMMENDED for production)
        User savedUser = userRepository.save(user);

        return new AuthResponseDto(
                savedUser.getId(),
                savedUser.getName(),
                savedUser.getEmail(),
                savedUser.getUserType(),
                savedUser.getEmployeeId(),
                "Signup successful"
        );
    }

    @Override
    public AuthResponseDto login(LoginDto loginDto) {
        User user = userRepository.findByEmail(loginDto.getEmail())
                .orElseThrow(() -> new ResourceNotFoundException("Invalid email or password"));

        // In production, you should compare hashed passwords
        if (!user.getPassword().equals(loginDto.getPassword())) {
            throw new ResourceNotFoundException("Invalid email or password");
        }

        // Ensure employee users have a valid employeeId
        if ("employee".equalsIgnoreCase(user.getUserType()) && user.getEmployeeId() == null) {
            Employee employee = employeeRepository.findByEmail(user.getEmail())
                .orElseGet(() -> {
                    // If no employee record exists, create one
                    EmployeeDto newEmployeeDto = new EmployeeDto();
                    String[] nameParts = user.getName().trim().split("\\s+", 2);
                    newEmployeeDto.setFirstName(nameParts[0]);
                    newEmployeeDto.setLastName(nameParts.length > 1 ? nameParts[1] : "");
                    newEmployeeDto.setEmail(user.getEmail());
                    newEmployeeDto.setRole("Employee"); // Default role
                    newEmployeeDto.setSalary(50000.0); // Default salary
                    newEmployeeDto.setDateOfJoining(LocalDate.now());
                    
                    EmployeeDto savedEmployee = employeeService.createEmployee(newEmployeeDto);
                    
                    // Create default records for the new employee
                    createDefaultAttendance(savedEmployee.getId());
                    createDefaultPayroll(savedEmployee.getId(), savedEmployee.getSalary());
                    createDefaultLeave(savedEmployee.getId());
                    
                    return EmployeeMapper.mapToEmployee(savedEmployee);
                });
            
            user.setEmployeeId(employee.getId());
            userRepository.save(user);
        }

        return new AuthResponseDto(
                user.getId(),
                user.getName(),
                user.getEmail(),
                user.getUserType(),
                user.getEmployeeId(),
                "Login successful"
        );
    }
    
    // Helper method to create default attendance records
    private void createDefaultAttendance(Long employeeId) {
        LocalDate today = LocalDate.now();
        String[] statuses = {"Present", "Present", "Present", "Present", "Present"};
        
        for (int i = 4; i >= 0; i--) {
            AttendanceDto attendanceDto = new AttendanceDto();
            attendanceDto.setEmployeeId(employeeId);
            attendanceDto.setDate(today.minusDays(i));
            attendanceDto.setStatus(statuses[4 - i]);
            
            try {
                attendanceService.createAttendance(attendanceDto);
            } catch (Exception e) {
                // Log error but continue
                System.err.println("Error creating attendance: " + e.getMessage());
            }
        }
    }
    
    // Helper method to create default payroll record
    private void createDefaultPayroll(Long employeeId, Double salary) {
        LocalDate now = LocalDate.now();
        String currentMonth = now.getMonth().toString() + " " + now.getYear();
        
        PayrollDto payrollDto = new PayrollDto();
        payrollDto.setEmployeeId(employeeId);
        payrollDto.setMonth(currentMonth);
        payrollDto.setBasicSalary(salary);
        payrollDto.setBonus(0.0);
        payrollDto.setDeductions(salary * 0.05); // 5% deduction
        payrollDto.setNetSalary(salary - (salary * 0.05));
        
        try {
            payrollService.createPayroll(payrollDto);
        } catch (Exception e) {
            // Log error but continue
            System.err.println("Error creating payroll: " + e.getMessage());
        }
    }
    
    // Helper method to create a sample leave request
    private void createDefaultLeave(Long employeeId) {
        LocalDate now = LocalDate.now();
        
        LeaveDto leaveDto = new LeaveDto();
        leaveDto.setEmployeeId(employeeId);
        leaveDto.setLeaveType("Casual");
        leaveDto.setStartDate(now.plusDays(7));  // Leave request for next week
        leaveDto.setEndDate(now.plusDays(9));    // 3 days leave
        leaveDto.setStatus("Pending");
        
        try {
            leaveService.createLeave(leaveDto);
        } catch (Exception e) {
            // Log error but continue
            System.err.println("Error creating leave: " + e.getMessage());
        }
    }
}
