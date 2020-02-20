package com.datapath.persistence.repositories;

import com.datapath.persistence.entities.Bid;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BidRepository extends JpaRepository<Bid, Long> {

}
