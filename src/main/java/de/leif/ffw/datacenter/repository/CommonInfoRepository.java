package de.leif.ffw.datacenter.repository;

import de.leif.ffw.datacenter.domain.CommonInfo;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the CommonInfo entity.
 */
@SuppressWarnings("unused")
@Repository
public interface CommonInfoRepository extends JpaRepository<CommonInfo, Long> {

}
