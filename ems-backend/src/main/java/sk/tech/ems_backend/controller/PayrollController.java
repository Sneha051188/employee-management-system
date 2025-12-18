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
import sk.tech.ems_backend.dto.PayrollDto;
import sk.tech.ems_backend.service.PayrollService;

@AllArgsConstructor
@RestController
@RequestMapping("/api/payroll")
@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:3001"})
public class PayrollController {

    private final PayrollService payrollService;

    // Create Payroll
    @PostMapping
    public ResponseEntity<PayrollDto> createPayroll(@RequestBody PayrollDto payrollDto) {
        PayrollDto savedPayroll = payrollService.createPayroll(payrollDto);
        return new ResponseEntity<>(savedPayroll, HttpStatus.CREATED);
    }

    // Get Payroll by ID
    @GetMapping("/{id}")
    public ResponseEntity<PayrollDto> getPayrollById(@PathVariable("id") Long payrollId) {
        PayrollDto payrollDto = payrollService.getPayrollById(payrollId);
        return new ResponseEntity<>(payrollDto, HttpStatus.OK);
    }

    // Get All Payrolls
    @GetMapping
    public ResponseEntity<List<PayrollDto>> getAllPayrolls() {
        List<PayrollDto> payrolls = payrollService.getAllPayrolls();
        return new ResponseEntity<>(payrolls, HttpStatus.OK);
    }

    // Get Payrolls by Employee ID
    @GetMapping("/employee/{employeeId}")
    public ResponseEntity<List<PayrollDto>> getPayrollsByEmployeeId(@PathVariable("employeeId") Long employeeId) {
        List<PayrollDto> payrolls = payrollService.getPayrollsByEmployeeId(employeeId);
        return new ResponseEntity<>(payrolls, HttpStatus.OK);
    }

    // Get Payrolls by Month
    @GetMapping("/month/{month}")
    public ResponseEntity<List<PayrollDto>> getPayrollsByMonth(@PathVariable("month") String month) {
        List<PayrollDto> payrolls = payrollService.getPayrollsByMonth(month);
        return new ResponseEntity<>(payrolls, HttpStatus.OK);
    }

    // Update Payroll
    @PutMapping("/{id}")
    public ResponseEntity<PayrollDto> updatePayroll(@PathVariable("id") Long payrollId,
                                                    @RequestBody PayrollDto updatedPayroll) {
        PayrollDto payrollDto = payrollService.updatePayroll(payrollId, updatedPayroll);
        return new ResponseEntity<>(payrollDto, HttpStatus.OK);
    }

    // Delete Payroll
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deletePayroll(@PathVariable("id") Long payrollId) {
        payrollService.deletePayroll(payrollId);
        return new ResponseEntity<>("Payroll deleted successfully!", HttpStatus.OK);
    }
}
