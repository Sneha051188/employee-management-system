package sk.tech.ems_backend.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import sk.tech.ems_backend.entity.Employee;

public interface EmployeeRepository extends JpaRepository<Employee, Long> {
    Optional<Employee> findByEmail(String email);
}
