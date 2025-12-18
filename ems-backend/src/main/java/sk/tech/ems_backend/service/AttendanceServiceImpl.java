package sk.tech.ems_backend.service;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import lombok.AllArgsConstructor;
import sk.tech.ems_backend.dto.AttendanceDto;
import sk.tech.ems_backend.entity.Attendance;
import sk.tech.ems_backend.entity.Employee;
import sk.tech.ems_backend.exception.ResourceNotFoundException;
import sk.tech.ems_backend.mapper.AttendanceMapper;
import sk.tech.ems_backend.repository.AttendanceRepository;
import sk.tech.ems_backend.repository.EmployeeRepository;

@Service
@AllArgsConstructor
public class AttendanceServiceImpl implements AttendanceService {

    private final AttendanceRepository attendanceRepository;
    private final EmployeeRepository employeeRepository;

    @Override
    public AttendanceDto createAttendance(AttendanceDto attendanceDto) {
        Attendance attendance = AttendanceMapper.mapToAttendance(attendanceDto);
        
        if (attendanceDto.getEmployeeId() != null) {
            Employee employee = employeeRepository.findById(attendanceDto.getEmployeeId())
                    .orElseThrow(() -> new ResourceNotFoundException("Employee not found with id: " + attendanceDto.getEmployeeId()));
            attendance.setEmployee(employee);
        }
        
        Attendance savedAttendance = attendanceRepository.save(attendance);
        return AttendanceMapper.mapToAttendanceDto(savedAttendance);
    }

    @Override
    public AttendanceDto getAttendanceById(Long attendanceId) {
        Attendance attendance = attendanceRepository.findById(attendanceId)
                .orElseThrow(() -> new ResourceNotFoundException("Attendance not found with id: " + attendanceId));
        return AttendanceMapper.mapToAttendanceDto(attendance);
    }

    @Override
    public List<AttendanceDto> getAllAttendance() {
        List<Attendance> attendances = attendanceRepository.findAll();
        return attendances.stream()
                .map(AttendanceMapper::mapToAttendanceDto)
                .collect(Collectors.toList());
    }

    @Override
    public List<AttendanceDto> getAttendanceByEmployeeId(Long employeeId) {
        List<Attendance> attendances = attendanceRepository.findByEmployeeId(employeeId);
        return attendances.stream()
                .map(AttendanceMapper::mapToAttendanceDto)
                .collect(Collectors.toList());
    }

    @Override
    public List<AttendanceDto> getAttendanceByDate(LocalDate date) {
        List<Attendance> attendances = attendanceRepository.findByDate(date);
        return attendances.stream()
                .map(AttendanceMapper::mapToAttendanceDto)
                .collect(Collectors.toList());
    }

    @Override
    public AttendanceDto updateAttendance(Long attendanceId, AttendanceDto updatedAttendance) {
        Attendance attendance = attendanceRepository.findById(attendanceId)
                .orElseThrow(() -> new ResourceNotFoundException("Attendance not found with id: " + attendanceId));
        
        attendance.setDate(updatedAttendance.getDate());
        attendance.setStatus(updatedAttendance.getStatus());
        
        if (updatedAttendance.getEmployeeId() != null) {
            Employee employee = employeeRepository.findById(updatedAttendance.getEmployeeId())
                    .orElseThrow(() -> new ResourceNotFoundException("Employee not found with id: " + updatedAttendance.getEmployeeId()));
            attendance.setEmployee(employee);
        }
        
        Attendance updated = attendanceRepository.save(attendance);
        return AttendanceMapper.mapToAttendanceDto(updated);
    }

    @Override
    public void deleteAttendance(Long attendanceId) {
        attendanceRepository.findById(attendanceId)
                .orElseThrow(() -> new ResourceNotFoundException("Attendance not found with id: " + attendanceId));
        attendanceRepository.deleteById(attendanceId);
    }
}
