package de.leif.ffw.datacenter.web.rest;

import com.codahale.metrics.annotation.Timed;
import de.leif.ffw.datacenter.domain.PlaceOfAction;
import de.leif.ffw.datacenter.repository.PlaceOfActionRepository;
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
 * REST controller for managing PlaceOfAction.
 */
@RestController
@RequestMapping("/api")
public class PlaceOfActionResource {

    private final Logger log = LoggerFactory.getLogger(PlaceOfActionResource.class);

    private static final String ENTITY_NAME = "placeOfAction";

    private final PlaceOfActionRepository placeOfActionRepository;

    public PlaceOfActionResource(PlaceOfActionRepository placeOfActionRepository) {
        this.placeOfActionRepository = placeOfActionRepository;
    }

    /**
     * POST  /place-of-actions : Create a new placeOfAction.
     *
     * @param placeOfAction the placeOfAction to create
     * @return the ResponseEntity with status 201 (Created) and with body the new placeOfAction, or with status 400 (Bad Request) if the placeOfAction has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/place-of-actions")
    @Timed
    public ResponseEntity<PlaceOfAction> createPlaceOfAction(@RequestBody PlaceOfAction placeOfAction) throws URISyntaxException {
        log.debug("REST request to save PlaceOfAction : {}", placeOfAction);
        if (placeOfAction.getId() != null) {
            throw new BadRequestAlertException("A new placeOfAction cannot already have an ID", ENTITY_NAME, "idexists");
        }
        PlaceOfAction result = placeOfActionRepository.save(placeOfAction);
        return ResponseEntity.created(new URI("/api/place-of-actions/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /place-of-actions : Updates an existing placeOfAction.
     *
     * @param placeOfAction the placeOfAction to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated placeOfAction,
     * or with status 400 (Bad Request) if the placeOfAction is not valid,
     * or with status 500 (Internal Server Error) if the placeOfAction couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/place-of-actions")
    @Timed
    public ResponseEntity<PlaceOfAction> updatePlaceOfAction(@RequestBody PlaceOfAction placeOfAction) throws URISyntaxException {
        log.debug("REST request to update PlaceOfAction : {}", placeOfAction);
        if (placeOfAction.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        PlaceOfAction result = placeOfActionRepository.save(placeOfAction);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, placeOfAction.getId().toString()))
            .body(result);
    }

    /**
     * GET  /place-of-actions : get all the placeOfActions.
     *
     * @param filter the filter of the request
     * @return the ResponseEntity with status 200 (OK) and the list of placeOfActions in body
     */
    @GetMapping("/place-of-actions")
    @Timed
    public List<PlaceOfAction> getAllPlaceOfActions(@RequestParam(required = false) String filter) {
        if ("alarminfo-is-null".equals(filter)) {
            log.debug("REST request to get all PlaceOfActions where alarmInfo is null");
            return StreamSupport
                .stream(placeOfActionRepository.findAll().spliterator(), false)
                .filter(placeOfAction -> placeOfAction.getAlarmInfo() == null)
                .collect(Collectors.toList());
        }
        log.debug("REST request to get all PlaceOfActions");
        return placeOfActionRepository.findAll();
    }

    /**
     * GET  /place-of-actions/:id : get the "id" placeOfAction.
     *
     * @param id the id of the placeOfAction to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the placeOfAction, or with status 404 (Not Found)
     */
    @GetMapping("/place-of-actions/{id}")
    @Timed
    public ResponseEntity<PlaceOfAction> getPlaceOfAction(@PathVariable Long id) {
        log.debug("REST request to get PlaceOfAction : {}", id);
        Optional<PlaceOfAction> placeOfAction = placeOfActionRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(placeOfAction);
    }

    /**
     * DELETE  /place-of-actions/:id : delete the "id" placeOfAction.
     *
     * @param id the id of the placeOfAction to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/place-of-actions/{id}")
    @Timed
    public ResponseEntity<Void> deletePlaceOfAction(@PathVariable Long id) {
        log.debug("REST request to delete PlaceOfAction : {}", id);

        placeOfActionRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
