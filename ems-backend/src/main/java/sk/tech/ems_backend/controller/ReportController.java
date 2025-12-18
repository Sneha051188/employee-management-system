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
import sk.tech.ems_backend.dto.ReportDto;
import sk.tech.ems_backend.service.ReportService;

@AllArgsConstructor
@RestController
@RequestMapping("/api/reports")
@CrossOrigin(origins = "*")
public class ReportController {

    private final ReportService reportService;

    // Create Report
    @PostMapping
    public ResponseEntity<ReportDto> createReport(@RequestBody ReportDto reportDto) {
        ReportDto savedReport = reportService.createReport(reportDto);
        return new ResponseEntity<>(savedReport, HttpStatus.CREATED);
    }

    // Get Report by ID
    @GetMapping("/{id}")
    public ResponseEntity<ReportDto> getReportById(@PathVariable("id") Long reportId) {
        ReportDto reportDto = reportService.getReportById(reportId);
        return new ResponseEntity<>(reportDto, HttpStatus.OK);
    }

    // Get All Reports
    @GetMapping
    public ResponseEntity<List<ReportDto>> getAllReports() {
        List<ReportDto> reports = reportService.getAllReports();
        return new ResponseEntity<>(reports, HttpStatus.OK);
    }

    // Get Reports by Type
    @GetMapping("/type/{reportType}")
    public ResponseEntity<List<ReportDto>> getReportsByType(@PathVariable("reportType") String reportType) {
        List<ReportDto> reports = reportService.getReportsByType(reportType);
        return new ResponseEntity<>(reports, HttpStatus.OK);
    }

    // Update Report
    @PutMapping("/{id}")
    public ResponseEntity<ReportDto> updateReport(@PathVariable("id") Long reportId,
                                                  @RequestBody ReportDto updatedReport) {
        ReportDto reportDto = reportService.updateReport(reportId, updatedReport);
        return new ResponseEntity<>(reportDto, HttpStatus.OK);
    }

    // Delete Report
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteReport(@PathVariable("id") Long reportId) {
        reportService.deleteReport(reportId);
        return new ResponseEntity<>("Report deleted successfully!", HttpStatus.OK);
    }
}
