package com.datapath.web.services;

import com.datapath.persistence.repositories.ContractRepository;
import com.datapath.web.domain.*;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.time.OffsetDateTime;
import java.util.List;
import java.util.concurrent.CompletableFuture;
import java.util.concurrent.ExecutionException;

import static java.util.Objects.isNull;
import static java.util.Objects.nonNull;

@Service
@Slf4j

public class CommonStatisticsService {

    private StatisticsContractsPageService statisticsContractsPageService;
    private StatisticsMarketPageService statisticsMarketPageService;
    private StatisticsProceduresPageService statisticsProceduresPageService;
    private ContractRepository contractRepository;

    CommonStatistics kpisProceduresCountContractsAmountContractsCountPerSupplierBuyersSuppliersCount;
    CommonStatistics kpisShareCompleteLotsLotsForSmallScaleBusinessGSWCount;
    CommonStatistics contractsCompetitiveCountAmountDatesCompetitiveCountAmountSuppliersScaleAmountBudgetAmountShare;
    CommonStatistics classificationAvgPerBuyerTopByContractsAmountRegionsWithTopCountAmountOKRB;
    CommonStatistics buyersSuppliers;
    CommonStatistics averages;

    public CommonStatisticsService(
            StatisticsContractsPageService statisticsContractsPageService,
            StatisticsMarketPageService statisticsMarketPageService,
            StatisticsProceduresPageService statisticsProceduresPageService,
            ContractRepository contractRepository) {
        this.statisticsContractsPageService = statisticsContractsPageService;
        this.statisticsMarketPageService = statisticsMarketPageService;
        this.statisticsProceduresPageService = statisticsProceduresPageService;
        this.contractRepository = contractRepository;
    }

    public void updatePrecountedInfo() {
        OffsetDateTime contractMaxDate = contractRepository.getMaxDateCreated();
        if (isNull(contractMaxDate)) return;
        OffsetDateTime end = contractMaxDate;
        OffsetDateTime start = end.minusYears(1);
        this.kpisProceduresCountContractsAmountContractsCountPerSupplierBuyersSuppliersCount =
                getKPIsProceduresCountContractsAmountContractsCountPerSupplierBuyersSuppliersCount(start, end);
        this.kpisShareCompleteLotsLotsForSmallScaleBusinessGSWCount =
                getKPIsShareCompleteLotsLotsForSmallScaleBusinessGSWCount(start, end);
        this.contractsCompetitiveCountAmountDatesCompetitiveCountAmountSuppliersScaleAmountBudgetAmountShare =
                getContractsCompetitiveCountAmountDatesCompetitiveCountAmountSuppliersScaleAmountBudgetAmountShare(start, end);
        this.classificationAvgPerBuyerTopByContractsAmountRegionsWithTopCountAmountOKRB =
                getClassificationAvgPerBuyerTopByContractsAmountRegionsWithTopCountAmountOKRB(start, end);
        this.buyersSuppliers = getBuyersSuppliers(start, end);
        this.averages = getAverages(start, end);
    }

    public CommonStatistics getKPIsProceduresCountContractsAmountContractsCountPerSupplierBuyersSuppliersCount(OffsetDateTime startDate, OffsetDateTime endDate) {

        if (nonNull(this.kpisProceduresCountContractsAmountContractsCountPerSupplierBuyersSuppliersCount)) {
            return this.kpisProceduresCountContractsAmountContractsCountPerSupplierBuyersSuppliersCount;
        }

        CompletableFuture<Statistics> kpi1 = CompletableFuture.supplyAsync(()
                -> this.statisticsProceduresPageService.getKPIProceduresCount(startDate, endDate));
        CompletableFuture<Statistics> kpi2 = CompletableFuture.supplyAsync(()
                -> this.statisticsContractsPageService.getKPIContractsAmount(startDate, endDate));
        CompletableFuture<Statistics> kpi3 = CompletableFuture.supplyAsync(()
                -> this.statisticsContractsPageService.getKPIContractsCountPerSupplier(startDate, endDate));
        CompletableFuture<Statistics> kpi4 = CompletableFuture.supplyAsync(()
                -> this.statisticsMarketPageService.getKPIBuyersSuppliersCount(startDate, endDate));

        try {
            Statistics kpiProceduresCount = kpi1.get();
            Statistics kpiContractsAmount = kpi2.get();
            Statistics kpiContractsCountPerSupplier = kpi3.get();
            Statistics kpiBuyersSuppliersCount = kpi4.get();
            return CommonStatistics.builder()
                    .kpiBuyersSuppliersCount(kpiBuyersSuppliersCount)
                    .kpiContractsAmount(kpiContractsAmount)
                    .kpiProceduresCount(kpiProceduresCount)
                    .kpiContractsCountPerSupplier(kpiContractsCountPerSupplier)
                    .build();
        } catch (InterruptedException e) {
            e.printStackTrace();
        } catch (ExecutionException e) {
            e.printStackTrace();
        }
        return new CommonStatistics();
    }

    public CommonStatistics getKPIsShareCompleteLotsLotsForSmallScaleBusinessGSWCount(OffsetDateTime startDate, OffsetDateTime endDate) {

        if (nonNull(this.kpisShareCompleteLotsLotsForSmallScaleBusinessGSWCount)) {
            return this.kpisShareCompleteLotsLotsForSmallScaleBusinessGSWCount;
        }

        CompletableFuture<Statistics> kpi1 = CompletableFuture.supplyAsync(()
                -> this.statisticsProceduresPageService.getKPIShareCompleteLots(startDate, endDate));
        CompletableFuture<Statistics> kpi2 = CompletableFuture.supplyAsync(()
                -> this.statisticsMarketPageService.getLotsForSmallScaleBusiness(startDate, endDate));
        CompletableFuture<Statistics> kpi3 = CompletableFuture.supplyAsync(()
                -> this.statisticsMarketPageService.getKPIGSWCount(startDate, endDate));
        try {
            Statistics kpiShareCompleteLots = kpi1.get();
            Statistics kpiLotsForSmallScaleBusiness = kpi2.get();
            Statistics kpiGSWCount = kpi3.get();
            return CommonStatistics.builder()
                    .kpiShareCompleteLots(kpiShareCompleteLots)
                    .kpiLotsForSmallScaleBusiness(kpiLotsForSmallScaleBusiness)
                    .kpiGSWCount(kpiGSWCount)
                    .build();
        } catch (InterruptedException e) {
            e.printStackTrace();
        } catch (ExecutionException e) {
            e.printStackTrace();
        }
        return new CommonStatistics();
    }

    public CommonStatistics getContractsCompetitiveCountAmountDatesCompetitiveCountAmountSuppliersScaleAmountBudgetAmountShare(OffsetDateTime startDate, OffsetDateTime endDate) {


        if (nonNull(this.contractsCompetitiveCountAmountDatesCompetitiveCountAmountSuppliersScaleAmountBudgetAmountShare)) {
            return this.contractsCompetitiveCountAmountDatesCompetitiveCountAmountSuppliersScaleAmountBudgetAmountShare;
        }
        CompletableFuture<List<Statistics>> datesContractsCompetitiveCountAmountFuture = CompletableFuture.supplyAsync(()
                -> this.statisticsContractsPageService.getDatesContractsCompetitiveCountAmount(startDate, endDate));
        CompletableFuture<Statistics> contractsCompetitiveCountAmountFuture = CompletableFuture.supplyAsync(()
                -> this.statisticsContractsPageService.getContractsCompetitiveCountAmount(startDate, endDate));
        CompletableFuture<Statistics> budgetAmountShareFuture = CompletableFuture.supplyAsync(()
                -> this.statisticsMarketPageService.getBudgetAmountShare(startDate, endDate));
        CompletableFuture<List<Statistics>> procedureTypesContractsAmountFuture = CompletableFuture.supplyAsync(()
                -> this.statisticsContractsPageService.getProcedureTypesContractsAmount(startDate, endDate));
        CompletableFuture<DistributionStatistics> contractsPerBuyerCountAmountFuture = CompletableFuture.supplyAsync(()
                -> this.statisticsMarketPageService.getKPIContractsPerBuyerCountAmount(startDate, endDate));
        try {
            List<Statistics> datesContractsCompetitiveCountAmount = datesContractsCompetitiveCountAmountFuture.get();
            Statistics contractsCompetitiveCountAmount = contractsCompetitiveCountAmountFuture.get();
            Statistics budgetAmountShare = budgetAmountShareFuture.get();
            List<Statistics> procedureTypesContractsAmount = procedureTypesContractsAmountFuture.get();
            DistributionStatistics contractsPerBuyerCountAmount = contractsPerBuyerCountAmountFuture.get();
            return CommonStatistics.builder()
                    .datesContractsCompetitiveCountAmount(datesContractsCompetitiveCountAmount)
                    .contractsCompetitiveCountAmount(contractsCompetitiveCountAmount)
                    .budgetAmountShare(budgetAmountShare)
                    .procedureTypesContractsAmount(procedureTypesContractsAmount)
                    .contractsPerBuyerCountAmount(contractsPerBuyerCountAmount)
                    .build();
        } catch (InterruptedException e) {
            e.printStackTrace();
        } catch (ExecutionException e) {
            e.printStackTrace();
        }
        return new CommonStatistics();
    }

    public CommonStatistics getClassificationAvgPerBuyerTopByContractsAmountRegionsWithTopCountAmountOKRB(OffsetDateTime startDate, OffsetDateTime endDate) {

        if (nonNull(this.classificationAvgPerBuyerTopByContractsAmountRegionsWithTopCountAmountOKRB)) {
            return this.classificationAvgPerBuyerTopByContractsAmountRegionsWithTopCountAmountOKRB;
        }

        CompletableFuture<Statistics> classificationAvgPerBuyerFuture = CompletableFuture.supplyAsync(()
                -> this.statisticsMarketPageService.getClassificationAvgPerBuyer(startDate, endDate));
        CompletableFuture<List<OKRB>> topOKRBByContractsAmountFuture = CompletableFuture.supplyAsync(()
                -> this.statisticsMarketPageService.getTopOKRBByContractsAmount(startDate, endDate));
        CompletableFuture<List<OKRB>> regionsWithTopCountOKRBFuture = CompletableFuture.supplyAsync(()
                -> this.statisticsMarketPageService.getRegionsWithTopCountOKRB(startDate, endDate));
        CompletableFuture<List<OKRB>> regionsWithTopAmountOKRBFuture = CompletableFuture.supplyAsync(()
                -> this.statisticsMarketPageService.getRegionsWithTopAmountOKRB(startDate, endDate));
        try {
            Statistics classificationAvgPerBuyer = classificationAvgPerBuyerFuture.get();
            List<OKRB> topOKRBByContractsAmount = topOKRBByContractsAmountFuture.get();
            List<OKRB> regionsWithTopCountOKRB = regionsWithTopCountOKRBFuture.get();
            List<OKRB> regionsWithTopAmountOKRB = regionsWithTopAmountOKRBFuture.get();
            return CommonStatistics.builder()
                    .classificationAvgPerBuyer(classificationAvgPerBuyer)
                    .topOKRBByContractsAmount(topOKRBByContractsAmount)
                    .regionsWithTopAmountOKRB(regionsWithTopAmountOKRB)
                    .regionsWithTopCountOKRB(regionsWithTopCountOKRB)
                    .build();
        } catch (InterruptedException e) {
            e.printStackTrace();
        } catch (ExecutionException e) {
            e.printStackTrace();
        }
        return new CommonStatistics();
    }

    public CommonStatistics getBuyersSuppliers(OffsetDateTime startDate, OffsetDateTime endDate) {

        if (nonNull(this.buyersSuppliers)) {
            return this.buyersSuppliers;
        }

        CompletableFuture<List<DistributionStatistics>> buyersCapitalBuyerCountFuture = CompletableFuture.supplyAsync(()
                -> this.statisticsMarketPageService.getBuyersCapitalBuyerCount(startDate, endDate));
        CompletableFuture<List<DistributionStatistics>> buyersRegionBuyerCountFuture = CompletableFuture.supplyAsync(()
                -> this.statisticsMarketPageService.getBuyersRegionBuyerCount(startDate, endDate));
        CompletableFuture<List<Buyer>> topCompetitiveBuyersByContractsAmountFuture = CompletableFuture.supplyAsync(()
                -> this.statisticsMarketPageService.getTopCompetitiveBuyersByContractsAmount(startDate, endDate));
        CompletableFuture<Statistics> top10SuppliersShareByContractCountFuture = CompletableFuture.supplyAsync(()
                -> this.statisticsMarketPageService.top10SuppliersShareByContractCount(startDate, endDate));
        CompletableFuture<Statistics> top10SuppliersShareByContractAmountFuture = CompletableFuture.supplyAsync(()
                -> this.statisticsMarketPageService.top10SuppliersShareByContractAmount(startDate, endDate));
        CompletableFuture<List<Statistics>> residencyDistributionFuture = CompletableFuture.supplyAsync(()
                -> this.statisticsMarketPageService.getResidencyDistribution(startDate, endDate));
        CompletableFuture<List<DistributionStatistics>> suppliersCountriesSuppliersCountFuture = CompletableFuture.supplyAsync(()
                -> this.statisticsMarketPageService.getSuppliersCountriesSuppliersCount(startDate, endDate));
        CompletableFuture<List<Statistics>> suppliersByScaleCountFuture = CompletableFuture.supplyAsync(()
                -> this.statisticsContractsPageService.getSuppliersByScaleCount(startDate, endDate));

        try {
            List<DistributionStatistics> buyersCapitalBuyerCount = buyersCapitalBuyerCountFuture.get();
            List<DistributionStatistics> buyersRegionBuyerCount = buyersRegionBuyerCountFuture.get();
            List<Buyer> topCompetitiveBuyersByContractsAmount = topCompetitiveBuyersByContractsAmountFuture.get();
            Statistics top10SuppliersShareByContractCount = top10SuppliersShareByContractCountFuture.get();
            Statistics top10SuppliersShareByContractAmount = top10SuppliersShareByContractAmountFuture.get();
            List<DistributionStatistics> suppliersCountriesSuppliersCount = suppliersCountriesSuppliersCountFuture.get();
            List<Statistics> residencyDistribution = residencyDistributionFuture.get();
            List<Statistics> suppliersByScaleAmount = suppliersByScaleCountFuture.get();
            return CommonStatistics.builder()
                    .buyersCapitalBuyerCount(buyersCapitalBuyerCount)
                    .buyersRegionBuyerCount(buyersRegionBuyerCount)
                    .topCompetitiveBuyersByContractsAmount(topCompetitiveBuyersByContractsAmount)
                    .top10SuppliersShareByContractCount(top10SuppliersShareByContractCount)
                    .top10SuppliersShareByContractAmount(top10SuppliersShareByContractAmount)
                    .suppliersCountriesSuppliersCount(suppliersCountriesSuppliersCount)
                    .residencyDistribution(residencyDistribution)
                    .suppliersByScaleAmount(suppliersByScaleAmount)
                    .build();
        } catch (InterruptedException e) {
            e.printStackTrace();
        } catch (ExecutionException e) {
            e.printStackTrace();
        }
        return new CommonStatistics();
    }

    public CommonStatistics getAverages(OffsetDateTime startDate, OffsetDateTime endDate) {

        if (nonNull(this.averages)) {
            return this.averages;
        }

        CompletableFuture<Statistics> enquiriesPerProcedureFuture = CompletableFuture.supplyAsync(()
                -> this.statisticsProceduresPageService.getEnquiriesPerProcedure(startDate, endDate));
        CompletableFuture<Statistics> proceduresCountPerMonthFuture = CompletableFuture.supplyAsync(()
                -> this.statisticsProceduresPageService.getProceduresCountPerMonth(startDate, endDate));

        try {
            Statistics enquiriesPerProcedure = enquiriesPerProcedureFuture.get();
            Statistics proceduresCountPerMonth = proceduresCountPerMonthFuture.get();

            return CommonStatistics.builder()
                    .enquiriesPerProcedure(enquiriesPerProcedure)
                    .proceduresCountPerMonth(proceduresCountPerMonth)
                    .build();
        } catch (InterruptedException e) {
            e.printStackTrace();
        } catch (ExecutionException e) {
            e.printStackTrace();
        }
        return new CommonStatistics();
    }

}
