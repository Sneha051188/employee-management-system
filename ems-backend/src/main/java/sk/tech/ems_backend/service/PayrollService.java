package sk.tech.ems_backend.service;

import java.util.List;

import sk.tech.ems_backend.dto.PayrollDto;

public interface PayrollService {
    PayrollDto createPayroll(PayrollDto payrollDto);
    PayrollDto getPayrollById(Long payrollId);
    List<PayrollDto> getAllPayrolls();
    List<PayrollDto> getPayrollsByEmployeeId(Long employeeId);
    List<PayrollDto> getPayrollsByMonth(String month);
    PayrollDto updatePayroll(Long payrollId, PayrollDto updatedPayroll);
    void deletePayroll(Long payrollId);
}
