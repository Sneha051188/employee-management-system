package sk.tech.ems_backend.service;

import java.time.LocalDate;
import java.util.List;

import sk.tech.ems_backend.dto.AttendanceDto;

public interface AttendanceService {
    AttendanceDto createAttendance(AttendanceDto attendanceDto);
    AttendanceDto getAttendanceById(Long attendanceId);
    List<AttendanceDto> getAllAttendance();
    List<AttendanceDto> getAttendanceByEmployeeId(Long employeeId);
    List<AttendanceDto> getAttendanceByDate(LocalDate date);
    AttendanceDto updateAttendance(Long attendanceId, AttendanceDto updatedAttendance);
    void deleteAttendance(Long attendanceId);
}
