package sk.tech.ems_backend.service;

import sk.tech.ems_backend.dto.AuthResponseDto;
import sk.tech.ems_backend.dto.LoginDto;
import sk.tech.ems_backend.dto.UserDto;

public interface AuthService {
    AuthResponseDto signup(UserDto userDto);
    AuthResponseDto login(LoginDto loginDto);
}
