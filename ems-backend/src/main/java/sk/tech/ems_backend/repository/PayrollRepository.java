package sk.tech.ems_backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import sk.tech.ems_backend.entity.Payroll;

public interface PayrollRepository extends JpaRepository<Payroll, Long> {
    List<Payroll> findByEmployeeId(Long employeeId);
    List<Payroll> findByMonth(String month);
}
