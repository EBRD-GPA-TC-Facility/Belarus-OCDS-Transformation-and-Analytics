package com.datapath.persistence.repositories;

import com.datapath.persistence.entities.Classification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ClassificationRepository extends JpaRepository<Classification, Long> {

    Optional<Classification> getFirstByClassificationIdEquals(String classificationId);




}
