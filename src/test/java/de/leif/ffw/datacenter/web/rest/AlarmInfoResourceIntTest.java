package de.leif.ffw.datacenter.web.rest;

import de.leif.ffw.datacenter.DataCenterApp;

import de.leif.ffw.datacenter.domain.AlarmInfo;
import de.leif.ffw.datacenter.repository.AlarmInfoRepository;
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
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.List;


import static de.leif.ffw.datacenter.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the AlarmInfoResource REST controller.
 *
 * @see AlarmInfoResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = DataCenterApp.class)
public class AlarmInfoResourceIntTest {

    private static final Instant DEFAULT_TIME = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_TIME = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final Integer DEFAULT_PRIORITY = 1;
    private static final Integer UPDATED_PRIORITY = 2;

    private static final String DEFAULT_COMMENT = "AAAAAAAAAA";
    private static final String UPDATED_COMMENT = "BBBBBBBBBB";

    @Autowired
    private AlarmInfoRepository alarmInfoRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restAlarmInfoMockMvc;

    private AlarmInfo alarmInfo;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final AlarmInfoResource alarmInfoResource = new AlarmInfoResource(alarmInfoRepository);
        this.restAlarmInfoMockMvc = MockMvcBuilders.standaloneSetup(alarmInfoResource)
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
    public static AlarmInfo createEntity(EntityManager em) {
        AlarmInfo alarmInfo = new AlarmInfo()
            .time(DEFAULT_TIME)
            .priority(DEFAULT_PRIORITY)
            .comment(DEFAULT_COMMENT);
        return alarmInfo;
    }

    @Before
    public void initTest() {
        alarmInfo = createEntity(em);
    }

    @Test
    @Transactional
    public void createAlarmInfo() throws Exception {
        int databaseSizeBeforeCreate = alarmInfoRepository.findAll().size();

        // Create the AlarmInfo
        restAlarmInfoMockMvc.perform(post("/api/alarm-infos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(alarmInfo)))
            .andExpect(status().isCreated());

        // Validate the AlarmInfo in the database
        List<AlarmInfo> alarmInfoList = alarmInfoRepository.findAll();
        assertThat(alarmInfoList).hasSize(databaseSizeBeforeCreate + 1);
        AlarmInfo testAlarmInfo = alarmInfoList.get(alarmInfoList.size() - 1);
        assertThat(testAlarmInfo.getTime()).isEqualTo(DEFAULT_TIME);
        assertThat(testAlarmInfo.getPriority()).isEqualTo(DEFAULT_PRIORITY);
        assertThat(testAlarmInfo.getComment()).isEqualTo(DEFAULT_COMMENT);
    }

    @Test
    @Transactional
    public void createAlarmInfoWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = alarmInfoRepository.findAll().size();

        // Create the AlarmInfo with an existing ID
        alarmInfo.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restAlarmInfoMockMvc.perform(post("/api/alarm-infos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(alarmInfo)))
            .andExpect(status().isBadRequest());

        // Validate the AlarmInfo in the database
        List<AlarmInfo> alarmInfoList = alarmInfoRepository.findAll();
        assertThat(alarmInfoList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkTimeIsRequired() throws Exception {
        int databaseSizeBeforeTest = alarmInfoRepository.findAll().size();
        // set the field null
        alarmInfo.setTime(null);

        // Create the AlarmInfo, which fails.

        restAlarmInfoMockMvc.perform(post("/api/alarm-infos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(alarmInfo)))
            .andExpect(status().isBadRequest());

        List<AlarmInfo> alarmInfoList = alarmInfoRepository.findAll();
        assertThat(alarmInfoList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkPriorityIsRequired() throws Exception {
        int databaseSizeBeforeTest = alarmInfoRepository.findAll().size();
        // set the field null
        alarmInfo.setPriority(null);

        // Create the AlarmInfo, which fails.

        restAlarmInfoMockMvc.perform(post("/api/alarm-infos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(alarmInfo)))
            .andExpect(status().isBadRequest());

        List<AlarmInfo> alarmInfoList = alarmInfoRepository.findAll();
        assertThat(alarmInfoList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllAlarmInfos() throws Exception {
        // Initialize the database
        alarmInfoRepository.saveAndFlush(alarmInfo);

        // Get all the alarmInfoList
        restAlarmInfoMockMvc.perform(get("/api/alarm-infos?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(alarmInfo.getId().intValue())))
            .andExpect(jsonPath("$.[*].time").value(hasItem(DEFAULT_TIME.toString())))
            .andExpect(jsonPath("$.[*].priority").value(hasItem(DEFAULT_PRIORITY)))
            .andExpect(jsonPath("$.[*].comment").value(hasItem(DEFAULT_COMMENT.toString())));
    }
    
    @Test
    @Transactional
    public void getAlarmInfo() throws Exception {
        // Initialize the database
        alarmInfoRepository.saveAndFlush(alarmInfo);

        // Get the alarmInfo
        restAlarmInfoMockMvc.perform(get("/api/alarm-infos/{id}", alarmInfo.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(alarmInfo.getId().intValue()))
            .andExpect(jsonPath("$.time").value(DEFAULT_TIME.toString()))
            .andExpect(jsonPath("$.priority").value(DEFAULT_PRIORITY))
            .andExpect(jsonPath("$.comment").value(DEFAULT_COMMENT.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingAlarmInfo() throws Exception {
        // Get the alarmInfo
        restAlarmInfoMockMvc.perform(get("/api/alarm-infos/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateAlarmInfo() throws Exception {
        // Initialize the database
        alarmInfoRepository.saveAndFlush(alarmInfo);

        int databaseSizeBeforeUpdate = alarmInfoRepository.findAll().size();

        // Update the alarmInfo
        AlarmInfo updatedAlarmInfo = alarmInfoRepository.findById(alarmInfo.getId()).get();
        // Disconnect from session so that the updates on updatedAlarmInfo are not directly saved in db
        em.detach(updatedAlarmInfo);
        updatedAlarmInfo
            .time(UPDATED_TIME)
            .priority(UPDATED_PRIORITY)
            .comment(UPDATED_COMMENT);

        restAlarmInfoMockMvc.perform(put("/api/alarm-infos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedAlarmInfo)))
            .andExpect(status().isOk());

        // Validate the AlarmInfo in the database
        List<AlarmInfo> alarmInfoList = alarmInfoRepository.findAll();
        assertThat(alarmInfoList).hasSize(databaseSizeBeforeUpdate);
        AlarmInfo testAlarmInfo = alarmInfoList.get(alarmInfoList.size() - 1);
        assertThat(testAlarmInfo.getTime()).isEqualTo(UPDATED_TIME);
        assertThat(testAlarmInfo.getPriority()).isEqualTo(UPDATED_PRIORITY);
        assertThat(testAlarmInfo.getComment()).isEqualTo(UPDATED_COMMENT);
    }

    @Test
    @Transactional
    public void updateNonExistingAlarmInfo() throws Exception {
        int databaseSizeBeforeUpdate = alarmInfoRepository.findAll().size();

        // Create the AlarmInfo

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restAlarmInfoMockMvc.perform(put("/api/alarm-infos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(alarmInfo)))
            .andExpect(status().isBadRequest());

        // Validate the AlarmInfo in the database
        List<AlarmInfo> alarmInfoList = alarmInfoRepository.findAll();
        assertThat(alarmInfoList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteAlarmInfo() throws Exception {
        // Initialize the database
        alarmInfoRepository.saveAndFlush(alarmInfo);

        int databaseSizeBeforeDelete = alarmInfoRepository.findAll().size();

        // Get the alarmInfo
        restAlarmInfoMockMvc.perform(delete("/api/alarm-infos/{id}", alarmInfo.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<AlarmInfo> alarmInfoList = alarmInfoRepository.findAll();
        assertThat(alarmInfoList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(AlarmInfo.class);
        AlarmInfo alarmInfo1 = new AlarmInfo();
        alarmInfo1.setId(1L);
        AlarmInfo alarmInfo2 = new AlarmInfo();
        alarmInfo2.setId(alarmInfo1.getId());
        assertThat(alarmInfo1).isEqualTo(alarmInfo2);
        alarmInfo2.setId(2L);
        assertThat(alarmInfo1).isNotEqualTo(alarmInfo2);
        alarmInfo1.setId(null);
        assertThat(alarmInfo1).isNotEqualTo(alarmInfo2);
    }
}
