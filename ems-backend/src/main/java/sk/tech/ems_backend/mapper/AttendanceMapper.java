package sk.tech.ems_backend.mapper;

import sk.tech.ems_backend.dto.AttendanceDto;
import sk.tech.ems_backend.entity.Attendance;

public class AttendanceMapper {

    public static AttendanceDto mapToAttendanceDto(Attendance attendance) {
        if (attendance == null) return null;
        AttendanceDto dto = new AttendanceDto();
        dto.setId(attendance.getId());
        dto.setDate(attendance.getDate());
        dto.setStatus(attendance.getStatus());
        
        if (attendance.getEmployee() != null) {
            dto.setEmployeeId(attendance.getEmployee().getId());
            dto.setEmployeeName(attendance.getEmployee().getFirstName() + " " + 
                              attendance.getEmployee().getLastName());
        }
        
        return dto;
    }

    public static Attendance mapToAttendance(AttendanceDto attendanceDto) {
        if (attendanceDto == null) return null;
        Attendance attendance = new Attendance();
        attendance.setId(attendanceDto.getId());
        attendance.setDate(attendanceDto.getDate());
        attendance.setStatus(attendanceDto.getStatus());
        return attendance;
    }
}
