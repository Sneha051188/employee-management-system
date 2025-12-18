package sk.tech.ems_backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import sk.tech.ems_backend.entity.Report;

public interface ReportRepository extends JpaRepository<Report, Long> {
    List<Report> findByReportType(String reportType);
}
