package de.leif.ffw.datacenter.web.rest;

import com.codahale.metrics.annotation.Timed;
import de.leif.ffw.datacenter.domain.GeoPosition;
import de.leif.ffw.datacenter.repository.GeoPositionRepository;
import de.leif.ffw.datacenter.web.rest.errors.BadRequestAlertException;
import de.leif.ffw.datacenter.web.rest.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

/**
 * REST controller for managing GeoPosition.
 */
@RestController
@RequestMapping("/api")
public class GeoPositionResource {

    private final Logger log = LoggerFactory.getLogger(GeoPositionResource.class);

    private static final String ENTITY_NAME = "geoPosition";

    private final GeoPositionRepository geoPositionRepository;

    public GeoPositionResource(GeoPositionRepository geoPositionRepository) {
        this.geoPositionRepository = geoPositionRepository;
    }

    /**
     * POST  /geo-positions : Create a new geoPosition.
     *
     * @param geoPosition the geoPosition to create
     * @return the ResponseEntity with status 201 (Created) and with body the new geoPosition, or with status 400 (Bad Request) if the geoPosition has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/geo-positions")
    @Timed
    public ResponseEntity<GeoPosition> createGeoPosition(@Valid @RequestBody GeoPosition geoPosition) throws URISyntaxException {
        log.debug("REST request to save GeoPosition : {}", geoPosition);
        if (geoPosition.getId() != null) {
            throw new BadRequestAlertException("A new geoPosition cannot already have an ID", ENTITY_NAME, "idexists");
        }
        GeoPosition result = geoPositionRepository.save(geoPosition);
        return ResponseEntity.created(new URI("/api/geo-positions/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /geo-positions : Updates an existing geoPosition.
     *
     * @param geoPosition the geoPosition to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated geoPosition,
     * or with status 400 (Bad Request) if the geoPosition is not valid,
     * or with status 500 (Internal Server Error) if the geoPosition couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/geo-positions")
    @Timed
    public ResponseEntity<GeoPosition> updateGeoPosition(@Valid @RequestBody GeoPosition geoPosition) throws URISyntaxException {
        log.debug("REST request to update GeoPosition : {}", geoPosition);
        if (geoPosition.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        GeoPosition result = geoPositionRepository.save(geoPosition);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, geoPosition.getId().toString()))
            .body(result);
    }

    /**
     * GET  /geo-positions : get all the geoPositions.
     *
     * @param filter the filter of the request
     * @return the ResponseEntity with status 200 (OK) and the list of geoPositions in body
     */
    @GetMapping("/geo-positions")
    @Timed
    public List<GeoPosition> getAllGeoPositions(@RequestParam(required = false) String filter) {
        if ("placeofaction-is-null".equals(filter)) {
            log.debug("REST request to get all GeoPositions where placeOfAction is null");
            return StreamSupport
                .stream(geoPositionRepository.findAll().spliterator(), false)
                .filter(geoPosition -> geoPosition.getPlaceOfAction() == null)
                .collect(Collectors.toList());
        }
        log.debug("REST request to get all GeoPositions");
        return geoPositionRepository.findAll();
    }

    /**
     * GET  /geo-positions/:id : get the "id" geoPosition.
     *
     * @param id the id of the geoPosition to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the geoPosition, or with status 404 (Not Found)
     */
    @GetMapping("/geo-positions/{id}")
    @Timed
    public ResponseEntity<GeoPosition> getGeoPosition(@PathVariable Long id) {
        log.debug("REST request to get GeoPosition : {}", id);
        Optional<GeoPosition> geoPosition = geoPositionRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(geoPosition);
    }

    /**
     * DELETE  /geo-positions/:id : delete the "id" geoPosition.
     *
     * @param id the id of the geoPosition to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/geo-positions/{id}")
    @Timed
    public ResponseEntity<Void> deleteGeoPosition(@PathVariable Long id) {
        log.debug("REST request to delete GeoPosition : {}", id);

        geoPositionRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
