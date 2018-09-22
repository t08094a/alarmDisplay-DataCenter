package de.leif.ffw.datacenter.repository;

import de.leif.ffw.datacenter.domain.AlarmInfo;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the AlarmInfo entity.
 */
@SuppressWarnings("unused")
@Repository
public interface AlarmInfoRepository extends JpaRepository<AlarmInfo, Long> {

}
