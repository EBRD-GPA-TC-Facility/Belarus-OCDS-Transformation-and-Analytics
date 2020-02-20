package com.datapath.web.services;

import com.datapath.persistence.repositories.ContractRepository;
import com.datapath.web.domain.Avg;
import com.datapath.web.domain.Key;
import com.datapath.web.domain.Statistics;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.time.OffsetDateTime;
import java.util.*;
import java.util.stream.Collectors;

@Service
@Slf4j
public class StatisticsContractsPageService {

    private ContractRepository contractRepository;

    public StatisticsContractsPageService(
            ContractRepository contractRepository) {
        this.contractRepository = contractRepository;
    }

    public Statistics getKPIContractsAmount(OffsetDateTime startDate, OffsetDateTime endDate) {
        Double contractsAmount = contractRepository.getContractsAmount(startDate, endDate);
        List<Object[]> tendersCountByDate = contractRepository.getContractsAmountDatesByMonthAmount(startDate, endDate);

        List<Statistics> dates = tendersCountByDate.stream().map(item -> {
            String date = item[0].toString().substring(0, 7);
            Double dateAmount = Double.parseDouble(item[1].toString());
            return Statistics.builder().date(date).amount(dateAmount).build();
        }).collect(Collectors.toList());
        return Statistics.builder().amount(contractsAmount).dates(dates).build();
    }

    public Statistics getKPIContractsCountPerSupplier(OffsetDateTime startDate, OffsetDateTime endDate) {
        Double avgContractCountPerSupplier = contractRepository.getAvgContractCountPerSupplier(startDate, endDate);
        List<Object[]> avgContractAmountPerSupplierByDates = contractRepository.getAvgContractCountPerSupplierByDates(startDate, endDate);
        List<Statistics> dates = avgContractAmountPerSupplierByDates.stream().map(item -> {
            String date = item[0].toString().substring(0, 7);
            double avgACount = Double.parseDouble(item[1].toString());
            return Statistics.builder().date(date).avg(Avg.builder().perSupplier(avgACount).build()).build();
        }).collect(Collectors.toList());
        return Statistics.builder().avg(Avg.builder().perBuyer(avgContractCountPerSupplier).build()).dates(dates).build();
    }

    public List<Statistics> getProcedureTypesContractsAmount(OffsetDateTime startDate, OffsetDateTime endDate) {
        Map<String, List<Statistics>> result = new HashMap<>();

        List<Object[]> procedureTypesContractsCount = contractRepository.getProcedureTypesContractsAmount(startDate, endDate);
        procedureTypesContractsCount.forEach(item -> {
            String date = item[0].toString().substring(0, 7);
            String procedureType = item[1].toString();
            String procedureTypeRu = item[2].toString();
            Double amount = Double.parseDouble(item[3].toString());

            if (!result.containsKey(date)) result.put(date, new ArrayList<>());
            result.get(date).add(Statistics.builder()
                    .key(Key.builder().en(procedureType).ru(procedureTypeRu).build())
                    .amount(amount)
                    .build());
        });
        return result.entrySet().stream().map(item -> {
            String date = item.getKey();
            return Statistics.builder().date(date).values(item.getValue()).build();
        }).collect(Collectors.toList());

    }

    public Statistics getContractsCompetitiveCountAmount(OffsetDateTime startDate, OffsetDateTime endDate) {
        List<Object[]> contractsCompetitivityCountAmount = contractRepository.getContractsCompetitivityCountAmount(startDate, endDate);
        Statistics statistics = new Statistics();
        contractsCompetitivityCountAmount.forEach(item -> {
            Boolean competitive = Boolean.parseBoolean(item[0].toString());
            Long count = Long.parseLong(item[1].toString());
            Double amount = Double.parseDouble(item[2].toString());
            if (competitive) {
                statistics.setCompetitive(Statistics.builder().count(count).amount(amount).build());
            } else {
                statistics.setUncompetitive(Statistics.builder().count(count).amount(amount).build());
            }
        });
        return statistics;
    }

    public List<Statistics> getDatesContractsCompetitiveCountAmount(OffsetDateTime startDate, OffsetDateTime endDate) {
        List<Object[]> contractsCompetitivityCountAmount = contractRepository.getDatesContractsCompetitivityCountAmount(startDate, endDate);
        Map<String, Statistics> result = new HashMap<>();
        contractsCompetitivityCountAmount.forEach(item -> {
            String date = item[0].toString().substring(0, 7);
            Boolean competitive = Boolean.parseBoolean(item[1].toString());
            Long count = Long.parseLong(item[2].toString());
            Double amount = Double.parseDouble(item[3].toString());
            if (!result.containsKey(date)) result.put(date, Statistics.builder().date(date).build());
            if (competitive) {
                result.get(date).setCompetitive(Statistics.builder().count(count).amount(amount).build());
            } else {
                result.get(date).setUncompetitive(Statistics.builder().count(count).amount(amount).build());
            }
        });
        return new ArrayList<>(result.values())
                .stream()
                .sorted(Comparator.comparing(Statistics::getDate)).collect(Collectors.toList());
    }

    public List<Statistics> getSuppliersByScaleCount(OffsetDateTime startDate, OffsetDateTime endDate) {
        List<Object[]> suppliersByScaleCount = contractRepository.getSuppliersByScaleCount(startDate, endDate);
        Map<String, String> scales = new HashMap<String, String>() {{
            put("micro", "Микро");
            put("mini", "Малые");
            put("medium", "Средние");
        }};


        List<Statistics> resultList = Arrays.asList(new Statistics[3]);
        suppliersByScaleCount.forEach(item -> {
            String scale = item[0].toString();
            Double amount = Double.parseDouble(item[1].toString());
            int index;
            switch (scale) {
                case "micro":
                    index = 0;
                    break;
                case "mini":
                    index = 1;
                    break;
                case "medium":
                    index = 2;
                    break;
                default:
                    index = 0;
            }
            resultList.set(index,
                    Statistics.builder().key(Key.builder().en(scale).ru(scales.get(scale)).build()).amount(amount).build());
        });

        return resultList;
    }

}
