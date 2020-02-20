package com.datapath.persistence.repositories;

import com.datapath.persistence.entities.Contract;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.OffsetDateTime;
import java.util.List;

@Repository
public interface ContractRepository extends JpaRepository<Contract, Long> {


    @Query(value = "select max(c.dateCreated) from Contract c")
    OffsetDateTime getMaxDateCreated();

    @Query(value = "Select count(supplier_id) from contract" +
            " where date_created >= ?1 and date_created<= ?2 ", nativeQuery = true)
    Long getSuppliersCount(OffsetDateTime startDate, OffsetDateTime endDate);

    @Query(value = "select sum(case when item.product_country = 'Беларусь' then 1 end) :::: double precision / count(*) * 100\n" +
            "from contract\n" +
            " join contract_item item on contract.id = item.contract_id" +
            " where date_created >= ?1 and date_created<= ?2", nativeQuery = true)
    Double getShareOfBelarusProducts(OffsetDateTime startDate, OffsetDateTime endDate);

    @Query(value = "select scale, sum(contract.amount) suppliers\n" +
            "      from contract\n" +
            "             join party p on contract.supplier_id = p.id " +
            " where date_created >= ?1 and date_created<= ?2 and scale in ('mini', 'micro', 'medium') " +
            " group by scale ", nativeQuery = true)
    List<Object[]> getSuppliersByScaleCount(OffsetDateTime startDate, OffsetDateTime endDate);

    @Query(value = "Select to_char(date_created, 'YYYY-MM-DD') date, " +
            "count(supplier_id) from contract\n" +
            "where date_created >= ?1 and date_created<= ?2 " +
            " group by date order by date", nativeQuery = true)
    List<Object[]> getSuppliersCountByDate(OffsetDateTime startDate, OffsetDateTime endDate);

    @Query(value = "select count(id) from contract " +
            "where date_created  >= ?1 and date_created <= ?2 ", nativeQuery = true)
    Long getContractsCount(OffsetDateTime startDate, OffsetDateTime endDate);

    @Query(value = "select count(id)::::double precision / count(distinct supplier_id)" +
            "from contract " +
            "where date_created  >= ?1 and date_created <= ?2", nativeQuery = true)
    Double getContractsPerSupplierCount(OffsetDateTime startDate, OffsetDateTime endDate);

    @Query(value = "select to_char(date_created, 'YYYY-MM-DD') date, count(id)::::double precision / count(distinct supplier_id)" +
            "from contract " +
            "where date_created  >= ?1 and date_created <= ?2 " +
            "group by date", nativeQuery = true)
    List<Object[]> getContractsPerSupplierByDatesCount(OffsetDateTime startDate, OffsetDateTime endDate);

    @Query(value = "select date_trunc('month', date_created) date, " +
            " count(distinct buyer_id) buyers, " +
            " sum(amount)::::double precision," +
            " count(id)::::double precision " +
            "from contract " +
            "where date_created  >= ?1 and date_created <= ?2 " +
            "group by date", nativeQuery = true)
    List<Object[]> getContractsPerBuyerByDatesCountAmount(OffsetDateTime startDate, OffsetDateTime endDate);

    @Query(value = "select case when contract_item.position_type = 'goods' then 'Товары' else 'Услуги/Работы' end gsw, count( contract_item.id)" +
            "from contract join contract_item on contract.id = contract_item.contract_id " +
            "where date_created  >= ?1 and date_created <= ?2 and contract_item.position_type <>'undefined'" +
            "group by gsw", nativeQuery = true)
    List<Object[]> getGSWCount(OffsetDateTime startDate, OffsetDateTime endDate);

    @Query(value = "select date_trunc('month', date_created) date, " +
            "case when contract_item.position_type = 'goods' then 'Товары' else 'Услуги/Работы' end gsw, count( contract_item.id)" +
            "from contract join contract_item on contract.id = contract_item.contract_id " +
            "where date_created  >= ?1 and date_created <= ?2 and contract_item.position_type <>'undefined'" +
            "group by date, gsw", nativeQuery = true)
    List<Object[]> getGSWByDatesCount(OffsetDateTime startDate, OffsetDateTime endDate);

    @Query(value = "select count(distinct contract_item.classification_id) classifocation,\n" +
            "       count(distinct contract.buyer_id) buyers\n" +
            "from contract join contract_item on contract.id = contract_item.contract_id\n" +
            "where date_created  >= ?1 and date_created <= ?2", nativeQuery = true)
    List<Object[]> getClassificationBuyerSupplierCount(OffsetDateTime startDate, OffsetDateTime endDate);

    @Query(value = "SELECT to_char(date_created, 'YYYY-MM-DD') d, count(*), " +
            "  extract(dow from date_created) :::: int d_n  from contract" +
            " where date_created  >= ?1 and date_created <= ?2  " +
            "group by d, d_n", nativeQuery = true)
    List<Object[]> getContractsDatesByDayCount(OffsetDateTime startDate, OffsetDateTime endDate);

    @Query(value = "select sum(amount)\n" +
            "from contract\n" +
            "where date_created >= ?1 and date_created <= ?2 ", nativeQuery = true)
    Double getContractsAmount(OffsetDateTime startDate, OffsetDateTime endDate);

    @Query(value = "SELECT to_char(date_created, 'YYYY-MM-DD') d, sum(amount) from contract" +
            " where date_created  >= ?1 and date_created <= ?2 group by d", nativeQuery = true)
    List<Object[]> getContractsAmountDatesByDayAmount(OffsetDateTime startDate, OffsetDateTime endDate);

    @Query(value = "" +
            "select generated_date,\n" +
            "       sum(case when is_competitive then amount else 0 end)     competitive,\n" +
            "       sum(case when not is_competitive then amount else 0 end) uncompetitive, \n" +
            "       extract(dow from generated_date) :::: int  " +
            "from (select generate_series(?1, ?2, '1 day' :::: interval) :::: date generated_date) a\n" +
            "       join contract on a.generated_date = contract.date_created :::: date\n" +
            "group by generated_date", nativeQuery = true)
    List<Object[]> getCompetitivityDatesAmount(OffsetDateTime startDate, OffsetDateTime endDate);

    @Query(value = "SELECT date_trunc('month', date_created) d, sum(amount) from contract" +
            " where date_created  >= ?1 and date_created <= ?2 " +
            " group by d", nativeQuery = true)
    List<Object[]> getContractsAmountDatesByMonthAmount(OffsetDateTime startDate, OffsetDateTime endDate);

    @Query(value = "" +
            "select okrb.name, sum(item.amount) amount\n" +
            "from contract\n" +
            "       join contract_item item on contract.id = item.contract_id\n" +
            "       join classification c2 on item.classification_id = c2.id" +
            "       join okrb on c2.okrb_id = okrb.id " +
            "and contract.date_created >= ?1 " +
            "and contract.date_created <= ?2 " +
            "and item.amount is not null " +
            "group by okrb.name\n" +
            "order by amount desc\n" +
            "limit 5", nativeQuery = true)
    List<Object[]> getTopOKRB(OffsetDateTime startDate, OffsetDateTime endDate);


    @Query(value = "select tender.title, buyer.name buyer, supplier.name supplier, contract.description, sum(contract.amount) amount\n" +
            "from tender\n" +
            "       join contract on tender.id = contract.tender_id\n" +
            "       join party buyer on contract.buyer_id = buyer.id\n" +
            "       join party supplier on contract.supplier_id = supplier.id\n" +
            "where tender.procurement_method_details = 'singleSource'\n" +
            "  and contract.amount is not null\n" +
            "  and contract.date_created>=?1\n" +
            "  and contract.date_created<=?2" +
            " group by tender.title, buyer, supplier, contract.description\n" +
            "order by amount desc " +
            "limit 10", nativeQuery = true)
    List<Object[]> getTopSingleSource(OffsetDateTime startDate, OffsetDateTime endDate);

    @Query(value = "select count(id)::::DOUBLE PRECISION / count(distinct supplier_id)\n" +
            "from contract\n" +
            "where date_created >= ?1\n" +
            "  and date_created <= ?2 ", nativeQuery = true)
    Double getAvgContractCountPerSupplier(OffsetDateTime startDate, OffsetDateTime endDate);

    @Query(value = "select date_trunc('month', date_created) d,  " +
            "count(id)::::DOUBLE PRECISION / count(distinct supplier_id)\n" +
            "from contract\n" +
            "where date_created >= ?1\n" +
            "  and date_created <= ?2 " +
            "GROUP BY d", nativeQuery = true)
    List<Object[]> getAvgContractCountPerSupplierByDates(OffsetDateTime startDate, OffsetDateTime endDate);

    @Query(value = "select count(distinct buyer_id) buyers, count(distinct supplier_id) suppliers from contract " +
            " where date_created >= ?1 and date_created <= ?2 ",
            nativeQuery = true)
    List<Object[]> getBuyersSuppliersCount(OffsetDateTime startDate, OffsetDateTime endDate);

    @Query(value = "select date_trunc('month', date_created) d, " +
            "count(distinct buyer_id) buyers, " +
            "count(distinct supplier_id) " +
            " from contract " +
            " where date_created >= ?1 and date_created <= ?2 " +
            " group by d", nativeQuery = true)
    List<Object[]> getBuyerSupplierDatesCount(OffsetDateTime startDate, OffsetDateTime endDate);

    @Query(value = "select d, procedure_type.name_en, procedure_type.name_ru, sum from (\n" +
            "select date_trunc('month', contract.date_created) d, procurement_method_details, sum(contract.amount)\n" +
            "from contract\n" +
            "where  contract.date_created >= ?1 and contract.date_created <= ?2  and  procurement_method_details <> 'Other'\n" +
            "group by  d, procurement_method_details) a join procedure_type on procurement_method_details =procedure_type.name_en", nativeQuery = true)
    List<Object[]> getProcedureTypesContractsAmount(OffsetDateTime startDate, OffsetDateTime endDate);

    @Query(value = "select contract.is_competitive,  count(contract.id), sum(contract.amount) " +
            "from contract " +
            " where contract.date_created >= ?1 and contract.date_created <= ?2 " +
            " and procurement_method_details <> 'Other' and is_competitive is not null" +
            " group by is_competitive",
            nativeQuery = true)
    List<Object[]> getContractsCompetitivityCountAmount(OffsetDateTime startDate, OffsetDateTime endDate);

    @Query(value = "select date_trunc('month', contract.date_created) d, " +
            " is_competitive, count(contract.id), sum(contract.amount)" +
            " from contract where contract.date_created >= ?1 and contract.date_created <= ?2 " +
            " and procurement_method_details <> 'Other' and" +
            "  is_competitive is not null " +
            "group by d, is_competitive",
            nativeQuery = true)
    List<Object[]> getDatesContractsCompetitivityCountAmount(OffsetDateTime startDate, OffsetDateTime endDate);

    @Query(value = "select sum(amount) from contract " +
            "where contract.date_created >= ?1 and contract.date_created <= ?2 ",
            nativeQuery = true)
    Double getAmount(OffsetDateTime startDate, OffsetDateTime endDate);

    @Query(value = "select sum(amount) from contract " +
            "where funds='budget' and contract.date_created >= ?1 and contract.date_created <= ?2 ",
            nativeQuery = true)
    Double getBudgetAmount(OffsetDateTime startDate, OffsetDateTime endDate);

    @Query(value = "select party.resident, count(distinct party.id)\n" +
            "from contract\n" +
            "       join party on contract.supplier_id = party.id\n" +
            "where contract.date_created >= ?1 and contract.date_created <= ?2 and resident is not null\n" +
            "group by resident",
            nativeQuery = true)
    List<Object[]> getResidencyDistribution(OffsetDateTime startDate, OffsetDateTime endDate);

    @Query(value = "select country, iso_3, suppliers from (\n" +
            "              select country, count(distinct supplier_id) suppliers\n" +
            "from contract join party p on contract.supplier_id = p.id\n" +
            "where country is not null and contract.date_created>=?1 and contract.date_created<=?2 \n" +
            "group by country ) a join countries on a.country = countries.short_name",
            nativeQuery = true)
    List<Object[]> getSuppliersCountriesSuppliersCount(OffsetDateTime startDate, OffsetDateTime endDate);

    @Query(value = "select buyer.region, count(distinct buyer.id) buyers\n" +
            "from contract join party buyer on contract.buyer_id = buyer.id\n" +
            "where contract.date_created >= ?1 and contract.date_created <= ?2 and buyer.region is not null\n" +
            "group by buyer.region",
            nativeQuery = true)
    List<Object[]> getBuyersRegionBuyerCount(OffsetDateTime startDate, OffsetDateTime endDate);

    @Query(value = "select  buyer.is_capital capital, count(distinct buyer.id) buyers\n" +
            "from contract join party buyer on contract.buyer_id = buyer.id\n" +
            "where contract.date_created >= ?1 and contract.date_created <= ?2  and buyer.is_capital is not null \n" +
            "group by capital ",
            nativeQuery = true)
    List<Object[]> getBuyersCapitalBuyerCount(OffsetDateTime startDate, OffsetDateTime endDate);

    @Query(value = "select buyer.name, buyer.region, count(contract.id), sum(contract.amount) contract_amount\n" +
            "from contract join party buyer on contract.buyer_id = buyer.id\n" +
            "WHERE procurement_method_details NOt IN ('singleSource', 'Other')\n" +
            "  and contract.date_created >= ?1 and contract.date_created <= ?2\n" +
            "GROUP BY buyer.name, buyer.region\n" +
            "order by contract_amount desc\n" +
            "limit 5 ",
            nativeQuery = true)
    List<Object[]> getTopCompetitiveBuyersByContractsAmount(OffsetDateTime startDate, OffsetDateTime endDate);

    @Query(value = "" +
            "select okrb.code, okrb.name, count(item.id), sum(item.amount) contract_amount\n" +
            "from contract\n" +
            "       join contract_item item on contract.id = item.contract_id\n" +
            "       join classification c2 on item.classification_id = c2.id \n" +
            "       join okrb on c2.okrb_id = okrb.id\n" +
            "where contract.date_created >= ?1\n" +
            "  and contract.date_created <= ?2 and item.amount > 0\n" +
            "group by okrb.code, okrb.name\n" +
            "order by contract_amount desc\n" +
            "limit 5",
            nativeQuery = true)
    List<Object[]> getTopOKRBByContractsAmount(OffsetDateTime startDate, OffsetDateTime endDate);

    @Query(value = "with a as (select *, RANK() OVER (PARTITION BY region ORDER BY count DESC) rank\n" +
            "           from (select region, okrb_id, count(id)\n" +
            "                 from (select p.region, c2.okrb_id, c3.id\n" +
            "                       from classification c2\n" +
            "                              join contract_item c3 on c2.id = c3.classification_id\n" +
            "                              join contract c4 on c3.contract_id = c4.id\n" +
            "                              join party p on c4.buyer_id = p.id\n" +
            "                       where okrb_id is not null and c4.date_created > ?1\n" +
            "                         and date_created < ?2\n" +
            "                         and c3.amount > 0\n" +
            "                         and region = ANY\n" +
            "                             (SELECT regexp_split_to_table(\n" +
            "                                       'Брестская обл.,Витебская обл.,г. Минск,Гомельская обл.,Гродненская обл.,Минская обл.,Могилевская обл.',\n" +
            "                                       ','))) a\n" +
            "                 group by region, okrb_id) b\n" +
            ")\n" +
            "select region,  (select name from okrb where id = okrb_id) from (select * from a where rank = 1)b",
            nativeQuery = true)
    List<Object[]> getRegionsWithTopCountOKRB(OffsetDateTime startDate, OffsetDateTime endDate);

    @Query(value = "with a as (select *, RANK() OVER (PARTITION BY region ORDER BY sum DESC) rank\n" +
            "           from (select region, okrb_id, sum(amount)\n" +
            "                 from (select p.region, okrb_id, c3.amount\n" +
            "                       from okrb\n" +
            "                              join classification c2 on okrb.id = c2.okrb_id\n" +
            "                              join contract_item c3 on c2.id = c3.classification_id\n" +
            "                              join contract c4 on c3.contract_id = c4.id\n" +
            "                              join party p on c4.buyer_id = p.id\n" +
            "                       where c4.date_created > ?1\n" +
            "                         and date_created < ?2\n" +
            "                         and c3.amount > 0\n" +
            "                         and region = ANY\n" +
            "                             (SELECT regexp_split_to_table(\n" +
            "                                       'Брестская обл.,Витебская обл.,г. Минск,Гомельская обл.,Гродненская обл.,Минская обл.,Могилевская обл.',\n" +
            "                                       ','))) a\n" +
            "                 group by region, okrb_id) b\n" +
            ")\n" +
            "select region,  (select name from okrb where id = okrb_id) from (select * from a where rank = 1)b",
            nativeQuery = true)
    List<Object[]> getRegionsWithTopAmountOKRB(OffsetDateTime startDate, OffsetDateTime endDate);

    @Query(value = "select a.date,\n" +
            "       tender_count,\n" +
            "       competitive_count,\n" +
            "       contract_count,\n" +
            "       contract_amount,\n" +
            "       budget_contract_count,\n" +
            "       a.gen_date d\n" +
            "from (select extract(dow from generated_date) :::: int     date,\n" +
            "             generated_date :::: date                      gen_date,\n" +
            "             count(id)                                   tender_count,\n" +
            "             count(case when is_competitive then id end) competitive_count\n" +
            "      from (select generate_series(?1, ?2,\n" +
            "                                   '1 day' :::: interval) :::: date generated_date) a\n" +
            "             join tender on generated_date = tender.date_published :::: date\n" +
            "\n" +
            "      group by generated_date) a\n" +
            "       join (select extract(dow from generated_date) :::: int       date,\n" +
            "                    generated_date :::: date                        gen_date,\n" +
            "                    count(id)                                     contract_count,\n" +
            "                    sum(amount)                                   contract_amount,\n" +
            "                    count(case when funds = 'budget' then id end) budget_contract_count\n" +
            "             from (select generate_series(?1, ?2,\n" +
            "                                          '1 day' :::: interval) :::: date generated_date) a\n" +
            "                    join contract on generated_date = contract.date_created :::: date\n" +
            "             group by generated_date) b on a.date = b.date\n" +
            "order by d",
            nativeQuery = true)
    List<Object[]> getContractsCommonInfo(OffsetDateTime startDate, OffsetDateTime endDate);

    @Query(value = "select buyer.region,\n" +
            "       count(contract_id)                                                  total_count,\n" +
            "       sum(contract.amount)                                                total_amount,\n" +
            "       count(case when not contract.is_competitive then contract.id end)   uncompetitive_count,\n" +
            "       sum(case when not contract.is_competitive then contract.amount end) uncompetitive_amount,\n" +
            "       count(case when contract.is_competitive then contract.id end)       competitive_count,\n" +
            "       sum(case when contract.is_competitive then contract.amount end)     competitive_amount\n" +
            "from contract\n" +
            "       join party buyer on contract.buyer_id = buyer.id\n" +
            "where region = ANY (SELECT regexp_split_to_table(\n" +
            "                             'Брестская обл.,Витебская обл.,г. Минск,Гомельская обл.,Гродненская обл.,Минская обл.,Могилевская обл.',\n" +
            "                             ','))\n" +
            "  and contract.date_created <=?1\n" +
            "  and contract.date_created <=?2\n" +
            "  and contract.is_competitive is not null " +
            "group by region",
            nativeQuery = true)
    List<Object[]> getContractsCompetitivityRegionsInfo(OffsetDateTime startDate, OffsetDateTime endDate);

    @Query(value = "with a as (select region, okrb_id id, item.amount\n" +
            "           from classification\n" +
            "                  join contract_item item on classification.id = item.classification_id\n" +
            "                  join contract c2 on item.contract_id = c2.id\n" +
            "                  join party p on c2.buyer_id = p.id\n" +
            "           where okrb_id is not null\n" +
            "             and item.amount > 0 and region is not null\n" +
            "             and c2.date_created >= ?1\n" +
            "             and c2.date_created < ?2\n" +
            "    )\n" +
            "select region, (select name from okrb where id = c.id), items_amount from (\n" +
            "select *, RANK() OVER (PARTITION BY region ORDER BY items_amount DESC) rank\n" +
            "      from (select region, id, sum(amount)items_amount from a group by region, id) b)c\n" +
            "where rank <11",
            nativeQuery = true)
    List<Object[]> getRegionsTop10OKRBContractsInfo(OffsetDateTime startDate, OffsetDateTime endDate);

    @Query(value = "with top_suppliers as (select supplier_id, sum(contract.amount) contracs_amount\n" +
            "                       from contract\n" +
            "                       group by supplier_id\n" +
            "                       order by contracs_amount desc\n" +
            "                       limit (select count(distinct supplier_id) / 10\n" +
            "                              from contract\n" +
            "                              where contract.date_created>=?1\n" +
            "                                and contract.date_created<=?2))\n" +
            "select 100 * count(case\n" +
            "                     when supplier_id = any (select supplier_id from top_suppliers)\n" +
            "                             then contract.id end):::: DOUBLE PRECISION / count (contract.id)\n" +
            "\n" +
            "    from contract\n" +
            "    where contract.date_created>=?1\n" +
            "    and contract.date_created<=?2",
            nativeQuery = true)
    Double top10SuppliersShareByContractCount(OffsetDateTime startDate, OffsetDateTime endDate);

    @Query(value = "with top_suppliers as (select supplier_id, sum(contract.amount) contracs_amount\n" +
            "                       from contract\n" +
            "                       group by supplier_id\n" +
            "                       order by contracs_amount desc\n" +
            "                       limit (select count(distinct supplier_id) / 10\n" +
            "                              from contract\n" +
            "                              where contract.date_created>=?1\n" +
            "                                and contract.date_created<=?2))\n" +
            "select 100 * " +
            " sum(case when supplier_id = any (select supplier_id from top_suppliers) then contract.amount end) " +
            "/ sum (contract.amount) \n" +
            "    from contract\n" +
            "    where contract.date_created>=?1\n" +
            "    and contract.date_created<=?2",
            nativeQuery = true)
    Double top10SuppliersShareByContractAmount(OffsetDateTime startDate, OffsetDateTime endDate);

    @Query(value = "select product_country, sum, iso_3 from (select item.product_country, sum(item.amount)\n" +
            "               from contract\n" +
            "                      join contract_item item on contract.id = item.contract_id " +
            " where contract.date_created>=?1 and contract.date_created<=?2\n" +
            "               group by item.product_country) a join countries on a.product_country=countries.short_name",
            nativeQuery = true)
    List<Object[]> getContractItemsCountriesAmount(OffsetDateTime startDate, OffsetDateTime endDate);


    @Query(value = "select *\n" +
            "from (select *, RANK() OVER (PARTITION BY product_country ORDER BY sum DESC) rank\n" +
            "      from (select product_country, iso_3, okrb_name, sum\n" +
            "            from (select item.product_country, okrb.id, okrb.name okrb_name, sum(item.amount)\n" +
            "                  from contract\n" +
            "                         join contract_item item on contract.id = item.contract_id\n" +
            "                         join classification c2 on item.classification_id = c2.id " +
            "                         join okrb on c2.okrb_id = okrb.id \n" +
            "                  where contract.date_created >= ?1\n" +
            "                    and date_created < ?2\n" +
            "                    and item.amount > 0\n" +
            "                  group by item.product_country, okrb.id, okrb.name) a\n" +
            "                   join countries on a.product_country = countries.short_name) b) c\n" +
            "where rank < 6;", nativeQuery = true)
    List<Object[]> getCountriesTOPOKRBsAmount(OffsetDateTime startDate, OffsetDateTime endDate);


    @Query(value = "select sum(contract.amount)::::double precision/ count(contract.id)\n" +
            "from contract\n" +
            "       join party p on contract.supplier_id = p.id\n" +
            "where p.resident = false " +
            "and contract.date_created >= ?1 and date_created < ?2", nativeQuery = true)
    Double getAvgContractAmountPerNonResidentContract(OffsetDateTime startDate, OffsetDateTime endDate);


    @Query(value = "select sum(case when p.resident = false then contract.amount end) :::: double precision / sum(contract.amount) * 100\n" +
            "from contract join party p on contract.supplier_id = p.id\n" +
            "where contract.date_created>=?1 and contract.date_created<=?2", nativeQuery = true)
    Double getAmountShareOfNonResidentContracts(OffsetDateTime startDate, OffsetDateTime endDate);

    @Query(value = "select count(contract.id)::::double precision/ count(distinct supplier_id)\n" +
            "from contract\n" +
            "       join party p on contract.supplier_id = p.id\n" +
            "where p.resident = false and contract.date_created>=?1 and contract.date_created<=?2", nativeQuery = true)
    Double getContractCountPerNonResidentSupplier(OffsetDateTime startDate, OffsetDateTime endDate);

    @Query(value = "select max(contract.amount) " +
            "from contract\n" +
            "       join party p on contract.supplier_id = p.id\n" +
            "where p.resident = false" +
            " and contract.date_created>=?1 and contract.date_created<=?2", nativeQuery = true)
    Double getMaxNonResidentContractAmount(OffsetDateTime startDate, OffsetDateTime endDate);

    @Query(value = "select p.country, sum(contract.amount) sum_amount\n" +
            "from contract join party p on contract.supplier_id = p.id\n" +
            "where p.resident  = false and contract.date_created>=?1  and contract.date_created<=?2\n" +
            "group by p.country order by sum_amount desc limit 10\n", nativeQuery = true)
    List<Object[]> getTopNonResidentCountries(OffsetDateTime startDate, OffsetDateTime endDate);

    @Query(value = "with top as (select p.country\n" +
            "             from contract\n" +
            "                    join party p on contract.supplier_id = p.id\n" +
            "             where p.resident = false\n" +
            "                   and contract.date_created>=?1  and contract.date_created<=?2\n" +
            "             group by p.country\n" +
            "             order by sum(contract.amount) desc\n" +
            "             limit 10)\n" +
            "select sum(case when p.country in (select country from top) then contract.amount end) sumtop,\n" +
            "       sum(case when p.country not in (select country from top) then contract.amount end) sumnontop\n" +
            "from contract\n" +
            "       join party p on contract.supplier_id = p.id\n" +
            "where p.resident = false and contract.date_created>=?1  and contract.date_created<=?2", nativeQuery = true)
    List<Object[]> getContractsOfTopAndNonTopNonResidentCountries(OffsetDateTime startDate, OffsetDateTime endDate);

    @Query(value = "select name, sum(sum_amount) amount , sum(contracts_count) contracts_count, sum(count) supplioers_count from (select p.country,\n" +
            "                      sum(contract.amount) sum_amount,\n" +
            "                      count(contract.id)   contracts_count,\n" +
            "                      count(distinct p.id)\n" +
            "               from contract\n" +
            "                      join party p on contract.supplier_id = p.id\n" +
            "               where p.resident = false\n" +
            "                 and country is not null\n" +
            "      and contract.date_created>=?1\n" +
            "      and contract.date_created<=?2\n" +
            "               group by p.country\n" +
            "               order by sum_amount) a join countries_groups on a.country = countries_groups.country_name\n" +
            "group by name", nativeQuery = true)
    List<Object[]> getCountriesContractsAmountCountSuppliers(OffsetDateTime startDate, OffsetDateTime endDate);

    @Query(value = "\n" +
            "with top as (select o.id\n" +
            "             from contract\n" +
            "                    join contract_item item on contract.id = item.contract_id\n" +
            "                    join party p on contract.supplier_id = p.id\n" +
            "                    join classification c2 on item.classification_id = c2.id\n" +
            "                    join okrb o on c2.okrb_id = o.id\n" +
            "             where p.resident = false\n" +
            "               and item.amount > 0 and contract.date_created>=?1\n" +
            "               and contract.date_created<=?2\n" +
            "             group by o.id\n" +
            "             order by sum(item.amount) desc\n" +
            "             limit 5)\n" +
            "\n" +
            "select okrb.name, sum(case when resident = true then c4.amount end) res, sum(case when resident <> true then c4.amount end) nonres\n" +
            "from okrb\n" +
            "       join classification c3 on okrb.id = c3.okrb_id\n" +
            "       join contract_item c4 on c3.id = c4.classification_id\n" +
            "       join contract c5 on c4.contract_id = c5.id\n" +
            "       join party p2 on c5.supplier_id = p2.id\n" +
            "where okrb.id = any (select id from top)  and c5.date_created>=?1\n" +
            "               and c5.date_created<=?2\n" +
            "group by okrb.name", nativeQuery = true)
    List<Object[]> getTopResidentNonResidentOkrbs(OffsetDateTime startDate, OffsetDateTime endDate);

    @Query(value = "select buyer.region, sum(contract.amount)\n" +
            "from contract\n" +
            "       join party buyer on contract.buyer_id = buyer.id\n" +
            "       join party supplier on contract.supplier_id = supplier.id\n" +
            "where supplier.resident = false\n" +
            "  and buyer.region = ANY\n" +
            "      (SELECT regexp_split_to_table(\n" +
            "                'Брестская обл.,Витебская обл.,г. Минск,Гомельская обл.,Гродненская обл.,Минская обл.,Могилевская обл.',\n" +
            "                ','))\n" +
            "  and contract.date_created>=?1\n" +
            "  and contract.date_created<=?2\n" +
            "group by buyer.region", nativeQuery = true)
    List<Object[]> getRegionsWithNonResidentSuppliers(OffsetDateTime startDate, OffsetDateTime endDate);


}
