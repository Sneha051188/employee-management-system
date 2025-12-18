package sk.tech.ems_backend.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import lombok.AllArgsConstructor;
import sk.tech.ems_backend.dto.ReportDto;
import sk.tech.ems_backend.entity.Report;
import sk.tech.ems_backend.exception.ResourceNotFoundException;
import sk.tech.ems_backend.mapper.ReportMapper;
import sk.tech.ems_backend.repository.ReportRepository;

@Service
@AllArgsConstructor
public class ReportServiceImpl implements ReportService {

    private final ReportRepository reportRepository;

    @Override
    public ReportDto createReport(ReportDto reportDto) {
        Report report = ReportMapper.mapToReport(reportDto);
        Report savedReport = reportRepository.save(report);
        return ReportMapper.mapToReportDto(savedReport);
    }

    @Override
    public ReportDto getReportById(Long reportId) {
        Report report = reportRepository.findById(reportId)
                .orElseThrow(() -> new ResourceNotFoundException("Report not found with id: " + reportId));
        return ReportMapper.mapToReportDto(report);
    }

    @Override
    public List<ReportDto> getAllReports() {
        List<Report> reports = reportRepository.findAll();
        return reports.stream()
                .map(ReportMapper::mapToReportDto)
                .collect(Collectors.toList());
    }

    @Override
    public List<ReportDto> getReportsByType(String reportType) {
        List<Report> reports = reportRepository.findByReportType(reportType);
        return reports.stream()
                .map(ReportMapper::mapToReportDto)
                .collect(Collectors.toList());
    }

    @Override
    public ReportDto updateReport(Long reportId, ReportDto updatedReport) {
        Report report = reportRepository.findById(reportId)
                .orElseThrow(() -> new ResourceNotFoundException("Report not found with id: " + reportId));
        
        report.setReportType(updatedReport.getReportType());
        report.setDescription(updatedReport.getDescription());
        report.setCreatedDate(updatedReport.getCreatedDate());
        
        Report updated = reportRepository.save(report);
        return ReportMapper.mapToReportDto(updated);
    }

    @Override
    public void deleteReport(Long reportId) {
        reportRepository.findById(reportId)
                .orElseThrow(() -> new ResourceNotFoundException("Report not found with id: " + reportId));
        reportRepository.deleteById(reportId);
    }
}
