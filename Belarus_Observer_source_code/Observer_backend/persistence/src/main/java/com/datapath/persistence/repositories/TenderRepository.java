package com.datapath.persistence.repositories;

import com.datapath.persistence.entities.Tender;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.OffsetDateTime;
import java.util.List;
import java.util.Optional;

@Repository
public interface TenderRepository extends JpaRepository<Tender, Long> {

    Optional<Tender> getFirstByProcedureTypeId(Long mwthod);

    @Query(value = "select max(t.date) from Tender t")
    OffsetDateTime getMaxDate();

    @Query(value = "select max(t.datePublished) from Tender t")
    OffsetDateTime getMaxDatePublished();

    Optional<Tender> getFirstByTenderIdEquals(String tenderId);

    @Query(value = "select count(tender.id)::::DOUBLE PRECISION / count(case when procurement_method_details <> 'singleSource' then tender.id end) " +
            "from tender where date_published>=?1 and date_published<=?2\n",
            nativeQuery = true)
    Integer getCompetetiveEveryN(OffsetDateTime startDate, OffsetDateTime endDate);

    @Query(value = "select count(tender.id)::::DOUBLE PRECISION / (27*7)\n" +
            "from tender where date_published>=?1 and date_published<=?2\n",
            nativeQuery = true)
    Double getAvgProceduresPerHour(OffsetDateTime startDate, OffsetDateTime endDate);

    @Query(value = "select count(distinct tender.id)\n" +
            "from tender\n" +
            "       join award a on tender.id = a.tender_id\n" +
            "group by tender.status\n" +
            "having max(a.date) >= ?1\n" +
            "   and max(a.date)<= ?2\n" +
            "   and tender.status = 'complete'",
            nativeQuery = true)
    Long getSuccessfulProceduresCount(OffsetDateTime startDate, OffsetDateTime endDate);

    @Query(value = "select count(distinct l.id) " +
            "from tender " +
            "join lot l on tender.id = l.tender_id " +
            "where tender.date_published >= ?1 and tender.date_published<= ?2 and l.status='active'",
            nativeQuery = true)
    Long getActiveLotsCount(OffsetDateTime startDate, OffsetDateTime endDate);

    @Query(value = "select to_char(date_published, 'YYYY-MM-DD') d, count(distinct l.id) " +
            "from tender " +
            "join lot l on tender.id = l.tender_id " +
            "where tender.date_published >= ?1 and tender.date_published<= ?2 and l.status='active' " +
            "group by d",
            nativeQuery = true)
    List<Object[]> getActiveLotsCountByDate(OffsetDateTime startDate, OffsetDateTime endDate);

    @Query(value = "select  count(distinct lot.id)::::DOUBLE PRECISION /count(distinct tender.id)\n" +
            "from tender\n" +
            "       join lot on tender.id = lot.tender_id\n" +
            "where tender.date_published>=?1 and date_published<=?2",
            nativeQuery = true)
    Double getLotsPerTenderCount(OffsetDateTime startDate, OffsetDateTime endDate);

    @Query(value = "select to_char(date_published, 'YYYY-MM-DD') d, count(distinct lot.id)::::DOUBLE PRECISION /count(distinct tender.id)\n" +
            "from tender\n" +
            "       join lot on tender.id = lot.tender_id\n" +
            "where tender.date_published>=?1 and date_published<=?2 group by d",
            nativeQuery = true)
    List<Object[]> getLotsPerTendersCountByDate(OffsetDateTime startDate, OffsetDateTime endDate);

    @Query(value = "select  count(ti.classification_id)::::DOUBLE PRECISION /count(distinct tender.id)\n" +
            "from tender\n" +
            "       join tender_item ti on tender.id = ti.tender_id\n" +
            "where tender.date_published>=?1 and date_published<=?2",
            nativeQuery = true)
    Double getOKRBPerTenderCount(OffsetDateTime startDate, OffsetDateTime endDate);

    @Query(value = "select to_char(date_published, 'YYYY-MM-DD') d, count(ti.classification_id)::::DOUBLE PRECISION /count(distinct tender.id)\n" +
            "from tender\n" +
            "       join tender_item ti on tender.id = ti.tender_id\n" +
            "where tender.date_published>=?1 and date_published<=?2 group by d",
            nativeQuery = true)
    List<Object[]> getOKRBPerTendersCountByDate(OffsetDateTime startDate, OffsetDateTime endDate);

    @Query(value = "select count(distinct tender.id) from tender " +
            "where tender.date_published >= ?1 and tender.date_published<= ?2 ",
            nativeQuery = true)
    Long getTendersCount(OffsetDateTime startDate, OffsetDateTime endDate);

    @Query(value = "select date_trunc('month', tender.date_published) d, count(distinct tender.id) from tender " +
            "where tender.date_published >= ?1 and tender.date_published<= ?2 group by d",
            nativeQuery = true)
    List<Object[]> getTendersCountByDate(OffsetDateTime startDate, OffsetDateTime endDate);

    @Query(value = "Select count(distinct procuring_entity_id)" +
            " from tender where date_published> ?1 and date_published< ?2", nativeQuery = true)
    Long getProcuringEntityCount(OffsetDateTime startDate, OffsetDateTime endDate);

    @Query(value = "Select to_char(date_published, 'YYYY-MM-DD') d, count(distinct procuring_entity_id)" +
            " from tender where date_published> ?1 and date_published< ?2" +
            " group by d", nativeQuery = true)
    List<Object[]> getProcuringEntityByDatesCount(OffsetDateTime startDate, OffsetDateTime endDate);

    @Query(value = "select count(distinct e.id) enquiries,\n" +
            "       count(distinct case when e.id is not null then e.tender_id end ) tenders_with_enquity,\n" +
            "       count(distinct tender.id) total_tenders\n" +
            "from tender join enquiry e on tender.id = e.tender_id\n" +
            "where tender.date_published>?1\n" +
            "  and tender.date_published<?2 ", nativeQuery = true)
    List<Object[]> getTendersWithEnquiries(OffsetDateTime startDate, OffsetDateTime endDate);

    @Query(value = "select tender.title, procedure_type.name_ru, party.name, tender.description, sum(lot.amount) amount\n" +
            "from tender\n" +
            "       join lot on tender.id = lot.tender_id\n" +
            "       join procedure_type on tender.procedure_type_id = procedure_type.id\n" +
            "       join party on tender.procuring_entity_id = party.id\n" +
            "where tender.date_published>?1 and tender.date_published<?2 " +
            "group by tender.title, procedure_type.name_ru, party.name, tender.description\n" +
            "order by amount desc \n" +
            "limit 1", nativeQuery = true)
    List<Object[]> getTopTender(OffsetDateTime startDate, OffsetDateTime endDate);

    @Query(value = "select count(case when for_small_scale_business then l.id end) for_small , count(case when not for_small_scale_business then l.id end) for_not_small\n" +
            "from tender join lot l on tender.id = l.tender_id\n" +
            "where  tender.date_published>?1 and tender.date_published<?2\n", nativeQuery = true)
    List<Object[]> getLotsForSmallScaleBusiness(OffsetDateTime startDate, OffsetDateTime endDate);

    @Query(value = "select   date_trunc('month', date_published) d, count(case when for_small_scale_business then l.id end) for_small , count(case when not for_small_scale_business then l.id end) for_not_small\n" +
            "from tender join lot l on tender.id = l.tender_id\n" +
            "where  tender.date_published>?1 and tender.date_published<?2\n" +
            "group by d ", nativeQuery = true)
    List<Object[]> getLotsForSmallScaleBusinessByDates(OffsetDateTime startDate, OffsetDateTime endDate);

}
