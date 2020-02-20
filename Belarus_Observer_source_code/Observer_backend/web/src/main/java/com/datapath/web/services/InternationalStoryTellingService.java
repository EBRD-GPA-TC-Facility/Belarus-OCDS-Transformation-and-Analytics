package com.datapath.web.services;

import com.datapath.persistence.repositories.ContractRepository;
import com.datapath.web.domain.*;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.time.OffsetDateTime;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.concurrent.CompletableFuture;
import java.util.concurrent.ExecutionException;
import java.util.stream.Collectors;

import static java.util.Objects.isNull;

@Service
@Slf4j
public class InternationalStoryTellingService {

    private ContractRepository contractRepository;

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

    public InternationalStoryTellingService( ContractRepository contractRepository) {
        this.contractRepository = contractRepository;
    }

    public InternationalStoryTellingCommon getStoryTelling(OffsetDateTime startDate, OffsetDateTime endDate) {

        CompletableFuture<Statistics> avgContractAmountPerNonResidentContractFuture = CompletableFuture.supplyAsync(()
                -> this.getAvgContractAmountPerNonResidentContract(startDate, endDate));
        CompletableFuture<Statistics> amountShareOfNonResidentContractsFuture = CompletableFuture.supplyAsync(()
                -> this.getAmountShareOfNonResidentContracts(startDate, endDate));
        CompletableFuture<Statistics> contractCountPerNonResidentSupplierFuture = CompletableFuture.supplyAsync(()
                -> this.getContractCountPerNonResidentSupplier(startDate, endDate));
        CompletableFuture<Statistics> maxNonResidentContractAmountFuture = CompletableFuture.supplyAsync(()
                -> this.getMaxNonResidentContractAmount(startDate, endDate));
        CompletableFuture<List<Statistics>> topNonResidentCountriesFuture = CompletableFuture.supplyAsync(()
                -> this.getTopNonResidentCountries(startDate, endDate));
        CompletableFuture<List<Statistics>> contractsOfTopAndNonTopNonResidentCountriesFuture = CompletableFuture.supplyAsync(()
                -> this.getContractsOfTopAndNonTopNonResidentCountries(startDate, endDate));
        CompletableFuture<List<DistributionStatistics>> countriesContractsAmountCountSuppliersFuture = CompletableFuture.supplyAsync(()
                -> this.getCountriesContractsAmountCountSuppliers(startDate, endDate));
        CompletableFuture<List<DistributionStatistics>> suppliersCountriesSuppliersCountFuture = CompletableFuture.supplyAsync(()
                -> this.getSuppliersCountriesSuppliersCount(startDate, endDate));
        CompletableFuture<List<Statistics>> topResidentNonResidentOkrbsFuture = CompletableFuture.supplyAsync(()
                -> this.getTopResidentNonResidentOkrbs(startDate, endDate));
        CompletableFuture<List<Statistics>> regionsWithNonResidentSuppliersFuture = CompletableFuture.supplyAsync(()
                -> this.getRegionsWithNonResidentSuppliers(startDate, endDate));

        try {
            Statistics avgContractAmountPerNonResidentContract = avgContractAmountPerNonResidentContractFuture.get();
            Statistics amountShareOfNonResidentContracts = amountShareOfNonResidentContractsFuture.get();
            Statistics contractCountPerNonResidentSupplier = contractCountPerNonResidentSupplierFuture.get();
            Statistics maxNonResidentContractAmount = maxNonResidentContractAmountFuture.get();
            List<Statistics> topNonResidentCountries = topNonResidentCountriesFuture.get();
            List<Statistics> contractsOfTopAndNonTopNonResidentCountries = contractsOfTopAndNonTopNonResidentCountriesFuture.get();
            List<DistributionStatistics> countriesContractsAmountCountSuppliers = countriesContractsAmountCountSuppliersFuture.get();
            List<DistributionStatistics> suppliersCountriesSuppliersCount = suppliersCountriesSuppliersCountFuture.get();
            List<Statistics> topResidentNonResidentOkrbs = topResidentNonResidentOkrbsFuture.get();
            List<Statistics> regionsWithNonResidentSuppliers = regionsWithNonResidentSuppliersFuture.get();

            return InternationalStoryTellingCommon.builder()
                    .suppliersCountriesSuppliersCount(suppliersCountriesSuppliersCount)
                    .avgContractAmountPerNonResidentContract(avgContractAmountPerNonResidentContract)
                    .amountShareOfNonResidentContracts(amountShareOfNonResidentContracts)
                    .contractCountPerNonResidentSupplier(contractCountPerNonResidentSupplier)
                    .maxNonResidentContractAmount(maxNonResidentContractAmount)
                    .topNonResidentCountries(topNonResidentCountries)
                    .contractsOfTopAndNonTopNonResidentCountries(contractsOfTopAndNonTopNonResidentCountries)
                    .countriesContractsAmountCountSuppliers(countriesContractsAmountCountSuppliers)
                    .topResidentNonResidentOkrbs(topResidentNonResidentOkrbs)
                    .residentNonResidentOkrbs(topResidentNonResidentOkrbs)
                    .topResidentNonResidentOkrbs(regionsWithNonResidentSuppliers)
                    .regionsWithNonResidentSuppliers(regionsWithNonResidentSuppliers)
                    .build();
        } catch (InterruptedException e) {
            e.printStackTrace();
        } catch (ExecutionException e) {
            e.printStackTrace();
        }
        return new InternationalStoryTellingCommon();
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

    public Statistics getAvgContractAmountPerNonResidentContract(OffsetDateTime startDate, OffsetDateTime endDate) {
        Double amount = contractRepository
                .getAvgContractAmountPerNonResidentContract(startDate, endDate);
        return Statistics.builder()
                .avg(Avg.builder().perContract(amount).build())
                .build();
    }

    public Statistics getAmountShareOfNonResidentContracts(OffsetDateTime startDate, OffsetDateTime endDate) {
        Double share = contractRepository
                .getAmountShareOfNonResidentContracts(startDate, endDate);
        return Statistics.builder()
                .share(share)
                .build();
    }

    public Statistics getContractCountPerNonResidentSupplier(OffsetDateTime startDate, OffsetDateTime endDate) {
        Double count = contractRepository
                .getContractCountPerNonResidentSupplier(startDate, endDate);
        return Statistics.builder()
                .avg(Avg.builder().perSupplier(count).build())
                .build();
    }

    public Statistics getMaxNonResidentContractAmount(OffsetDateTime startDate, OffsetDateTime endDate) {
        Double amount = contractRepository
                .getMaxNonResidentContractAmount(startDate, endDate);
        return Statistics.builder()
                .amount(amount)
                .build();
    }

    public List<Statistics> getTopNonResidentCountries(OffsetDateTime startDate, OffsetDateTime endDate) {
        List<Object[]> topNonResidentCountries = contractRepository
                .getTopNonResidentCountries(startDate, endDate);
        return topNonResidentCountries.stream().map(item -> {
            String country = item[0].toString();
            double contractAmount = Double.parseDouble(item[1].toString());
            return Statistics.builder().amount(contractAmount).key(Key.builder().ru(country).build()).build();
        }).collect(Collectors.toList());
    }

    public List<Statistics> getContractsOfTopAndNonTopNonResidentCountries(OffsetDateTime startDate, OffsetDateTime endDate) {
        Object[] item = contractRepository
                .getContractsOfTopAndNonTopNonResidentCountries(startDate, endDate).get(0);

        double topAmount = Double.parseDouble(item[0].toString());
        double nonTopAmount = Double.parseDouble(item[1].toString());

        return Arrays.asList(
                Statistics.builder().key(Key.builder().en("top").build()).amount(topAmount).build(),
                Statistics.builder().key(Key.builder().en("nonTop").build()).amount(nonTopAmount).build()
        );
    }

    public List<DistributionStatistics> getCountriesContractsAmountCountSuppliers(OffsetDateTime startDate, OffsetDateTime endDate) {
        List<Object[]> countriesContractsAmountCountSuppliers = contractRepository
                .getCountriesContractsAmountCountSuppliers(startDate, endDate);
        return countriesContractsAmountCountSuppliers.stream().map(item -> {
            String country = item[0].toString();
            double contractAmount = Double.parseDouble(item[1].toString());
            long contractsCount = Long.parseLong(item[2].toString());
            long suppliersCount = Long.parseLong(item[3].toString());
            return DistributionStatistics.builder()
                    .key(Key.builder().ru(country).build())
                    .contracts(Statistics.builder().count(contractsCount).amount(contractAmount).build())
                    .suppliers(Statistics.builder().count(suppliersCount).build())
                    .build();
        }).collect(Collectors.toList());
    }

    public List<Statistics> getTopResidentNonResidentOkrbs(OffsetDateTime startDate, OffsetDateTime endDate) {
        List<Object[]> topResidentNonResidentOkrbs = contractRepository
                .getTopResidentNonResidentOkrbs(startDate, endDate);
        return topResidentNonResidentOkrbs.stream().map(item -> {
            String name = item[0].toString();
            double residentContractAmount = isNull(item[1]) ? 0 : Double.parseDouble(item[1].toString());
            double nonResidentContractAmount = isNull(item[2]) ? 0 : Double.parseDouble(item[2].toString());

            return Statistics.builder()
                    .key(Key.builder().ru(name).build())
                    .resident(Statistics.builder().amount(residentContractAmount).build())
                    .nonResident(Statistics.builder().amount(nonResidentContractAmount).build())
                    .build();
        }).collect(Collectors.toList());
    }

    public List<Statistics> getRegionsWithNonResidentSuppliers(OffsetDateTime startDate, OffsetDateTime endDate) {
        List<Object[]> regionsWithNonResidentSuppliers = contractRepository
                .getRegionsWithNonResidentSuppliers(startDate, endDate);
        return regionsWithNonResidentSuppliers.stream().map(item -> {
            String name = item[0].toString();
            double contractAmount = isNull(item[1]) ? 0 : Double.parseDouble(item[1].toString());

            return Statistics.builder()
                    .key(Key.builder().ru(name).en(REGIONS_MAP.get(name)).build())
                    .amount(contractAmount)
                    .build();
        }).collect(Collectors.toList());
    }


}
