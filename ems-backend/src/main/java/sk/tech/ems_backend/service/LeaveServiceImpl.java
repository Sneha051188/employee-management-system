package sk.tech.ems_backend.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import lombok.AllArgsConstructor;
import sk.tech.ems_backend.dto.LeaveDto;
import sk.tech.ems_backend.entity.Employee;
import sk.tech.ems_backend.entity.Leave;
import sk.tech.ems_backend.exception.ResourceNotFoundException;
import sk.tech.ems_backend.mapper.LeaveMapper;
import sk.tech.ems_backend.repository.EmployeeRepository;
import sk.tech.ems_backend.repository.LeaveRepository;

@Service
@AllArgsConstructor
public class LeaveServiceImpl implements LeaveService {

    private final LeaveRepository leaveRepository;
    private final EmployeeRepository employeeRepository;

    @Override
    public LeaveDto createLeave(LeaveDto leaveDto) {
        Leave leave = LeaveMapper.mapToLeave(leaveDto);
        
        if (leaveDto.getEmployeeId() != null) {
            Employee employee = employeeRepository.findById(leaveDto.getEmployeeId())
                    .orElseThrow(() -> new ResourceNotFoundException("Employee not found with id: " + leaveDto.getEmployeeId()));
            leave.setEmployee(employee);
        }
        
        Leave savedLeave = leaveRepository.save(leave);
        return LeaveMapper.mapToLeaveDto(savedLeave);
    }

    @Override
    public LeaveDto getLeaveById(Long leaveId) {
        Leave leave = leaveRepository.findById(leaveId)
                .orElseThrow(() -> new ResourceNotFoundException("Leave not found with id: " + leaveId));
        return LeaveMapper.mapToLeaveDto(leave);
    }

    @Override
    public List<LeaveDto> getAllLeaves() {
        List<Leave> leaves = leaveRepository.findAll();
        return leaves.stream()
                .map(LeaveMapper::mapToLeaveDto)
                .collect(Collectors.toList());
    }

    @Override
    public List<LeaveDto> getLeavesByEmployeeId(Long employeeId) {
        List<Leave> leaves = leaveRepository.findByEmployeeId(employeeId);
        return leaves.stream()
                .map(LeaveMapper::mapToLeaveDto)
                .collect(Collectors.toList());
    }

    @Override
    public List<LeaveDto> getLeavesByStatus(String status) {
        List<Leave> leaves = leaveRepository.findByStatus(status);
        return leaves.stream()
                .map(LeaveMapper::mapToLeaveDto)
                .collect(Collectors.toList());
    }

    @Override
    public LeaveDto updateLeave(Long leaveId, LeaveDto updatedLeave) {
        Leave leave = leaveRepository.findById(leaveId)
                .orElseThrow(() -> new ResourceNotFoundException("Leave not found with id: " + leaveId));
        
        leave.setLeaveType(updatedLeave.getLeaveType());
        leave.setStartDate(updatedLeave.getStartDate());
        leave.setEndDate(updatedLeave.getEndDate());
        leave.setStatus(updatedLeave.getStatus());
        
        if (updatedLeave.getEmployeeId() != null) {
            Employee employee = employeeRepository.findById(updatedLeave.getEmployeeId())
                    .orElseThrow(() -> new ResourceNotFoundException("Employee not found with id: " + updatedLeave.getEmployeeId()));
            leave.setEmployee(employee);
        }
        
        Leave updated = leaveRepository.save(leave);
        return LeaveMapper.mapToLeaveDto(updated);
    }

    @Override
    public void deleteLeave(Long leaveId) {
        leaveRepository.findById(leaveId)
                .orElseThrow(() -> new ResourceNotFoundException("Leave not found with id: " + leaveId));
        leaveRepository.deleteById(leaveId);
    }
}
