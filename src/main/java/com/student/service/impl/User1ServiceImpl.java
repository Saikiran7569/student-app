package com.student.service.impl;

import com.student.service.User1Service;
import com.student.domain.User1;
import com.student.repository.User1Repository;
import com.student.service.dto.User1DTO;
import com.student.service.mapper.User1Mapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.LinkedList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

/**
 * Service Implementation for managing {@link User1}.
 */
@Service
@Transactional
public class User1ServiceImpl implements User1Service {

    private final Logger log = LoggerFactory.getLogger(User1ServiceImpl.class);

    private final User1Repository user1Repository;

    private final User1Mapper user1Mapper;

    public User1ServiceImpl(User1Repository user1Repository, User1Mapper user1Mapper) {
        this.user1Repository = user1Repository;
        this.user1Mapper = user1Mapper;
    }

    /**
     * Save a user1.
     *
     * @param user1DTO the entity to save.
     * @return the persisted entity.
     */
    @Override
    public User1DTO save(User1DTO user1DTO) {
        log.debug("Request to save User1 : {}", user1DTO);
        User1 user1 = user1Mapper.toEntity(user1DTO);
        user1 = user1Repository.save(user1);
        return user1Mapper.toDto(user1);
    }

    /**
     * Get all the user1S.
     *
     * @return the list of entities.
     */
    @Override
    @Transactional(readOnly = true)
    public List<User1DTO> findAll() {
        log.debug("Request to get all User1S");
        return user1Repository.findAll().stream()
            .map(user1Mapper::toDto)
            .collect(Collectors.toCollection(LinkedList::new));
    }


    /**
     * Get one user1 by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<User1DTO> findOne(Long id) {
        log.debug("Request to get User1 : {}", id);
        return user1Repository.findById(id)
            .map(user1Mapper::toDto);
    }

    /**
     * Delete the user1 by id.
     *
     * @param id the id of the entity.
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete User1 : {}", id);
        user1Repository.deleteById(id);
    }
}
