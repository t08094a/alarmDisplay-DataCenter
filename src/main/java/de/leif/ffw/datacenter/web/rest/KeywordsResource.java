package de.leif.ffw.datacenter.web.rest;

import com.codahale.metrics.annotation.Timed;
import de.leif.ffw.datacenter.domain.Keywords;
import de.leif.ffw.datacenter.repository.KeywordsRepository;
import de.leif.ffw.datacenter.web.rest.errors.BadRequestAlertException;
import de.leif.ffw.datacenter.web.rest.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

/**
 * REST controller for managing Keywords.
 */
@RestController
@RequestMapping("/api")
public class KeywordsResource {

    private final Logger log = LoggerFactory.getLogger(KeywordsResource.class);

    private static final String ENTITY_NAME = "keywords";

    private final KeywordsRepository keywordsRepository;

    public KeywordsResource(KeywordsRepository keywordsRepository) {
        this.keywordsRepository = keywordsRepository;
    }

    /**
     * POST  /keywords : Create a new keywords.
     *
     * @param keywords the keywords to create
     * @return the ResponseEntity with status 201 (Created) and with body the new keywords, or with status 400 (Bad Request) if the keywords has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/keywords")
    @Timed
    public ResponseEntity<Keywords> createKeywords(@RequestBody Keywords keywords) throws URISyntaxException {
        log.debug("REST request to save Keywords : {}", keywords);
        if (keywords.getId() != null) {
            throw new BadRequestAlertException("A new keywords cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Keywords result = keywordsRepository.save(keywords);
        return ResponseEntity.created(new URI("/api/keywords/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /keywords : Updates an existing keywords.
     *
     * @param keywords the keywords to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated keywords,
     * or with status 400 (Bad Request) if the keywords is not valid,
     * or with status 500 (Internal Server Error) if the keywords couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/keywords")
    @Timed
    public ResponseEntity<Keywords> updateKeywords(@RequestBody Keywords keywords) throws URISyntaxException {
        log.debug("REST request to update Keywords : {}", keywords);
        if (keywords.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Keywords result = keywordsRepository.save(keywords);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, keywords.getId().toString()))
            .body(result);
    }

    /**
     * GET  /keywords : get all the keywords.
     *
     * @param filter the filter of the request
     * @return the ResponseEntity with status 200 (OK) and the list of keywords in body
     */
    @GetMapping("/keywords")
    @Timed
    public List<Keywords> getAllKeywords(@RequestParam(required = false) String filter) {
        if ("alarminfo-is-null".equals(filter)) {
            log.debug("REST request to get all Keywordss where alarmInfo is null");
            return StreamSupport
                .stream(keywordsRepository.findAll().spliterator(), false)
                .filter(keywords -> keywords.getAlarmInfo() == null)
                .collect(Collectors.toList());
        }
        log.debug("REST request to get all Keywords");
        return keywordsRepository.findAll();
    }

    /**
     * GET  /keywords/:id : get the "id" keywords.
     *
     * @param id the id of the keywords to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the keywords, or with status 404 (Not Found)
     */
    @GetMapping("/keywords/{id}")
    @Timed
    public ResponseEntity<Keywords> getKeywords(@PathVariable Long id) {
        log.debug("REST request to get Keywords : {}", id);
        Optional<Keywords> keywords = keywordsRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(keywords);
    }

    /**
     * DELETE  /keywords/:id : delete the "id" keywords.
     *
     * @param id the id of the keywords to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/keywords/{id}")
    @Timed
    public ResponseEntity<Void> deleteKeywords(@PathVariable Long id) {
        log.debug("REST request to delete Keywords : {}", id);

        keywordsRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
