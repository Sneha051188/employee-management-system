package sk.tech.ems_backend.mapper;

import sk.tech.ems_backend.dto.PayrollDto;
import sk.tech.ems_backend.entity.Payroll;

public class PayrollMapper {

    public static PayrollDto mapToPayrollDto(Payroll payroll) {
        if (payroll == null) return null;
        PayrollDto dto = new PayrollDto();
        dto.setId(payroll.getId());
        dto.setMonth(payroll.getMonth());
        dto.setBasicSalary(payroll.getBasicSalary());
        dto.setBonus(payroll.getBonus());
        dto.setDeductions(payroll.getDeductions());
        dto.setNetSalary(payroll.getNetSalary());
        
        if (payroll.getEmployee() != null) {
            dto.setEmployeeId(payroll.getEmployee().getId());
            dto.setEmployeeName(payroll.getEmployee().getFirstName() + " " + 
                              payroll.getEmployee().getLastName());
        }
        
        return dto;
    }

    public static Payroll mapToPayroll(PayrollDto payrollDto) {
        if (payrollDto == null) return null;
        Payroll payroll = new Payroll();
        payroll.setId(payrollDto.getId());
        payroll.setMonth(payrollDto.getMonth());
        payroll.setBasicSalary(payrollDto.getBasicSalary());
        payroll.setBonus(payrollDto.getBonus());
        payroll.setDeductions(payrollDto.getDeductions());
        payroll.setNetSalary(payrollDto.getNetSalary());
        return payroll;
    }
}
