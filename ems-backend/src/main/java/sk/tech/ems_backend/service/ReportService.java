package sk.tech.ems_backend.service;

import java.util.List;

import sk.tech.ems_backend.dto.ReportDto;

public interface ReportService {
    ReportDto createReport(ReportDto reportDto);
    ReportDto getReportById(Long reportId);
    List<ReportDto> getAllReports();
    List<ReportDto> getReportsByType(String reportType);
    ReportDto updateReport(Long reportId, ReportDto updatedReport);
    void deleteReport(Long reportId);
}
