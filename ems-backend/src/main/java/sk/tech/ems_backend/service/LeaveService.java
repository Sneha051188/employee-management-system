package sk.tech.ems_backend.service;

import java.util.List;

import sk.tech.ems_backend.dto.LeaveDto;

public interface LeaveService {
    LeaveDto createLeave(LeaveDto leaveDto);
    LeaveDto getLeaveById(Long leaveId);
    List<LeaveDto> getAllLeaves();
    List<LeaveDto> getLeavesByEmployeeId(Long employeeId);
    List<LeaveDto> getLeavesByStatus(String status);
    LeaveDto updateLeave(Long leaveId, LeaveDto updatedLeave);
    void deleteLeave(Long leaveId);
}
