package sk.tech.ems_backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import sk.tech.ems_backend.entity.Department;

public interface DepartmentRepository extends JpaRepository<Department, Long> {
}
