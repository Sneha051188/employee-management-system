package sk.tech.ems_backend.mapper;

import sk.tech.ems_backend.dto.LeaveDto;
import sk.tech.ems_backend.entity.Leave;

public class LeaveMapper {

    public static LeaveDto mapToLeaveDto(Leave leave) {
        if (leave == null) return null;
        LeaveDto dto = new LeaveDto();
        dto.setId(leave.getId());
        dto.setLeaveType(leave.getLeaveType());
        dto.setStartDate(leave.getStartDate());
        dto.setEndDate(leave.getEndDate());
        dto.setStatus(leave.getStatus());
        
        if (leave.getEmployee() != null) {
            dto.setEmployeeId(leave.getEmployee().getId());
            dto.setEmployeeName(leave.getEmployee().getFirstName() + " " + 
                              leave.getEmployee().getLastName());
        }
        
        return dto;
    }

    public static Leave mapToLeave(LeaveDto leaveDto) {
        if (leaveDto == null) return null;
        Leave leave = new Leave();
        leave.setId(leaveDto.getId());
        leave.setLeaveType(leaveDto.getLeaveType());
        leave.setStartDate(leaveDto.getStartDate());
        leave.setEndDate(leaveDto.getEndDate());
        leave.setStatus(leaveDto.getStatus());
        return leave;
    }
}
