package com.datapath.persistence.repositories;

import com.datapath.persistence.entities.ProcedureType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ProcedureTypeRepository extends JpaRepository<ProcedureType, Long> {

    Optional<ProcedureType> getProcedureTypeByNameEn(String name);
}
