package com.datapath.web.services;

import com.datapath.persistence.repositories.ContractRepository;
import com.datapath.persistence.repositories.LotRepository;
import com.datapath.persistence.repositories.TenderRepository;
import com.datapath.web.domain.*;
import org.springframework.stereotype.Service;

import java.time.OffsetDateTime;
import java.util.*;
import java.util.stream.Collectors;

import static java.util.Objects.isNull;

@Service
public class StatisticsMarketPageService {

    private static final String UNDEFINED_KEY = "undefined";

    private TenderRepository tenderRepository;
    private ContractRepository contractRepository;
    private LotRepository lotRepository;

    private Map<String, String> REGIONS_MAP = new HashMap<String, String>() {
        {
            put("Брестская обл.", "by-br");
            put("Витебская обл.", "by-vi");
            put("Гомельская обл.", "by-ho");
            put("Гродненская обл.", "by-hr");
            put("Могилевская обл.", "by-ma");
            put("Минская обл.", "by-mi");
            put("г. Минск", "by-hm");
        }
    };


    public StatisticsMarketPageService(
            TenderRepository tenderRepository,
            ContractRepository contractRepository,
            LotRepository lotRepository) {
        this.lotRepository = lotRepository;
        this.tenderRepository = tenderRepository;
        this.contractRepository = contractRepository;
    }

    public DistributionStatistics getKPIContractsPerBuyerCountAmount(OffsetDateTime startDate, OffsetDateTime endDate) {

        List<Object[]> contractsPerBuyerByDatesCount = contractRepository.getContractsPerBuyerByDatesCountAmount(startDate, endDate);

        List<DistributionStatistics> dates = contractsPerBuyerByDatesCount.stream().map(item -> {
            String date = item[0].toString().substring(0, 7);
            Long buyers = isNull(item[1]) ? 0 : Long.parseLong(item[1].toString());
            Double amount = isNull(item[2]) ? 0 : Double.parseDouble(item[2].toString());
            Double count = isNull(item[3]) ? 0 : Double.parseDouble(item[3].toString());

            return DistributionStatistics.builder()
                    .date(date)
                    .buyers(Statistics.builder().count(buyers).build())
                    .contracts(Statistics.builder()
                            .avgCount(Avg.builder().perBuyer(buyers > 0 ? count / buyers : 0).build())
                            .avgAmount(Avg.builder().perBuyer(buyers > 0 ? amount / buyers : 0).build())
                            .build())
                    .build();

        }).collect(Collectors.toList());

        return DistributionStatistics.builder().dates(dates).build();
    }

    public Statistics getKPIBuyersSuppliersCount(OffsetDateTime startDate, OffsetDateTime endDate) {

        Object[] buyersSuppliersCount = contractRepository.getBuyersSuppliersCount(startDate, endDate).get(0);
        List<Object[]> tendersCountByDate = contractRepository.getBuyerSupplierDatesCount(startDate, endDate);

        Long buyersCount = Long.parseLong(buyersSuppliersCount[0].toString());
        Long suppliersCount = Long.parseLong(buyersSuppliersCount[1].toString());

        List<Statistics> dates = tendersCountByDate.stream().map(item -> {
            String date = item[0].toString().substring(0, 7);
            Long buyersDateCount = Long.parseLong(item[1].toString());
            Long suppliersDateCount = Long.parseLong(item[2].toString());
            return Statistics.builder()
                    .date(date)
                    .buyers(Statistics.builder().count(buyersDateCount).build())
                    .suppliers(Statistics.builder().count(suppliersDateCount).build())
                    .build();
        }).collect(Collectors.toList());

        return Statistics.builder().buyers(Statistics.builder().count(buyersCount).build())
                .suppliers(Statistics.builder().count(suppliersCount).build()).dates(dates).build();
    }

    public Statistics getKPIGSWCount(OffsetDateTime startDate, OffsetDateTime endDate) {
        List<Object[]> gswCount = contractRepository.getGSWCount(startDate, endDate);
        List<Object[]> gswByDatesCount = contractRepository.getGSWByDatesCount(startDate, endDate);

        List<Statistics> gsws = gswCount.stream().map(item -> {
            String type = item[0].toString();
            Long count = Long.parseLong(item[1].toString());
            return Statistics.builder().key(Key.builder().en(type).build()).count(count).build();
        }).collect(Collectors.toList());

        Map<String, List<Statistics>> datesStatistics = new HashMap<>();

        gswByDatesCount.forEach(item -> {
            String date = item[0].toString().substring(0, 7);
            String type = item[1].toString();
            Long count = Long.parseLong(item[2].toString());
            if (!datesStatistics.containsKey(date)) datesStatistics.put(date, new ArrayList<>());
            datesStatistics.get(date).add(Statistics.builder().key(Key.builder().en(type).build()).count(count).build());
        });

        List<Statistics> datesGSWs = datesStatistics.entrySet().stream().map(item ->
                Statistics.builder().date(item.getKey()).gsw(item.getValue()).build()).collect(Collectors.toList());
        return Statistics.builder().gsw(gsws).dates(datesGSWs).build();

    }

    public Statistics getClassificationAvgPerBuyer(OffsetDateTime startDate, OffsetDateTime endDate) {
        Object[] classificationBuyerSupplierCount = contractRepository.getClassificationBuyerSupplierCount(startDate, endDate).get(0);
        long contracts = Long.parseLong(classificationBuyerSupplierCount[0].toString());
        long buyers = Long.parseLong(classificationBuyerSupplierCount[1].toString());

        return Statistics.builder()
                .avg(Avg.builder()
                        .perBuyer((double) contracts / buyers)
                        .build())
                .build();
    }

    public Statistics getBudgetAmountShare(OffsetDateTime startDate, OffsetDateTime endDate) {
        Double amount = contractRepository.getAmount(startDate, endDate);
        Double budgetAmount = contractRepository.getBudgetAmount(startDate, endDate);
        return Statistics.builder().amountShare(budgetAmount / amount * 100).build();
    }

    public List<Statistics> getResidencyDistribution(OffsetDateTime startDate, OffsetDateTime endDate) {
        List<Object[]> residencyDistribution = contractRepository.getResidencyDistribution(startDate, endDate);
        return residencyDistribution.stream().map(item -> {
            boolean b = Boolean.parseBoolean(item[0].toString());
            String resident = b ? "resident" : "nonResident";
            long count = Long.parseLong(item[1].toString());
            return Statistics.builder().key(Key.builder().en(b ? "resident" : "nonResident").ru(b ? "Резиденты" : "Нерезиденты").build()).count(count).build();
        }).collect(Collectors.toList());
    }

    public List<DistributionStatistics> getSuppliersCountriesSuppliersCount(OffsetDateTime startDate, OffsetDateTime endDate) {
        List<Object[]> suppliersRegionContractCountAmount = contractRepository.getSuppliersCountriesSuppliersCount(startDate, endDate);
        return suppliersRegionContractCountAmount.stream().map(item -> {
            String country = item[0].toString();
            String iso = item[1].toString();
            long suppliersCount = Long.parseLong(item[2].toString());

            return DistributionStatistics.builder()
                    .key(Key.builder().ru(country).en(iso).build())
                    .suppliers(Statistics.builder().count(suppliersCount).build())
                    .build();
        }).collect(Collectors.toList());
    }

    public List<DistributionStatistics> getBuyersRegionBuyerCount(OffsetDateTime startDate, OffsetDateTime endDate) {
        List<Object[]> buyersRegionContractCountAmount = contractRepository.getBuyersRegionBuyerCount(startDate, endDate);
        return buyersRegionContractCountAmount.stream().map(item -> {
            String region = item[0].toString();
            if (REGIONS_MAP.containsKey(region)) {
                long buyersCount = Long.parseLong(item[1].toString());
                return DistributionStatistics.builder()
                        .key(Key.builder().ru(region).en(REGIONS_MAP.get(region)).build())
                        .buyers(Statistics.builder().count(buyersCount).build())
                        .build();
            }
            return null;
        }).filter(Objects::nonNull).collect(Collectors.toList());
    }

    public List<DistributionStatistics> getBuyersCapitalBuyerCount(OffsetDateTime startDate, OffsetDateTime endDate) {
        List<Object[]> buyersRegionContractCountAmount = contractRepository.getBuyersCapitalBuyerCount(startDate, endDate);
        return buyersRegionContractCountAmount.stream().map(item -> {
            Boolean capital = Boolean.parseBoolean(item[0].toString());
            long buyersCount = Long.parseLong(item[1].toString());
            return DistributionStatistics.builder()
                    .key(Key.builder().ru(capital ? "Столица" : "Другие регионы").build())
                    .buyers(Statistics.builder().count(buyersCount).build())
                    .build();
        }).collect(Collectors.toList());
    }

    public List<Buyer> getTopBuyers(List<Object[]> buyers) {
        return buyers.stream().map(item -> {
            String name = item[0].toString();
            String region = item[1].toString();
            long contractsCount = Long.parseLong(item[2].toString());
            double amount = Double.parseDouble(item[3].toString());

            return Buyer.builder()
                    .name(name)
                    .region(region)
                    .contract(Buyer.Contract.builder().count(contractsCount).amount(amount).build())
                    .build();
        }).collect(Collectors.toList());
    }

    public List<OKRB> getTopOKRB(List<Object[]> okrbs) {
        return okrbs.stream().map(item -> {
            String id = item[0].toString();
            String description = item[1].toString();
            long contractsCount = Long.parseLong(item[2].toString());
            double amount = Double.parseDouble(item[3].toString());

            return OKRB.builder()
                    .id(id)
                    .description(description)
                    .contract(OKRB.Contract.builder().count(contractsCount).amount(amount).build())
                    .build();
        }).collect(Collectors.toList());
    }

    public List<Buyer> getTopCompetitiveBuyersByContractsAmount(OffsetDateTime startDate, OffsetDateTime endDate) {
        List<Object[]> topNonCompetitiveBuyersByContractsAmount =
                contractRepository.getTopCompetitiveBuyersByContractsAmount(startDate, endDate);
        return getTopBuyers(topNonCompetitiveBuyersByContractsAmount);
    }

    public Statistics getShareOfRelatedLots(OffsetDateTime startDate, OffsetDateTime endDate) {
        Long lotsOfRelatedProcess = lotRepository.getLotsOfRelatedProcess(startDate, endDate);
        Long lotsOfTendersWithRelatedProcess = lotRepository.getLotsOfTendersWithRelatedProcess(startDate, endDate);
        return Statistics
                .builder()
                .share(((double) lotsOfTendersWithRelatedProcess / lotsOfRelatedProcess) * 100)
                .build();
    }

    public List<OKRB> getTopOKRBByContractsAmount(OffsetDateTime startDate, OffsetDateTime endDate) {
        List<Object[]> topOKRBByContractsAmount =
                contractRepository.getTopOKRBByContractsAmount(startDate, endDate);
        return getTopOKRB(topOKRBByContractsAmount);
    }

    public Statistics top10SuppliersShareByContractCount(OffsetDateTime startDate, OffsetDateTime endDate) {
        Double share = contractRepository.top10SuppliersShareByContractCount(startDate, endDate);
        return Statistics.builder().share(share).build();
    }

    public Statistics top10SuppliersShareByContractAmount(OffsetDateTime startDate, OffsetDateTime endDate) {
        Double share = contractRepository.top10SuppliersShareByContractAmount(startDate, endDate);
        return Statistics.builder().share(share).build();
    }

    public List<OKRB> getRegionsWithTopCountOKRB(OffsetDateTime startDate, OffsetDateTime endDate) {
        List<Object[]> topOKRBByContractsCount =
                contractRepository.getRegionsWithTopCountOKRB(startDate, endDate);
        return topOKRBByContractsCount.stream().map(item -> {
            String region = item[0].toString();
            String description = item[1].toString();
            return OKRB.builder().region(region).description(description).build();
        }).collect(Collectors.toList());
    }

    public List<OKRB> getRegionsWithTopAmountOKRB(OffsetDateTime startDate, OffsetDateTime endDate) {
        List<Object[]> topOKRBByContractsCount =
                contractRepository.getRegionsWithTopAmountOKRB(startDate, endDate);
        return topOKRBByContractsCount.stream().map(item -> {
            String region = item[0].toString();
            String description = item[1].toString();
            return OKRB.builder().region(region).description(description).build();
        }).collect(Collectors.toList());
    }


    public Statistics getLotsForSmallScaleBusiness(OffsetDateTime startDate, OffsetDateTime endDate) {
        Object[] lotsForSmallScaleBusiness =
                tenderRepository.getLotsForSmallScaleBusiness(startDate, endDate).get(0);
        List<Object[]> lotsForSmallScaleBusinessByDates =
                tenderRepository.getLotsForSmallScaleBusinessByDates(startDate, endDate);

        long small = isNull(lotsForSmallScaleBusiness[0]) ? 0 : Long.parseLong(lotsForSmallScaleBusiness[0].toString());
        long other = isNull(lotsForSmallScaleBusiness[1]) ? 0 : Long.parseLong(lotsForSmallScaleBusiness[1].toString());

        List<Statistics> totals = Arrays.asList(
                Statistics.builder().key(Key.builder().ru("МСП").build()).count(small).build(),
                Statistics.builder().key(Key.builder().ru("Другие").build()).count(other).build()
        );

        List<Statistics> dates = lotsForSmallScaleBusinessByDates.stream().map(item -> {
            String date = item[0].toString().substring(0, 7);
            long smallBusiness = isNull(item[1])
                    ? 0 : Long.parseLong(item[1].toString());
            long otherBusiness = isNull(item[2])
                    ? 0 : Long.parseLong(item[2].toString());

            List<Statistics> values = Arrays.asList(
                    Statistics.builder().key(Key.builder().ru("МСП").build()).count(smallBusiness).build(),
                    Statistics.builder().key(Key.builder().ru("Другие").build()).count(otherBusiness).build()
            );

            return Statistics
                    .builder()
                    .date(date)
                    .values(values)
                    .build();

        }).collect(Collectors.toList());

        return Statistics.builder().values(totals).dates(dates).build();

    }


}
