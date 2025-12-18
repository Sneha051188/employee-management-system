package sk.tech.ems_backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import sk.tech.ems_backend.entity.Leave;

public interface LeaveRepository extends JpaRepository<Leave, Long> {
    List<Leave> findByEmployeeId(Long employeeId);
    List<Leave> findByStatus(String status);
}
