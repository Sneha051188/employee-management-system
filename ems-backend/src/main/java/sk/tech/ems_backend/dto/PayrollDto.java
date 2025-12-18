package sk.tech.ems_backend.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class PayrollDto {
    private Long id;
    private Long employeeId;
    private String employeeName;
    private String month;
    private Double basicSalary;
    private Double bonus;
    private Double deductions;
    private Double netSalary;
}
