package com.student.service.dto;
import javax.validation.constraints.*;
import java.io.Serializable;
import java.util.Objects;

/**
 * A DTO for the {@link com.student.domain.User1} entity.
 */
public class User1DTO implements Serializable {

    private Long id;

    @Size(max = 255)
    private String name;


    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        User1DTO user1DTO = (User1DTO) o;
        if (user1DTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), user1DTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "User1DTO{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            "}";
    }
}
