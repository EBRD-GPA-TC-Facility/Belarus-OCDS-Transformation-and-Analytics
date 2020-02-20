package com.datapath.web.services;

import com.datapath.persistence.repositories.ContractRepository;
import com.datapath.persistence.repositories.EnquiryRepository;
import com.datapath.persistence.repositories.LotRepository;
import com.datapath.persistence.repositories.TenderRepository;
import com.datapath.web.domain.*;
import org.springframework.stereotype.Service;

import java.math.RoundingMode;
import java.text.DecimalFormat;
import java.time.OffsetDateTime;
import java.util.*;
import java.util.stream.Collectors;

import static java.util.Objects.isNull;
import static java.util.Objects.nonNull;

@Service
public class HomePageService {

    private LotRepository lotRepository;
    private TenderRepository tenderRepository;
    private EnquiryRepository enquiryRepository;
    private ContractRepository contractRepository;
    private List<String> WEEK_DAYS = Arrays.asList("Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота", "Воскресенье");

    private Map<String, String> REGIONS_MAP = new HashMap<String, String>() {{
        put("Могилевская обл.", "Mogilev");
        put("Минская обл.", "Minsk");
        put("Гродненская обл.", "Hrodzyenskaya Voblasts'");
        put("Гомельская обл.", "Homyel'skaya Voblasts'");
        put("Витебская обл.", "Vitsyebskaya Voblasts'");
        put("Брестская обл.", "Brestskaya Voblasts'");
        put("г. Минск", "Minsk City");
    }};


    public HomePageService(TenderRepository tenderRepository,
                           ContractRepository contractRepository,
                           LotRepository lotRepository,
                           EnquiryRepository enquiryRepository) {
        this.lotRepository = lotRepository;
        this.tenderRepository = tenderRepository;
        this.enquiryRepository = enquiryRepository;
        this.contractRepository = contractRepository;
    }

    private Statistics getCountKPIStatistics(Long total, List<Object[]> countByDates) {
        List<Statistics> dates = countByDates.stream().map(item -> {
            String date = item[0].toString();
            Long dateCount = isNull(item[1]) ? 0 : Long.parseLong(item[1].toString());
            return Statistics.builder().date(date).count(dateCount).build();
        }).collect(Collectors.toList());
        return Statistics.builder().count(total).dates(dates).build();
    }

    private Statistics getAmountKPIStatistics(Double total, List<Object[]> countByDates) {
        List<Statistics> dates = countByDates.stream().map(item -> {
            String date = item[0].toString();
            Double dateAmount = isNull(item[1]) ? 0 : Double.parseDouble(item[1].toString());
            return Statistics.builder().date(date).amount(dateAmount).build();
        }).collect(Collectors.toList());
        return Statistics.builder().amount(total).dates(dates).build();
    }

    private Statistics getCountDatesStatistics(List<Object[]> countByDates) {
        List<Statistics> dates = countByDates.stream().map(item -> {
            String date = item[0].toString();
            Long dateCount = isNull(item[1]) ? 0 : Long.parseLong(item[1].toString());
            return Statistics.builder().date(date).count(dateCount).build();
        }).collect(Collectors.toList());
        return Statistics.builder().dates(dates).build();
    }

    private Statistics getAmountDatesStatistics(List<Object[]> countByDates) {
        List<Statistics> dates = countByDates.stream().map(item -> {
            String date = item[0].toString();
            Double dateAmount = isNull(item[1]) ? 0 : Double.parseDouble(item[1].toString());
            return Statistics.builder().date(date).amount(dateAmount).build();
        }).collect(Collectors.toList());
        return Statistics.builder().dates(dates).build();
    }

    public Statistics getLotsPerTenderKPI(OffsetDateTime startDate, OffsetDateTime endDate) {
        Double lotsPerTenderCount = tenderRepository.getLotsPerTenderCount(startDate, endDate);
        List<Object[]> lotsPerTendersCountByDate = tenderRepository.getLotsPerTendersCountByDate(startDate, endDate);

        List<Statistics> dates = lotsPerTendersCountByDate.stream().map(item -> {
            String date = item[0].toString();
            Double count = isNull(item[1]) ? 0 : Double.parseDouble(item[1].toString());
            return Statistics.builder().date(date).avg(Avg.builder().perProcedure(count).build()).build();
        }).collect(Collectors.toList());

        return Statistics.builder().avg(Avg.builder().perProcedure(lotsPerTenderCount).build()).dates(dates).build();
    }

    public Statistics getContractsPerSupplierCountKPI(OffsetDateTime startDate, OffsetDateTime endDate) {
        Double contractsPerSupplierCount = contractRepository.getContractsPerSupplierCount(startDate, endDate);
        List<Object[]> contractsPerSupplierByDatesCount = contractRepository.getContractsPerSupplierByDatesCount(startDate, endDate);

        List<Statistics> dates = contractsPerSupplierByDatesCount.stream().map(item -> {
            String date = item[0].toString();
            Double avg = isNull(item[1]) ? 0 : Double.parseDouble(item[1].toString());
            return Statistics.builder().date(date).avg(Avg.builder().perSupplier(avg).build()).build();
        }).collect(Collectors.toList());

        return Statistics.builder().avg(Avg.builder().perSupplier(contractsPerSupplierCount).build()).dates(dates).build();
    }

    public Statistics getOKRBPerTenderKPI(OffsetDateTime startDate, OffsetDateTime endDate) {
        Double okrbPerTenderCount = tenderRepository.getOKRBPerTenderCount(startDate, endDate);
        List<Object[]> okrbPerTendersCountByDate = tenderRepository.getOKRBPerTendersCountByDate(startDate, endDate);

        List<Statistics> dates = okrbPerTendersCountByDate.stream().map(item -> {
            String date = item[0].toString();
            Double count = isNull(item[1]) ? 0 : Double.parseDouble(item[1].toString());
            return Statistics.builder().date(date).avg(Avg.builder().perProcedure(count).build()).build();
        }).collect(Collectors.toList());

        return Statistics.builder().avg(Avg.builder().perProcedure(okrbPerTenderCount).build()).dates(dates).build();
    }

    public Statistics getProcuringEntitiesKPI(OffsetDateTime startDate, OffsetDateTime endDate) {
        Long procuringEntityCount = tenderRepository.getProcuringEntityCount(startDate, endDate);
        List<Object[]> procuringEntityCountByDates = tenderRepository.getProcuringEntityByDatesCount(startDate, endDate);
        return getCountKPIStatistics(procuringEntityCount, procuringEntityCountByDates);
    }

    public Statistics getProcuringEntitiesCount(OffsetDateTime startDate, OffsetDateTime endDate) {
        Long procuringEntityCount = tenderRepository.getProcuringEntityCount(startDate, endDate);
        return Statistics.builder().count(procuringEntityCount).build();
    }

    public Statistics getProcuringEntitiesDatesCount(OffsetDateTime startDate, OffsetDateTime endDate) {
        List<Object[]> procuringEntityCountByDates = tenderRepository.getProcuringEntityByDatesCount(startDate, endDate);
        return getCountDatesStatistics(procuringEntityCountByDates);
    }

    public Statistics getContractKPICount(OffsetDateTime startDate, OffsetDateTime endDate) {
        Long contractsCount = contractRepository.getContractsCount(startDate, endDate);
        List<Object[]> contractsDatesCount = contractRepository.getContractsDatesByDayCount(startDate, endDate);
        List<Statistics> dates = contractsDatesCount.stream().map(item -> {
            String date = item[0].toString();
            int dateN = Integer.parseInt(item[2].toString());
            Integer day = dateN == 0 ? 6 : dateN - 1;
            Long dateCount = isNull(item[1]) ? 0 : Long.parseLong(item[1].toString());
            return Statistics.builder().date(date).day(WEEK_DAYS.get(day)).count(dateCount).build();
        }).collect(Collectors.toList());
        return Statistics.builder().count(contractsCount).dates(dates).build();
    }

    public Statistics getContractKPIAmount(OffsetDateTime startDate, OffsetDateTime endDate) {
        Double contractsAmount = contractRepository.getContractsAmount(startDate, endDate);
        List<Object[]> contractsItemsDatesAmount = contractRepository.getContractsAmountDatesByDayAmount(startDate, endDate);
        return getAmountKPIStatistics(contractsAmount, contractsItemsDatesAmount);
    }

    public Statistics getContractCount(OffsetDateTime startDate, OffsetDateTime endDate) {
        Long contractsCount = contractRepository.getContractsCount(startDate, endDate);
        return Statistics.builder().count(contractsCount).build();
    }

    public Statistics getContractDatesCount(OffsetDateTime startDate, OffsetDateTime endDate) {
        List<Object[]> contractsDatesCount = contractRepository.getContractsDatesByDayCount(startDate, endDate);
        return getCountDatesStatistics(contractsDatesCount);
    }

    public Statistics getContractsSum(OffsetDateTime startDate, OffsetDateTime endDate) {
        Double contractsAmount = contractRepository.getContractsAmount(startDate, endDate);
        return Statistics.builder().amount(contractsAmount).build();
    }

    public Statistics getContractsDatesSum(OffsetDateTime startDate, OffsetDateTime endDate) {
        List<Object[]> contractsItemsDatesAmount = contractRepository.getContractsAmountDatesByDayAmount(startDate, endDate);
        return getAmountDatesStatistics(contractsItemsDatesAmount);
    }

    public Statistics getCompetitivityDatesAmount(OffsetDateTime startDate, OffsetDateTime endDate) {
        List<Object[]> contractsItemsDatesAmount = contractRepository.getCompetitivityDatesAmount(startDate, endDate);
        List<Statistics> dates = contractsItemsDatesAmount.stream().map(item -> {
            String date = item[0].toString();
            Double competitiveAmount = Double.parseDouble(item[1].toString());
            Double uncompetitiveAmount = Double.parseDouble(item[2].toString());
            int dayN = Integer.parseInt(item[3].toString());
            Integer day = dayN == 0 ? 6 : dayN - 1;
//            return Statistics.builder().date(date + "\n" + WEEK_DAYS.get(dayN)).competitiveAmount(competitiveAmount).uncompetitiveAmount(uncompetitiveAmount).build();
            return Statistics.builder()
                    .date(date)
                    .day(WEEK_DAYS.get(day))
                    .competitiveAmount(competitiveAmount).uncompetitiveAmount(uncompetitiveAmount)
                    .build();
        }).collect(Collectors.toList());
        return Statistics.builder().dates(dates).build();
    }

    public Statistics getSuppliersKPICount(OffsetDateTime startDate, OffsetDateTime endDate) {
        Long suppliersCount = contractRepository.getSuppliersCount(startDate, endDate);
        List<Object[]> suppliersCountByDate = contractRepository.getSuppliersCountByDate(startDate, endDate);
        return getCountKPIStatistics(suppliersCount, suppliersCountByDate);
    }

    public Statistics getSuppliersCount(OffsetDateTime startDate, OffsetDateTime endDate) {
        Long suppliersCount = contractRepository.getSuppliersCount(startDate, endDate);
        return Statistics.builder().count(suppliersCount).build();
    }

    public Statistics getSuppliersDatesCount(OffsetDateTime startDate, OffsetDateTime endDate) {
        List<Object[]> suppliersCountByDate = contractRepository.getSuppliersCountByDate(startDate, endDate);
        return getCountDatesStatistics(suppliersCountByDate);
    }

    public Statistics getLotsCompleteKPICount(OffsetDateTime startDate, OffsetDateTime endDate) {
        Long completeLotsCount = lotRepository.getCompleteLotsCount(startDate, endDate);
        List<Object[]> countByDate = lotRepository.getCompleteLotsCountByDate(startDate, endDate);
        return getCountKPIStatistics(completeLotsCount, countByDate);
    }

    public Statistics getLotsCompleteCount(OffsetDateTime startDate, OffsetDateTime endDate) {
        Long completeLotsCount = lotRepository.getCompleteLotsCount(startDate, endDate);
        return Statistics.builder().count(completeLotsCount).build();
    }

    public Statistics getLotsCompleteDatesCount(OffsetDateTime startDate, OffsetDateTime endDate) {
        List<Object[]> countByDate = lotRepository.getCompleteLotsCountByDate(startDate, endDate);
        return getCountDatesStatistics(countByDate);
    }

    public Statistics getLotsActiveKPICount(OffsetDateTime startDate, OffsetDateTime endDate) {
        Long activeLotsCount = tenderRepository.getActiveLotsCount(startDate, endDate);
        List<Object[]> countByDate = tenderRepository.getActiveLotsCountByDate(startDate, endDate);
        return getCountKPIStatistics(activeLotsCount, countByDate);
    }

    public Statistics getKPIEnquiriesCount(OffsetDateTime startDate, OffsetDateTime endDate) {
        Long enquiriesCount = enquiryRepository.getEnquiriesCount(startDate, endDate);
        List<Object[]> countByDate = enquiryRepository.getEnquiriesCountByDates(startDate, endDate);
        return getCountKPIStatistics(enquiriesCount, countByDate);
    }

    public Statistics getLotsActiveCount(OffsetDateTime startDate, OffsetDateTime endDate) {
        Long activeLotsCount = tenderRepository.getActiveLotsCount(startDate, endDate);
        return Statistics.builder().count(activeLotsCount).build();
    }

    public Statistics getShareOfBelarusProducts(OffsetDateTime startDate, OffsetDateTime endDate) {
        Double shareOfBelarusProducts = contractRepository.getShareOfBelarusProducts(startDate, endDate);
        return Statistics.builder().share(shareOfBelarusProducts).build();
    }

    public Statistics getLotsActiveDatesCount(OffsetDateTime startDate, OffsetDateTime endDate) {
        List<Object[]> countByDate = tenderRepository.getActiveLotsCountByDate(startDate, endDate);
        return getCountDatesStatistics(countByDate);
    }

    public Statistics getSuccessfulProceduresCount(OffsetDateTime startDate, OffsetDateTime endDate) {
        Long successfulProceduresCount = tenderRepository.getSuccessfulProceduresCount(startDate, endDate);
        return Statistics.builder().count(nonNull(successfulProceduresCount) ? successfulProceduresCount : 0).build();
    }

    public Statistics getAvgProceduresPerHour(OffsetDateTime startDate, OffsetDateTime endDate) {
        Double avgProceduresPerHour = tenderRepository.getAvgProceduresPerHour(startDate, endDate);
        return Statistics.builder().avg(Avg.builder().perHour((double) Math.round(avgProceduresPerHour)).build()).build();
    }

    public Statistics getCompetetiveEveryN(OffsetDateTime startDate, OffsetDateTime endDate) {
        Integer competetiveEveryN = tenderRepository.getCompetetiveEveryN(startDate, endDate);
        return Statistics.builder().n(competetiveEveryN).build();
    }

    public List<Statistics> getTopOKRB(OffsetDateTime startDate, OffsetDateTime endDate) {
        List<Object[]> topOKRB = contractRepository.getTopOKRB(startDate, endDate);

        return topOKRB.stream().map(okrb -> {
            String name = isNull(okrb[0]) ? "undefined" : okrb[0].toString();
            Double amount = isNull(okrb[1]) ? 0 : Double.parseDouble(okrb[1].toString());
            return Statistics.builder().key(Key.builder().ru(name).build()).amount(amount).build();
        }).collect(Collectors.toList());
    }

    public Procurement getTopProcurement(OffsetDateTime startDate, OffsetDateTime endDate) {

        Object[] topTender = tenderRepository.getTopTender(startDate, endDate).get(0);

        String title = isNull(topTender[0]) ? "" : topTender[0].toString();
        String procurementMethod = isNull(topTender[1]) ? "" : topTender[1].toString();
        String procuringEntity = isNull(topTender[2]) ? "" : topTender[2].toString();
        String description = isNull(topTender[3]) ? "" : topTender[3].toString();
        double amount = isNull(topTender[4]) ? 0 : Double.parseDouble(topTender[4].toString());

        return Procurement.builder()
                .title(title)
                .procurementMethod(procurementMethod)
                .procuringEntity(procuringEntity)
                .description(description)
                .amount(amount)
                .build();
    }

    public List<Procurement> getTopSingleSourceProcedures(OffsetDateTime startDate, OffsetDateTime endDate) {

        List<Object[]> topTenders = contractRepository.getTopSingleSource(startDate, endDate);
        return topTenders.stream().map(topTender -> {
            String title = isNull(topTender[0]) ? "" : topTender[0].toString();
            String buyer = topTender[1].toString();
            String supplier = topTender[2].toString();
            String description = topTender[3].toString();
            DecimalFormat df = new DecimalFormat("#.##");
            df.setRoundingMode(RoundingMode.CEILING);
            double amount = Double.parseDouble(df.format(Double.parseDouble(topTender[4].toString()) / 1_000_000));

            return Procurement.builder()
                    .title(title)
                    .buyer(buyer)
                    .supplier(supplier)
                    .description(description)
                    .amount(amount)
                    .build();
        }).collect(Collectors.toList());
    }

    public Result getContractsCommonInfo(OffsetDateTime startDate, OffsetDateTime endDate) {

        List<Object[]> contractsCommonInfo = contractRepository.getContractsCommonInfo(startDate, endDate);


        List<String> days = Arrays.asList(new String[7]);

        List<String> dates = new ArrayList<>();
        List<CommonInfo> info = contractsCommonInfo.stream().map(item -> {

            Integer initialDate = Integer.parseInt(item[0].toString());
            Integer day = initialDate == 0 ? 6 : initialDate - 1;
            Long tendersCount = isNull(item[1]) ? 0 : Long.parseLong(item[1].toString());
            Long tendersCompetitiveCount = isNull(item[2]) ? 0 : Long.parseLong(item[2].toString());
            Long contractCount = isNull(item[3]) ? 0 : Long.parseLong(item[3].toString());
            Double contractAmount = isNull(item[4]) ? 0 : Double.parseDouble(item[4].toString());
            Long contractBudgetCount = isNull(item[5]) ? 0 : Long.parseLong(item[5].toString());
            String dateStr = item[6].toString();

            if (!dates.contains(dateStr)) dates.add(dateStr);
            if (!days.contains(WEEK_DAYS.get(day))) days.set(dates.indexOf(dateStr), WEEK_DAYS.get(day));

            return CommonInfo.builder()
                    .dayNumber(day)
                    .tenderCount(tendersCount)
                    .tendersCompetitiveShare(((double) tendersCompetitiveCount / tendersCount) * 100)
                    .contractsCount(contractCount)
                    .contractsAmount(contractAmount)
                    .contractBudgetShare(((double) contractBudgetCount / contractCount) * 100)
                    .build();
        }).collect(Collectors.toList());
        return Result.builder()
                .days(days)
                .dates(dates)
                .info(info)
                .build();

    }

    public List<DistributionStatistics> getRegionsProcurement(OffsetDateTime startDate, OffsetDateTime endDate) {
        List<Object[]> contractsCompetitivityRegionsInfo = contractRepository.getContractsCompetitivityRegionsInfo(startDate, endDate);

        DistributionStatistics minskStatistics = null;
        List<DistributionStatistics> regionsStatistics = new ArrayList<>();
        for (Object[] item : contractsCompetitivityRegionsInfo) {
            String region = item[0].toString();
            double totalCount = Double.parseDouble(item[1].toString());
            double totalAmount = Double.parseDouble(item[2].toString());
            double uncompetitiveCount = Double.parseDouble(item[3].toString());
            double uncompetitiveAmount = Double.parseDouble(item[4].toString());
            double competitiveCount = Double.parseDouble(item[5].toString());
            double competitiveAmount = Double.parseDouble(item[6].toString());

            DistributionStatistics distributionStatistics = DistributionStatistics.builder()
                    .key(Key.builder().ru(region).en(REGIONS_MAP.get(region)).build())
                    .contracts(Statistics
                            .builder()
                            .uncompetitive(Statistics.builder()
                                    .countShare(uncompetitiveCount / totalCount * 100)
                                    .amountShare(uncompetitiveAmount / totalAmount * 100)
                                    .build())
                            .competitive(Statistics.builder()
                                    .countShare(competitiveCount / totalCount * 100)
                                    .amountShare(competitiveAmount / totalAmount * 100)
                                    .build())
                            .build())
                    .build();
            if (region.equals("г. Минск")) {
                minskStatistics = distributionStatistics;
            } else {
                regionsStatistics.add(distributionStatistics);
            }

        }

        regionsStatistics.sort(Comparator.comparing((item) -> item.getKey().getRu()));
        Collections.reverse(regionsStatistics);
        if (nonNull(minskStatistics)) regionsStatistics.add(minskStatistics);
        return regionsStatistics;

    }

    public Map<String, List<Statistics>> getTopRegionsProcurement(OffsetDateTime startDate, OffsetDateTime endDate) {

        Map<String, List<Statistics>> result = new HashMap<>();
        List<Object[]> regionsTop10OKRBContractsInfo = contractRepository.getRegionsTop10OKRBContractsInfo(startDate, endDate);
        regionsTop10OKRBContractsInfo.forEach(item -> {
            String region = item[0].toString();
            String classification = item[1].toString();
            double totalAmount = Double.parseDouble(item[2].toString());
            if (REGIONS_MAP.keySet().contains(region)) {
                region = REGIONS_MAP.get(region);
                if (!result.containsKey(region)) {
                    result.put(region, new ArrayList<>());
                }
                result.get(region).add(Statistics
                        .builder()
                        .key(Key.builder().ru(classification).build())
                        .amount(totalAmount)
                        .build());
            }

        });
        return result;
    }


    public List<Statistics> getContractItemsCountriesAmount(OffsetDateTime startDate, OffsetDateTime endDate) {
        List<Object[]> contractItemsCountriesAmount = contractRepository.getContractItemsCountriesAmount(startDate, endDate);
        return contractItemsCountriesAmount.stream().map(item -> {
            String country = item[0].toString();
            double amount = Double.parseDouble(item[1].toString());
            String countryCode = item[2].toString();
            return Statistics.builder().key(Key.builder().ru(country).en(countryCode).build()).amount(amount).build();
        }).collect(Collectors.toList());
    }


    public Map<String, Statistics> getCountriesTOPOKRBsAmount(OffsetDateTime startDate, OffsetDateTime endDate) {
        List<Object[]> countriesTOPOKRBsAmount = contractRepository.getCountriesTOPOKRBsAmount(startDate, endDate);

        Map<String, Statistics> countriesMap = new HashMap<>();
        Map<Key, List<Statistics>> result = new HashMap<>();

        countriesTOPOKRBsAmount.forEach(item -> {
            String country = item[0].toString();
            String iso = item[1].toString();
            String description = item[2].toString();
            double amount = Double.parseDouble(item[3].toString());

            Key key = Key.builder().ru(country).en(iso).build();

            if (!result.containsKey(key)) result.put(key, new ArrayList<>());
            result.get(key).add(Statistics.builder().key(Key.builder().ru(description).build()).amount(amount).build());

        });

        result.forEach((key, value) -> countriesMap.put(key.getEn(), Statistics.builder().key(key).values(value).build()));
        return countriesMap;
    }

}
