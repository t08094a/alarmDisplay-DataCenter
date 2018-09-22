package de.leif.ffw.datacenter.repository;

import de.leif.ffw.datacenter.domain.CommonInfo;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

/**
 * Spring Data MongoDB repository for the CommonInfo entity.
 */
@SuppressWarnings("unused")
@Repository
public interface CommonInfoRepository extends MongoRepository<CommonInfo, String> {

}
