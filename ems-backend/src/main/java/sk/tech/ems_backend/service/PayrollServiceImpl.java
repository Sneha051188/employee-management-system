package sk.tech.ems_backend.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import lombok.AllArgsConstructor;
import sk.tech.ems_backend.dto.PayrollDto;
import sk.tech.ems_backend.entity.Employee;
import sk.tech.ems_backend.entity.Payroll;
import sk.tech.ems_backend.exception.ResourceNotFoundException;
import sk.tech.ems_backend.mapper.PayrollMapper;
import sk.tech.ems_backend.repository.EmployeeRepository;
import sk.tech.ems_backend.repository.PayrollRepository;

@Service
@AllArgsConstructor
public class PayrollServiceImpl implements PayrollService {

    private final PayrollRepository payrollRepository;
    private final EmployeeRepository employeeRepository;

    @Override
    public PayrollDto createPayroll(PayrollDto payrollDto) {
        Payroll payroll = PayrollMapper.mapToPayroll(payrollDto);
        
        if (payrollDto.getEmployeeId() != null) {
            Employee employee = employeeRepository.findById(payrollDto.getEmployeeId())
                    .orElseThrow(() -> new ResourceNotFoundException("Employee not found with id: " + payrollDto.getEmployeeId()));
            payroll.setEmployee(employee);
        }
        
        Payroll savedPayroll = payrollRepository.save(payroll);
        return PayrollMapper.mapToPayrollDto(savedPayroll);
    }

    @Override
    public PayrollDto getPayrollById(Long payrollId) {
        Payroll payroll = payrollRepository.findById(payrollId)
                .orElseThrow(() -> new ResourceNotFoundException("Payroll not found with id: " + payrollId));
        return PayrollMapper.mapToPayrollDto(payroll);
    }

    @Override
    public List<PayrollDto> getAllPayrolls() {
        List<Payroll> payrolls = payrollRepository.findAll();
        return payrolls.stream()
                .map(PayrollMapper::mapToPayrollDto)
                .collect(Collectors.toList());
    }

    @Override
    public List<PayrollDto> getPayrollsByEmployeeId(Long employeeId) {
        List<Payroll> payrolls = payrollRepository.findByEmployeeId(employeeId);
        return payrolls.stream()
                .map(PayrollMapper::mapToPayrollDto)
                .collect(Collectors.toList());
    }

    @Override
    public List<PayrollDto> getPayrollsByMonth(String month) {
        List<Payroll> payrolls = payrollRepository.findByMonth(month);
        return payrolls.stream()
                .map(PayrollMapper::mapToPayrollDto)
                .collect(Collectors.toList());
    }

    @Override
    public PayrollDto updatePayroll(Long payrollId, PayrollDto updatedPayroll) {
        Payroll payroll = payrollRepository.findById(payrollId)
                .orElseThrow(() -> new ResourceNotFoundException("Payroll not found with id: " + payrollId));
        
        payroll.setMonth(updatedPayroll.getMonth());
        payroll.setBasicSalary(updatedPayroll.getBasicSalary());
        payroll.setBonus(updatedPayroll.getBonus());
        payroll.setDeductions(updatedPayroll.getDeductions());
        payroll.setNetSalary(updatedPayroll.getNetSalary());
        
        if (updatedPayroll.getEmployeeId() != null) {
            Employee employee = employeeRepository.findById(updatedPayroll.getEmployeeId())
                    .orElseThrow(() -> new ResourceNotFoundException("Employee not found with id: " + updatedPayroll.getEmployeeId()));
            payroll.setEmployee(employee);
        }
        
        Payroll updated = payrollRepository.save(payroll);
        return PayrollMapper.mapToPayrollDto(updated);
    }

    @Override
    public void deletePayroll(Long payrollId) {
        payrollRepository.findById(payrollId)
                .orElseThrow(() -> new ResourceNotFoundException("Payroll not found with id: " + payrollId));
        payrollRepository.deleteById(payrollId);
    }
}
