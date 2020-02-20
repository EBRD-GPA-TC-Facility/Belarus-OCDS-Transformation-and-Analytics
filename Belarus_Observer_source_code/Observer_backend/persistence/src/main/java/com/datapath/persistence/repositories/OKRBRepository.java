package com.datapath.persistence.repositories;

import com.datapath.persistence.entities.OKRB;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

public interface OKRBRepository extends JpaRepository<OKRB, Long> {

    @Query(value = "select o from OKRB o where function('replace', o.code, '.', '') = ?1")
    Optional<OKRB> findbyClearCodeEquals(String code);
}
