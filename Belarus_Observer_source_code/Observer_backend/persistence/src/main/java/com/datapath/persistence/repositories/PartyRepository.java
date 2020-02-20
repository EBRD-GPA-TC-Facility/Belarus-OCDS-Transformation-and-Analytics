package com.datapath.persistence.repositories;

import com.datapath.persistence.entities.Party;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface PartyRepository extends JpaRepository<Party, Long> {
    Optional<Party> getFirstByOuterIdEquals(String outerId);

    Optional<Party> getFirstByNameEquals(String name);

}
