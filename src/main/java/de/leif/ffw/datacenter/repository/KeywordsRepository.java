package de.leif.ffw.datacenter.repository;

import de.leif.ffw.datacenter.domain.Keywords;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the Keywords entity.
 */
@SuppressWarnings("unused")
@Repository
public interface KeywordsRepository extends JpaRepository<Keywords, Long> {

}
