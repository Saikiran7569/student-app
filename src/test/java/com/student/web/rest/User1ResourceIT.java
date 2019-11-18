package com.student.web.rest;

import com.student.StudentApp;
import com.student.domain.User1;
import com.student.repository.User1Repository;
import com.student.service.User1Service;
import com.student.service.dto.User1DTO;
import com.student.service.mapper.User1Mapper;
import com.student.web.rest.errors.ExceptionTranslator;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.validation.Validator;

import javax.persistence.EntityManager;
import java.util.List;

import static com.student.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@link User1Resource} REST controller.
 */
@SpringBootTest(classes = StudentApp.class)
public class User1ResourceIT {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    @Autowired
    private User1Repository user1Repository;

    @Autowired
    private User1Mapper user1Mapper;

    @Autowired
    private User1Service user1Service;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    @Autowired
    private Validator validator;

    private MockMvc restUser1MockMvc;

    private User1 user1;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final User1Resource user1Resource = new User1Resource(user1Service);
        this.restUser1MockMvc = MockMvcBuilders.standaloneSetup(user1Resource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter)
            .setValidator(validator).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static User1 createEntity(EntityManager em) {
        User1 user1 = new User1()
            .name(DEFAULT_NAME);
        return user1;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static User1 createUpdatedEntity(EntityManager em) {
        User1 user1 = new User1()
            .name(UPDATED_NAME);
        return user1;
    }

    @BeforeEach
    public void initTest() {
        user1 = createEntity(em);
    }

    @Test
    @Transactional
    public void createUser1() throws Exception {
        int databaseSizeBeforeCreate = user1Repository.findAll().size();

        // Create the User1
        User1DTO user1DTO = user1Mapper.toDto(user1);
        restUser1MockMvc.perform(post("/api/user-1-s")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(user1DTO)))
            .andExpect(status().isCreated());

        // Validate the User1 in the database
        List<User1> user1List = user1Repository.findAll();
        assertThat(user1List).hasSize(databaseSizeBeforeCreate + 1);
        User1 testUser1 = user1List.get(user1List.size() - 1);
        assertThat(testUser1.getName()).isEqualTo(DEFAULT_NAME);
    }

    @Test
    @Transactional
    public void createUser1WithExistingId() throws Exception {
        int databaseSizeBeforeCreate = user1Repository.findAll().size();

        // Create the User1 with an existing ID
        user1.setId(1L);
        User1DTO user1DTO = user1Mapper.toDto(user1);

        // An entity with an existing ID cannot be created, so this API call must fail
        restUser1MockMvc.perform(post("/api/user-1-s")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(user1DTO)))
            .andExpect(status().isBadRequest());

        // Validate the User1 in the database
        List<User1> user1List = user1Repository.findAll();
        assertThat(user1List).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllUser1S() throws Exception {
        // Initialize the database
        user1Repository.saveAndFlush(user1);

        // Get all the user1List
        restUser1MockMvc.perform(get("/api/user-1-s?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(user1.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME)));
    }
    
    @Test
    @Transactional
    public void getUser1() throws Exception {
        // Initialize the database
        user1Repository.saveAndFlush(user1);

        // Get the user1
        restUser1MockMvc.perform(get("/api/user-1-s/{id}", user1.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(user1.getId().intValue()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME));
    }

    @Test
    @Transactional
    public void getNonExistingUser1() throws Exception {
        // Get the user1
        restUser1MockMvc.perform(get("/api/user-1-s/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateUser1() throws Exception {
        // Initialize the database
        user1Repository.saveAndFlush(user1);

        int databaseSizeBeforeUpdate = user1Repository.findAll().size();

        // Update the user1
        User1 updatedUser1 = user1Repository.findById(user1.getId()).get();
        // Disconnect from session so that the updates on updatedUser1 are not directly saved in db
        em.detach(updatedUser1);
        updatedUser1
            .name(UPDATED_NAME);
        User1DTO user1DTO = user1Mapper.toDto(updatedUser1);

        restUser1MockMvc.perform(put("/api/user-1-s")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(user1DTO)))
            .andExpect(status().isOk());

        // Validate the User1 in the database
        List<User1> user1List = user1Repository.findAll();
        assertThat(user1List).hasSize(databaseSizeBeforeUpdate);
        User1 testUser1 = user1List.get(user1List.size() - 1);
        assertThat(testUser1.getName()).isEqualTo(UPDATED_NAME);
    }

    @Test
    @Transactional
    public void updateNonExistingUser1() throws Exception {
        int databaseSizeBeforeUpdate = user1Repository.findAll().size();

        // Create the User1
        User1DTO user1DTO = user1Mapper.toDto(user1);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restUser1MockMvc.perform(put("/api/user-1-s")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(user1DTO)))
            .andExpect(status().isBadRequest());

        // Validate the User1 in the database
        List<User1> user1List = user1Repository.findAll();
        assertThat(user1List).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteUser1() throws Exception {
        // Initialize the database
        user1Repository.saveAndFlush(user1);

        int databaseSizeBeforeDelete = user1Repository.findAll().size();

        // Delete the user1
        restUser1MockMvc.perform(delete("/api/user-1-s/{id}", user1.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<User1> user1List = user1Repository.findAll();
        assertThat(user1List).hasSize(databaseSizeBeforeDelete - 1);
    }
}
