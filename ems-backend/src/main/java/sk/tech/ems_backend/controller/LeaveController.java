package sk.tech.ems_backend.controller;

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
import sk.tech.ems_backend.dto.LeaveDto;
import sk.tech.ems_backend.service.LeaveService;

@AllArgsConstructor
@RestController
@RequestMapping("/api/leave")
@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:3001"})
public class LeaveController {

    private final LeaveService leaveService;

    // Create Leave
    @PostMapping
    public ResponseEntity<LeaveDto> createLeave(@RequestBody LeaveDto leaveDto) {
        LeaveDto savedLeave = leaveService.createLeave(leaveDto);
        return new ResponseEntity<>(savedLeave, HttpStatus.CREATED);
    }

    // Get Leave by ID
    @GetMapping("/{id}")
    public ResponseEntity<LeaveDto> getLeaveById(@PathVariable("id") Long leaveId) {
        LeaveDto leaveDto = leaveService.getLeaveById(leaveId);
        return new ResponseEntity<>(leaveDto, HttpStatus.OK);
    }

    // Get All Leaves
    @GetMapping
    public ResponseEntity<List<LeaveDto>> getAllLeaves() {
        List<LeaveDto> leaves = leaveService.getAllLeaves();
        return new ResponseEntity<>(leaves, HttpStatus.OK);
    }

    // Get Leaves by Employee ID
    @GetMapping("/employee/{employeeId}")
    public ResponseEntity<List<LeaveDto>> getLeavesByEmployeeId(@PathVariable("employeeId") Long employeeId) {
        List<LeaveDto> leaves = leaveService.getLeavesByEmployeeId(employeeId);
        return new ResponseEntity<>(leaves, HttpStatus.OK);
    }

    // Get Leaves by Status
    @GetMapping("/status/{status}")
    public ResponseEntity<List<LeaveDto>> getLeavesByStatus(@PathVariable("status") String status) {
        List<LeaveDto> leaves = leaveService.getLeavesByStatus(status);
        return new ResponseEntity<>(leaves, HttpStatus.OK);
    }

    // Update Leave
    @PutMapping("/{id}")
    public ResponseEntity<LeaveDto> updateLeave(@PathVariable("id") Long leaveId,
                                                @RequestBody LeaveDto updatedLeave) {
        LeaveDto leaveDto = leaveService.updateLeave(leaveId, updatedLeave);
        return new ResponseEntity<>(leaveDto, HttpStatus.OK);
    }

    // Delete Leave
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteLeave(@PathVariable("id") Long leaveId) {
        leaveService.deleteLeave(leaveId);
        return new ResponseEntity<>("Leave deleted successfully!", HttpStatus.OK);
    }
}
