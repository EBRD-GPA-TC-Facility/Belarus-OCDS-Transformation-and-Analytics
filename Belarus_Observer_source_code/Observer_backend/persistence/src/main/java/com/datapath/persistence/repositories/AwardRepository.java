package com.datapath.persistence.repositories;

import com.datapath.persistence.entities.Award;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AwardRepository extends JpaRepository<Award, Long> {

}
