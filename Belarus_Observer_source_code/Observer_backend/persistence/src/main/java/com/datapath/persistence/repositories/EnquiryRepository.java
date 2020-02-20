package com.datapath.persistence.repositories;

import com.datapath.persistence.entities.Enquiry;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.time.OffsetDateTime;
import java.util.List;

public interface EnquiryRepository extends JpaRepository<Enquiry, Long> {
    @Query(value = "select max(t.date) from Tender t")
    OffsetDateTime getMaxDate();


    @Query(value = "select count(*) from enquiry where date>=?1 and date <=?2", nativeQuery = true)
    Long getEnquiriesCount(OffsetDateTime startDate, OffsetDateTime endDate);

    @Query(value = "select to_char(date, 'YYYY-MM-DD') d, count(*) from enquiry where date>=?1 and date <=?2 group by d",
            nativeQuery = true)
    List<Object[]> getEnquiriesCountByDates(OffsetDateTime startDate, OffsetDateTime endDate);

}
