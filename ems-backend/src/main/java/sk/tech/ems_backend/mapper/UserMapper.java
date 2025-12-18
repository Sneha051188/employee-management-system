package sk.tech.ems_backend.mapper;

import sk.tech.ems_backend.dto.UserDto;
import sk.tech.ems_backend.entity.User;

public class UserMapper {

    public static UserDto mapToUserDto(User user) {
        return new UserDto(
                user.getId(),
                user.getName(),
                user.getEmail(),
                null, // Don't send password back
                user.getUserType(),
                user.getEmployeeId()
        );
    }

    public static User mapToUser(UserDto userDto) {
        return new User(
                userDto.getId(),
                userDto.getName(),
                userDto.getEmail(),
                userDto.getPassword(),
                userDto.getUserType(),
                userDto.getEmployeeId()
        );
    }
}
