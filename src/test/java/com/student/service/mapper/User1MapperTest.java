package com.student.service.mapper;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;


public class User1MapperTest {

    private User1Mapper user1Mapper;

    @BeforeEach
    public void setUp() {
        user1Mapper = new User1MapperImpl();
    }

    @Test
    public void testEntityFromId() {
        Long id = 2L;
        assertThat(user1Mapper.fromId(id).getId()).isEqualTo(id);
        assertThat(user1Mapper.fromId(null)).isNull();
    }
}
