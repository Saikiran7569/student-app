package com.student.service;

import com.student.service.dto.User1DTO;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing {@link com.student.domain.User1}.
 */
public interface User1Service {

    /**
     * Save a user1.
     *
     * @param user1DTO the entity to save.
     * @return the persisted entity.
     */
    User1DTO save(User1DTO user1DTO);

    /**
     * Get all the user1S.
     *
     * @return the list of entities.
     */
    List<User1DTO> findAll();


    /**
     * Get the "id" user1.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<User1DTO> findOne(Long id);

    /**
     * Delete the "id" user1.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
