package com.datapath.web.controllers;

import com.datapath.persistence.repositories.ContractRepository;
import com.datapath.web.domain.CommonStatistics;
import com.datapath.web.services.CommonStatisticsService;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import java.time.OffsetDateTime;

import static com.datapath.persistence.utils.DateTimeUtils.parseOffsetDateTime;
import static java.util.Objects.isNull;

@RestController
@CrossOrigin
@RequestMapping(value = "api/belarus-analytics/v1/common-statistics-combinations", produces = MediaType.APPLICATION_JSON_VALUE)
public class CommonStatisticsCombinationsController {

    private CommonStatisticsService commonStatisticsService;


    private ContractRepository contractRepository;


    public CommonStatisticsCombinationsController(CommonStatisticsService commonStatisticsService,
                                                  ContractRepository contractRepository) {
        this.contractRepository = contractRepository;
        this.commonStatisticsService = commonStatisticsService;
    }

    @RequestMapping(value = "kpis/proceduresCount-contractsAmount-contractsCountPerSupplier-buyersSuppliersCount", method = RequestMethod.GET)
    public CommonStatistics getKPIsProceduresCountContractsAmountContractsCountPerSupplierBuyersSuppliersCount(
            @RequestParam(required = false) String startDate,
            @RequestParam(required = false) String endDate) {
        OffsetDateTime end = isNull(endDate) ? contractRepository.getMaxDateCreated() : parseOffsetDateTime(endDate);
        OffsetDateTime start = isNull(startDate) ? end.minusYears(1) : parseOffsetDateTime(startDate);return commonStatisticsService.getKPIsProceduresCountContractsAmountContractsCountPerSupplierBuyersSuppliersCount(start, end);
    }

    @RequestMapping(value = "kpis/shareCompleteLots-kpiLotsForSmallScaleBusiness-kpiGSWCount", method = RequestMethod.GET)
    public CommonStatistics getKPIsShareCompleteLotsLotsForSmallScaleBusinessGSWCount(
            @RequestParam(required = false) String startDate,
            @RequestParam(required = false) String endDate) {
        OffsetDateTime end = isNull(endDate) ? contractRepository.getMaxDateCreated() : parseOffsetDateTime(endDate);
        OffsetDateTime start = isNull(startDate) ? end.minusYears(1) : parseOffsetDateTime(startDate);
        return commonStatisticsService.getKPIsShareCompleteLotsLotsForSmallScaleBusinessGSWCount(start, end);
    }

    @RequestMapping(value = "contracts/competitiveCountAmount-datesCompetitiveCountAmount-BySuppliersScaleAmount-budgetAmountShare", method = RequestMethod.GET)
    public CommonStatistics getContractsCompetitiveCountAmountDatesCompetitiveCountAmountSuppliersScaleAmountBudgetAmountShare(
            @RequestParam(required = false) String startDate,
            @RequestParam(required = false) String endDate) {
        OffsetDateTime end = isNull(endDate) ? contractRepository.getMaxDateCreated() : parseOffsetDateTime(endDate);
        OffsetDateTime start = isNull(startDate) ? end.minusYears(1) : parseOffsetDateTime(startDate);
        return commonStatisticsService.getContractsCompetitiveCountAmountDatesCompetitiveCountAmountSuppliersScaleAmountBudgetAmountShare(start, end);
    }

    @RequestMapping(value = "classification/avgPerBuyer-topByContractsAmount-regionsWithTopCountOKRB-regionsWithTopAmountOKRB", method = RequestMethod.GET)
    public CommonStatistics getClassificationAvgPerBuyerTopByContractsAmountRegionsWithTopCountAmountOKRB(
            @RequestParam(required = false) String startDate,
            @RequestParam(required = false) String endDate) {
        OffsetDateTime end = isNull(endDate) ? contractRepository.getMaxDateCreated() : parseOffsetDateTime(endDate);
        OffsetDateTime start = isNull(startDate) ? end.minusYears(1) : parseOffsetDateTime(startDate);
        return commonStatisticsService.getClassificationAvgPerBuyerTopByContractsAmountRegionsWithTopCountAmountOKRB(start, end);
    }

    @RequestMapping(value = "buyers-suppliers/buyersCapital-buyersRegion-topCompetitiveBuyers-top10SuppliersShareByCount-top10SuppliersShareByAmount-suppliersCountries-residency-scaleCount", method = RequestMethod.GET)
    public CommonStatistics getBuyersSuppliers(
            @RequestParam(required = false) String startDate,
            @RequestParam(required = false) String endDate) {
        OffsetDateTime end = isNull(endDate) ? contractRepository.getMaxDateCreated() : parseOffsetDateTime(endDate);
        OffsetDateTime start = isNull(startDate) ? end.minusYears(1) : parseOffsetDateTime(startDate);
        return commonStatisticsService.getBuyersSuppliers(start, end);
    }

    @RequestMapping(value = "averages/enquiriesPerProcedure-proceduresCountPerMonth", method = RequestMethod.GET)
    public CommonStatistics getAverages(
            @RequestParam(required = false) String startDate,
            @RequestParam(required = false) String endDate) {
        OffsetDateTime end = isNull(endDate) ? contractRepository.getMaxDateCreated() : parseOffsetDateTime(endDate);
        OffsetDateTime start = isNull(startDate) ? end.minusYears(1) : parseOffsetDateTime(startDate);
        return commonStatisticsService.getAverages(start, end);
    }

}
