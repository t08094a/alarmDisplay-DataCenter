package de.leif.ffw.datacenter.web.rest;

import de.leif.ffw.datacenter.DataCenterApp;

import de.leif.ffw.datacenter.domain.PlaceOfAction;
import de.leif.ffw.datacenter.repository.PlaceOfActionRepository;
import de.leif.ffw.datacenter.web.rest.errors.ExceptionTranslator;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import java.util.List;


import static de.leif.ffw.datacenter.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the PlaceOfActionResource REST controller.
 *
 * @see PlaceOfActionResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = DataCenterApp.class)
public class PlaceOfActionResourceIntTest {

    private static final String DEFAULT_STREET = "AAAAAAAAAA";
    private static final String UPDATED_STREET = "BBBBBBBBBB";

    private static final String DEFAULT_HOUSE_NUMBER = "AAAAAAAAAA";
    private static final String UPDATED_HOUSE_NUMBER = "BBBBBBBBBB";

    private static final String DEFAULT_CITY = "AAAAAAAAAA";
    private static final String UPDATED_CITY = "BBBBBBBBBB";

    private static final String DEFAULT_ADDITION = "AAAAAAAAAA";
    private static final String UPDATED_ADDITION = "BBBBBBBBBB";

    @Autowired
    private PlaceOfActionRepository placeOfActionRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restPlaceOfActionMockMvc;

    private PlaceOfAction placeOfAction;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final PlaceOfActionResource placeOfActionResource = new PlaceOfActionResource(placeOfActionRepository);
        this.restPlaceOfActionMockMvc = MockMvcBuilders.standaloneSetup(placeOfActionResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static PlaceOfAction createEntity(EntityManager em) {
        PlaceOfAction placeOfAction = new PlaceOfAction()
            .street(DEFAULT_STREET)
            .houseNumber(DEFAULT_HOUSE_NUMBER)
            .city(DEFAULT_CITY)
            .addition(DEFAULT_ADDITION);
        return placeOfAction;
    }

    @Before
    public void initTest() {
        placeOfAction = createEntity(em);
    }

    @Test
    @Transactional
    public void createPlaceOfAction() throws Exception {
        int databaseSizeBeforeCreate = placeOfActionRepository.findAll().size();

        // Create the PlaceOfAction
        restPlaceOfActionMockMvc.perform(post("/api/place-of-actions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(placeOfAction)))
            .andExpect(status().isCreated());

        // Validate the PlaceOfAction in the database
        List<PlaceOfAction> placeOfActionList = placeOfActionRepository.findAll();
        assertThat(placeOfActionList).hasSize(databaseSizeBeforeCreate + 1);
        PlaceOfAction testPlaceOfAction = placeOfActionList.get(placeOfActionList.size() - 1);
        assertThat(testPlaceOfAction.getStreet()).isEqualTo(DEFAULT_STREET);
        assertThat(testPlaceOfAction.getHouseNumber()).isEqualTo(DEFAULT_HOUSE_NUMBER);
        assertThat(testPlaceOfAction.getCity()).isEqualTo(DEFAULT_CITY);
        assertThat(testPlaceOfAction.getAddition()).isEqualTo(DEFAULT_ADDITION);
    }

    @Test
    @Transactional
    public void createPlaceOfActionWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = placeOfActionRepository.findAll().size();

        // Create the PlaceOfAction with an existing ID
        placeOfAction.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restPlaceOfActionMockMvc.perform(post("/api/place-of-actions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(placeOfAction)))
            .andExpect(status().isBadRequest());

        // Validate the PlaceOfAction in the database
        List<PlaceOfAction> placeOfActionList = placeOfActionRepository.findAll();
        assertThat(placeOfActionList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllPlaceOfActions() throws Exception {
        // Initialize the database
        placeOfActionRepository.saveAndFlush(placeOfAction);

        // Get all the placeOfActionList
        restPlaceOfActionMockMvc.perform(get("/api/place-of-actions?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(placeOfAction.getId().intValue())))
            .andExpect(jsonPath("$.[*].street").value(hasItem(DEFAULT_STREET.toString())))
            .andExpect(jsonPath("$.[*].houseNumber").value(hasItem(DEFAULT_HOUSE_NUMBER.toString())))
            .andExpect(jsonPath("$.[*].city").value(hasItem(DEFAULT_CITY.toString())))
            .andExpect(jsonPath("$.[*].addition").value(hasItem(DEFAULT_ADDITION.toString())));
    }
    
    @Test
    @Transactional
    public void getPlaceOfAction() throws Exception {
        // Initialize the database
        placeOfActionRepository.saveAndFlush(placeOfAction);

        // Get the placeOfAction
        restPlaceOfActionMockMvc.perform(get("/api/place-of-actions/{id}", placeOfAction.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(placeOfAction.getId().intValue()))
            .andExpect(jsonPath("$.street").value(DEFAULT_STREET.toString()))
            .andExpect(jsonPath("$.houseNumber").value(DEFAULT_HOUSE_NUMBER.toString()))
            .andExpect(jsonPath("$.city").value(DEFAULT_CITY.toString()))
            .andExpect(jsonPath("$.addition").value(DEFAULT_ADDITION.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingPlaceOfAction() throws Exception {
        // Get the placeOfAction
        restPlaceOfActionMockMvc.perform(get("/api/place-of-actions/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updatePlaceOfAction() throws Exception {
        // Initialize the database
        placeOfActionRepository.saveAndFlush(placeOfAction);

        int databaseSizeBeforeUpdate = placeOfActionRepository.findAll().size();

        // Update the placeOfAction
        PlaceOfAction updatedPlaceOfAction = placeOfActionRepository.findById(placeOfAction.getId()).get();
        // Disconnect from session so that the updates on updatedPlaceOfAction are not directly saved in db
        em.detach(updatedPlaceOfAction);
        updatedPlaceOfAction
            .street(UPDATED_STREET)
            .houseNumber(UPDATED_HOUSE_NUMBER)
            .city(UPDATED_CITY)
            .addition(UPDATED_ADDITION);

        restPlaceOfActionMockMvc.perform(put("/api/place-of-actions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedPlaceOfAction)))
            .andExpect(status().isOk());

        // Validate the PlaceOfAction in the database
        List<PlaceOfAction> placeOfActionList = placeOfActionRepository.findAll();
        assertThat(placeOfActionList).hasSize(databaseSizeBeforeUpdate);
        PlaceOfAction testPlaceOfAction = placeOfActionList.get(placeOfActionList.size() - 1);
        assertThat(testPlaceOfAction.getStreet()).isEqualTo(UPDATED_STREET);
        assertThat(testPlaceOfAction.getHouseNumber()).isEqualTo(UPDATED_HOUSE_NUMBER);
        assertThat(testPlaceOfAction.getCity()).isEqualTo(UPDATED_CITY);
        assertThat(testPlaceOfAction.getAddition()).isEqualTo(UPDATED_ADDITION);
    }

    @Test
    @Transactional
    public void updateNonExistingPlaceOfAction() throws Exception {
        int databaseSizeBeforeUpdate = placeOfActionRepository.findAll().size();

        // Create the PlaceOfAction

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restPlaceOfActionMockMvc.perform(put("/api/place-of-actions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(placeOfAction)))
            .andExpect(status().isBadRequest());

        // Validate the PlaceOfAction in the database
        List<PlaceOfAction> placeOfActionList = placeOfActionRepository.findAll();
        assertThat(placeOfActionList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deletePlaceOfAction() throws Exception {
        // Initialize the database
        placeOfActionRepository.saveAndFlush(placeOfAction);

        int databaseSizeBeforeDelete = placeOfActionRepository.findAll().size();

        // Get the placeOfAction
        restPlaceOfActionMockMvc.perform(delete("/api/place-of-actions/{id}", placeOfAction.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<PlaceOfAction> placeOfActionList = placeOfActionRepository.findAll();
        assertThat(placeOfActionList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(PlaceOfAction.class);
        PlaceOfAction placeOfAction1 = new PlaceOfAction();
        placeOfAction1.setId(1L);
        PlaceOfAction placeOfAction2 = new PlaceOfAction();
        placeOfAction2.setId(placeOfAction1.getId());
        assertThat(placeOfAction1).isEqualTo(placeOfAction2);
        placeOfAction2.setId(2L);
        assertThat(placeOfAction1).isNotEqualTo(placeOfAction2);
        placeOfAction1.setId(null);
        assertThat(placeOfAction1).isNotEqualTo(placeOfAction2);
    }
}
