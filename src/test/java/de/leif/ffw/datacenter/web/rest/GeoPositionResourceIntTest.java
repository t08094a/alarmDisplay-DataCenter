package de.leif.ffw.datacenter.web.rest;

import de.leif.ffw.datacenter.DataCenterApp;

import de.leif.ffw.datacenter.domain.GeoPosition;
import de.leif.ffw.datacenter.repository.GeoPositionRepository;
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
 * Test class for the GeoPositionResource REST controller.
 *
 * @see GeoPositionResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = DataCenterApp.class)
public class GeoPositionResourceIntTest {

    private static final String DEFAULT_X = "AAAAAAAAAA";
    private static final String UPDATED_X = "BBBBBBBBBB";

    private static final String DEFAULT_Y = "AAAAAAAAAA";
    private static final String UPDATED_Y = "BBBBBBBBBB";

    @Autowired
    private GeoPositionRepository geoPositionRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restGeoPositionMockMvc;

    private GeoPosition geoPosition;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final GeoPositionResource geoPositionResource = new GeoPositionResource(geoPositionRepository);
        this.restGeoPositionMockMvc = MockMvcBuilders.standaloneSetup(geoPositionResource)
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
    public static GeoPosition createEntity(EntityManager em) {
        GeoPosition geoPosition = new GeoPosition()
            .x(DEFAULT_X)
            .y(DEFAULT_Y);
        return geoPosition;
    }

    @Before
    public void initTest() {
        geoPosition = createEntity(em);
    }

    @Test
    @Transactional
    public void createGeoPosition() throws Exception {
        int databaseSizeBeforeCreate = geoPositionRepository.findAll().size();

        // Create the GeoPosition
        restGeoPositionMockMvc.perform(post("/api/geo-positions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(geoPosition)))
            .andExpect(status().isCreated());

        // Validate the GeoPosition in the database
        List<GeoPosition> geoPositionList = geoPositionRepository.findAll();
        assertThat(geoPositionList).hasSize(databaseSizeBeforeCreate + 1);
        GeoPosition testGeoPosition = geoPositionList.get(geoPositionList.size() - 1);
        assertThat(testGeoPosition.getX()).isEqualTo(DEFAULT_X);
        assertThat(testGeoPosition.getY()).isEqualTo(DEFAULT_Y);
    }

    @Test
    @Transactional
    public void createGeoPositionWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = geoPositionRepository.findAll().size();

        // Create the GeoPosition with an existing ID
        geoPosition.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restGeoPositionMockMvc.perform(post("/api/geo-positions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(geoPosition)))
            .andExpect(status().isBadRequest());

        // Validate the GeoPosition in the database
        List<GeoPosition> geoPositionList = geoPositionRepository.findAll();
        assertThat(geoPositionList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkXIsRequired() throws Exception {
        int databaseSizeBeforeTest = geoPositionRepository.findAll().size();
        // set the field null
        geoPosition.setX(null);

        // Create the GeoPosition, which fails.

        restGeoPositionMockMvc.perform(post("/api/geo-positions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(geoPosition)))
            .andExpect(status().isBadRequest());

        List<GeoPosition> geoPositionList = geoPositionRepository.findAll();
        assertThat(geoPositionList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkYIsRequired() throws Exception {
        int databaseSizeBeforeTest = geoPositionRepository.findAll().size();
        // set the field null
        geoPosition.setY(null);

        // Create the GeoPosition, which fails.

        restGeoPositionMockMvc.perform(post("/api/geo-positions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(geoPosition)))
            .andExpect(status().isBadRequest());

        List<GeoPosition> geoPositionList = geoPositionRepository.findAll();
        assertThat(geoPositionList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllGeoPositions() throws Exception {
        // Initialize the database
        geoPositionRepository.saveAndFlush(geoPosition);

        // Get all the geoPositionList
        restGeoPositionMockMvc.perform(get("/api/geo-positions?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(geoPosition.getId().intValue())))
            .andExpect(jsonPath("$.[*].x").value(hasItem(DEFAULT_X.toString())))
            .andExpect(jsonPath("$.[*].y").value(hasItem(DEFAULT_Y.toString())));
    }
    
    @Test
    @Transactional
    public void getGeoPosition() throws Exception {
        // Initialize the database
        geoPositionRepository.saveAndFlush(geoPosition);

        // Get the geoPosition
        restGeoPositionMockMvc.perform(get("/api/geo-positions/{id}", geoPosition.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(geoPosition.getId().intValue()))
            .andExpect(jsonPath("$.x").value(DEFAULT_X.toString()))
            .andExpect(jsonPath("$.y").value(DEFAULT_Y.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingGeoPosition() throws Exception {
        // Get the geoPosition
        restGeoPositionMockMvc.perform(get("/api/geo-positions/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateGeoPosition() throws Exception {
        // Initialize the database
        geoPositionRepository.saveAndFlush(geoPosition);

        int databaseSizeBeforeUpdate = geoPositionRepository.findAll().size();

        // Update the geoPosition
        GeoPosition updatedGeoPosition = geoPositionRepository.findById(geoPosition.getId()).get();
        // Disconnect from session so that the updates on updatedGeoPosition are not directly saved in db
        em.detach(updatedGeoPosition);
        updatedGeoPosition
            .x(UPDATED_X)
            .y(UPDATED_Y);

        restGeoPositionMockMvc.perform(put("/api/geo-positions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedGeoPosition)))
            .andExpect(status().isOk());

        // Validate the GeoPosition in the database
        List<GeoPosition> geoPositionList = geoPositionRepository.findAll();
        assertThat(geoPositionList).hasSize(databaseSizeBeforeUpdate);
        GeoPosition testGeoPosition = geoPositionList.get(geoPositionList.size() - 1);
        assertThat(testGeoPosition.getX()).isEqualTo(UPDATED_X);
        assertThat(testGeoPosition.getY()).isEqualTo(UPDATED_Y);
    }

    @Test
    @Transactional
    public void updateNonExistingGeoPosition() throws Exception {
        int databaseSizeBeforeUpdate = geoPositionRepository.findAll().size();

        // Create the GeoPosition

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restGeoPositionMockMvc.perform(put("/api/geo-positions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(geoPosition)))
            .andExpect(status().isBadRequest());

        // Validate the GeoPosition in the database
        List<GeoPosition> geoPositionList = geoPositionRepository.findAll();
        assertThat(geoPositionList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteGeoPosition() throws Exception {
        // Initialize the database
        geoPositionRepository.saveAndFlush(geoPosition);

        int databaseSizeBeforeDelete = geoPositionRepository.findAll().size();

        // Get the geoPosition
        restGeoPositionMockMvc.perform(delete("/api/geo-positions/{id}", geoPosition.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<GeoPosition> geoPositionList = geoPositionRepository.findAll();
        assertThat(geoPositionList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(GeoPosition.class);
        GeoPosition geoPosition1 = new GeoPosition();
        geoPosition1.setId(1L);
        GeoPosition geoPosition2 = new GeoPosition();
        geoPosition2.setId(geoPosition1.getId());
        assertThat(geoPosition1).isEqualTo(geoPosition2);
        geoPosition2.setId(2L);
        assertThat(geoPosition1).isNotEqualTo(geoPosition2);
        geoPosition1.setId(null);
        assertThat(geoPosition1).isNotEqualTo(geoPosition2);
    }
}
