package de.leif.ffw.datacenter.repository;

import de.leif.ffw.datacenter.domain.PlaceOfAction;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the PlaceOfAction entity.
 */
@SuppressWarnings("unused")
@Repository
public interface PlaceOfActionRepository extends JpaRepository<PlaceOfAction, Long> {

}
