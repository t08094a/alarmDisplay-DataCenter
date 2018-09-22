package de.leif.ffw.datacenter.repository;

import de.leif.ffw.datacenter.domain.AlarmInfo;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

/**
 * Spring Data MongoDB repository for the AlarmInfo entity.
 */
@SuppressWarnings("unused")
@Repository
public interface AlarmInfoRepository extends MongoRepository<AlarmInfo, String> {

}
