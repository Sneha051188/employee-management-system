package sk.tech.ems_backend.controller;

import java.time.LocalDate;
import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.AllArgsConstructor;
import sk.tech.ems_backend.dto.AttendanceDto;
import sk.tech.ems_backend.service.AttendanceService;

@AllArgsConstructor
@RestController
@RequestMapping("/api/attendance")
@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:3001"})
public class AttendanceController {

    private final AttendanceService attendanceService;

    // Create Attendance
    @PostMapping
    public ResponseEntity<AttendanceDto> createAttendance(@RequestBody AttendanceDto attendanceDto) {
        AttendanceDto savedAttendance = attendanceService.createAttendance(attendanceDto);
        return new ResponseEntity<>(savedAttendance, HttpStatus.CREATED);
    }

    // Get Attendance by ID
    @GetMapping("/{id}")
    public ResponseEntity<AttendanceDto> getAttendanceById(@PathVariable("id") Long attendanceId) {
        AttendanceDto attendanceDto = attendanceService.getAttendanceById(attendanceId);
        return new ResponseEntity<>(attendanceDto, HttpStatus.OK);
    }

    // Get All Attendance
    @GetMapping
    public ResponseEntity<List<AttendanceDto>> getAllAttendance() {
        List<AttendanceDto> attendances = attendanceService.getAllAttendance();
        return new ResponseEntity<>(attendances, HttpStatus.OK);
    }

    // Get Attendance by Employee ID
    @GetMapping("/employee/{employeeId}")
    public ResponseEntity<List<AttendanceDto>> getAttendanceByEmployeeId(@PathVariable("employeeId") Long employeeId) {
        List<AttendanceDto> attendances = attendanceService.getAttendanceByEmployeeId(employeeId);
        return new ResponseEntity<>(attendances, HttpStatus.OK);
    }

    // Get Attendance by Date
    @GetMapping("/date/{date}")
    public ResponseEntity<List<AttendanceDto>> getAttendanceByDate(@PathVariable("date") String date) {
        LocalDate localDate = LocalDate.parse(date);
        List<AttendanceDto> attendances = attendanceService.getAttendanceByDate(localDate);
        return new ResponseEntity<>(attendances, HttpStatus.OK);
    }

    // Update Attendance
    @PutMapping("/{id}")
    public ResponseEntity<AttendanceDto> updateAttendance(@PathVariable("id") Long attendanceId,
                                                          @RequestBody AttendanceDto updatedAttendance) {
        AttendanceDto attendanceDto = attendanceService.updateAttendance(attendanceId, updatedAttendance);
        return new ResponseEntity<>(attendanceDto, HttpStatus.OK);
    }

    // Delete Attendance
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteAttendance(@PathVariable("id") Long attendanceId) {
        attendanceService.deleteAttendance(attendanceId);
        return new ResponseEntity<>("Attendance deleted successfully!", HttpStatus.OK);
    }
}
