package sk.tech.ems_backend.mapper;

import sk.tech.ems_backend.dto.ReportDto;
import sk.tech.ems_backend.entity.Report;

public class ReportMapper {

    public static ReportDto mapToReportDto(Report report) {
        if (report == null) return null;
        ReportDto dto = new ReportDto();
        dto.setId(report.getId());
        dto.setReportType(report.getReportType());
        dto.setDescription(report.getDescription());
        dto.setCreatedDate(report.getCreatedDate());
        return dto;
    }

    public static Report mapToReport(ReportDto reportDto) {
        if (reportDto == null) return null;
        Report report = new Report();
        report.setId(reportDto.getId());
        report.setReportType(reportDto.getReportType());
        report.setDescription(reportDto.getDescription());
        report.setCreatedDate(reportDto.getCreatedDate());
        return report;
    }
}
