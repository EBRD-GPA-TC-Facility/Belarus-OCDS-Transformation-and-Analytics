package com.datapath.persistence.repositories;

import com.datapath.persistence.entities.Lot;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.OffsetDateTime;
import java.util.List;

@Repository
public interface LotRepository extends JpaRepository<Lot, Long> {


    @Query(value = "" +
            "select (sum(case when lot.status = 'complete' then 1 end) :::: DOUBLE PRECISION / count(*)) * 100\n" +
            "from tender join lot on tender.id = lot.tender_id\n" +
            "where tender.date_published >= ?1 and tender.date_published<= ?2\n", nativeQuery = true)
    Double getShareOfComplete(OffsetDateTime startDate, OffsetDateTime endDate);

    @Query(value = "" +
            "select date_trunc('month', tender.date_published) d,\n" +
            "       (sum(case when lot.status = 'complete' then 1 end) :::: DOUBLE PRECISION / count(*)) * 100\n" +
            "from tender join lot on tender.id = lot.tender_id\n" +
            "where tender.date_published >= ?1 and tender.date_published<= ?2\n" +
            "group by d", nativeQuery = true)
    List<Object[]> getShareOfCompleteByDate(OffsetDateTime startDate, OffsetDateTime endDate);


    @Query(value = "select count(lot_id)\n" +
            "from award\n" +
            "       join award_item a on award.id = a.award_id\n" +
            "       join lot l on a.related_lot = l.id\n" +
            "where award.date >= ?1\n" +
            "  and award.date<= ?2\n" +
            "  and l.status = 'complete'", nativeQuery = true)
    Long getCompleteLotsCount(OffsetDateTime startDate, OffsetDateTime endDate);

    @Query(value = "select to_char(award.date, 'YYYY-MM-DD') d, count(lot_id)\n" +
            "from award\n" +
            "       join award_item a on award.id = a.award_id\n" +
            "       join lot l on a.related_lot = l.id\n" +
            "where award.date >= ?1\n" +
            "  and award.date<= ?2\n" +
            "  and l.status = 'complete'" +
            "group by d", nativeQuery = true)
    List<Object[]> getCompleteLotsCountByDate(OffsetDateTime startDate, OffsetDateTime endDate);

    @Query(value = "select count(lot.id)\n" +
            "from related_process\n" +
            "       join tender t on related_process.tender_id = t.id\n" +
            "       join lot on t.id = lot.tender_id\n" +
            "where t.date_published>=?1 and t.date_published<=?2", nativeQuery = true)
    Long getLotsOfTendersWithRelatedProcess(OffsetDateTime startDate, OffsetDateTime endDate);

    @Query(value = "select count(lot.id)\n" +
            "from related_process\n" +
            "       join tender t on related_process.related_process_tender_id = t.id\n" +
            "       join lot on t.id = lot.tender_id\n" +
            "where t.date_published>=?1 and t.date_published<=?2", nativeQuery = true)
    Long getLotsOfRelatedProcess(OffsetDateTime startDate, OffsetDateTime endDate);
}
