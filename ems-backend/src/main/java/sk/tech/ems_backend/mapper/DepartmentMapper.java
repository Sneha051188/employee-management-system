package sk.tech.ems_backend.mapper;

import sk.tech.ems_backend.dto.DepartmentDto;
import sk.tech.ems_backend.entity.Department;

public class DepartmentMapper {

    public static DepartmentDto mapToDepartmentDto(Department department) {
        if (department == null) return null;
        DepartmentDto dto = new DepartmentDto();
        dto.setId(department.getId());
        dto.setName(department.getName());
        dto.setDescription(department.getDescription());
        dto.setHead(department.getHead());
        return dto;
    }

    public static Department mapToDepartment(DepartmentDto departmentDto) {
        if (departmentDto == null) return null;
        Department department = new Department();
        department.setId(departmentDto.getId());
        department.setName(departmentDto.getName());
        department.setDescription(departmentDto.getDescription());
        department.setHead(departmentDto.getHead());
        return department;
    }
}
