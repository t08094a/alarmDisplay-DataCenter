package de.leif.ffw.datacenter.repository;

import de.leif.ffw.datacenter.domain.GeoPosition;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the GeoPosition entity.
 */
@SuppressWarnings("unused")
@Repository
public interface GeoPositionRepository extends JpaRepository<GeoPosition, Long> {

}
