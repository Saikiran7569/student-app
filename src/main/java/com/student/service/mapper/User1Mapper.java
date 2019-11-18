package com.student.service.mapper;

import com.student.domain.*;
import com.student.service.dto.User1DTO;

import org.mapstruct.*;

/**
 * Mapper for the entity {@link User1} and its DTO {@link User1DTO}.
 */
@Mapper(componentModel = "spring", uses = {})
public interface User1Mapper extends EntityMapper<User1DTO, User1> {



    default User1 fromId(Long id) {
        if (id == null) {
            return null;
        }
        User1 user1 = new User1();
        user1.setId(id);
        return user1;
    }
}
