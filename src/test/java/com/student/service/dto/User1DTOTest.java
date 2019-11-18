package com.student.service.dto;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.student.web.rest.TestUtil;

public class User1DTOTest {

    @Test
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(User1DTO.class);
        User1DTO user1DTO1 = new User1DTO();
        user1DTO1.setId(1L);
        User1DTO user1DTO2 = new User1DTO();
        assertThat(user1DTO1).isNotEqualTo(user1DTO2);
        user1DTO2.setId(user1DTO1.getId());
        assertThat(user1DTO1).isEqualTo(user1DTO2);
        user1DTO2.setId(2L);
        assertThat(user1DTO1).isNotEqualTo(user1DTO2);
        user1DTO1.setId(null);
        assertThat(user1DTO1).isNotEqualTo(user1DTO2);
    }
}
