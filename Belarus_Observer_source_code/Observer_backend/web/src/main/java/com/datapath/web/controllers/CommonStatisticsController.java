package com.datapath.web.controllers;

import com.datapath.persistence.repositories.ContractRepository;
import com.datapath.persistence.repositories.TenderRepository;
import com.datapath.web.domain.*;
import com.datapath.web.services.CommonStatisticsService;
import com.datapath.web.services.StatisticsContractsPageService;
import com.datapath.web.services.StatisticsMarketPageService;
import com.datapath.web.services.StatisticsProceduresPageService;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import java.time.OffsetDateTime;
import java.util.List;

import static com.datapath.persistence.utils.DateTimeUtils.parseOffsetDateTime;
import static java.util.Objects.isNull;

@RestController
@CrossOrigin
@RequestMapping(value = "api/belarus-analytics/v1/common-statistics", produces = MediaType.APPLICATION_JSON_VALUE)
public class CommonStatisticsController {

    private StatisticsContractsPageService statisticsContractsPageService;
    private StatisticsMarketPageService statisticsMarketPageService;
    private StatisticsProceduresPageService statisticsProceduresPageService;
    private CommonStatisticsService commonStatisticsService;


    private ContractRepository contractRepository;
    private TenderRepository tenderRepository;


    public CommonStatisticsController(StatisticsContractsPageService statisticsContractsPageService,
                                      StatisticsMarketPageService statisticsMarketPageService,
                                      StatisticsProceduresPageService statisticsProceduresPageService,
                                      CommonStatisticsService commonStatisticsService,
                                      TenderRepository tenderRepository,
                                      ContractRepository contractRepository) {
        this.statisticsContractsPageService = statisticsContractsPageService;
        this.contractRepository = contractRepository;
        this.tenderRepository = tenderRepository;
        this.statisticsMarketPageService = statisticsMarketPageService;
        this.statisticsProceduresPageService = statisticsProceduresPageService;
        this.commonStatisticsService = commonStatisticsService;
    }

    @RequestMapping(value = "kpi/procedures/count", method = RequestMethod.GET)
    public Statistics getKPIProceduresCount(@RequestParam(required = false) String startDate,
                                            @RequestParam(required = false) String endDate) {
        OffsetDateTime end = isNull(endDate) ? tenderRepository.getMaxDatePublished() : parseOffsetDateTime(endDate);
        OffsetDateTime start = isNull(startDate) ? end.minusYears(1) : parseOffsetDateTime(startDate);
        return statisticsProceduresPageService.getKPIProceduresCount(start, end);
    }

    @RequestMapping(value = "procedures/count/per-month", method = RequestMethod.GET)
    public Statistics getProceduresCountPerMont(@RequestParam(required = false) String startDate,
                                                @RequestParam(required = false) String endDate) {
        OffsetDateTime end = isNull(endDate) ? tenderRepository.getMaxDatePublished() : parseOffsetDateTime(endDate);
        OffsetDateTime start = isNull(startDate) ? end.minusYears(1) : parseOffsetDateTime(startDate);
        return statisticsProceduresPageService.getProceduresCountPerMonth(start, end);
    }

    @RequestMapping(value = "kpi/contracts/amount", method = RequestMethod.GET)
    public Statistics getKPIContractsAmount(@RequestParam(required = false) String startDate,
                                            @RequestParam(required = false) String endDate) {
        OffsetDateTime end = isNull(endDate) ? contractRepository.getMaxDateCreated() : parseOffsetDateTime(endDate);
        OffsetDateTime start = isNull(startDate) ? end.minusYears(1) : parseOffsetDateTime(startDate);
        return statisticsContractsPageService.getKPIContractsAmount(start, end);
    }

    @RequestMapping(value = "kpi/contracts/count/avg/per-supplier", method = RequestMethod.GET)
    public Statistics getKPIContractsCountPerSupplier(@RequestParam(required = false) String startDate,
                                                      @RequestParam(required = false) String endDate) {
        OffsetDateTime end = isNull(endDate) ? contractRepository.getMaxDateCreated() : parseOffsetDateTime(endDate);
        OffsetDateTime start = isNull(startDate) ? end.minusYears(1) : parseOffsetDateTime(startDate);
        return statisticsContractsPageService.getKPIContractsCountPerSupplier(start, end);
    }

    @RequestMapping(value = "kpis/proceduresCount-contractsAmount-contractsCountPerSupplier-buyersSuppliersCount", method = RequestMethod.GET)
    public CommonStatistics getKPIsProceduresCountContractsAmountContractsCountPerSupplierBuyersSuppliersCount(
            @RequestParam(required = false) String startDate,
            @RequestParam(required = false) String endDate) {
        OffsetDateTime end = isNull(endDate) ? contractRepository.getMaxDateCreated() : parseOffsetDateTime(endDate);
        OffsetDateTime start = isNull(startDate) ? end.minusYears(1) : parseOffsetDateTime(startDate);
        return commonStatisticsService.getKPIsProceduresCountContractsAmountContractsCountPerSupplierBuyersSuppliersCount(start, end);
    }

    @RequestMapping(value = "kpi/lots/completed-share", method = RequestMethod.GET)
    public Statistics getKPIShareCompleteLots(@RequestParam(required = false) String startDate,
                                              @RequestParam(required = false) String endDate) {
        OffsetDateTime end = isNull(endDate) ? tenderRepository.getMaxDatePublished() : parseOffsetDateTime(endDate);
        OffsetDateTime start = isNull(startDate) ? end.minusYears(1) : parseOffsetDateTime(startDate);
        return statisticsProceduresPageService.getKPIShareCompleteLots(start, end);
    }

    @RequestMapping(value = "dates/buyers-avg-contracts", method = RequestMethod.GET)
    public DistributionStatistics getKPIContractsPerBuyerCountAmount(@RequestParam(required = false) String startDate,
                                                                     @RequestParam(required = false) String endDate) {
        OffsetDateTime end = isNull(endDate) ? tenderRepository.getMaxDatePublished() : parseOffsetDateTime(endDate);
        OffsetDateTime start = isNull(startDate) ? end.minusYears(1) : parseOffsetDateTime(startDate);
        return statisticsMarketPageService.getKPIContractsPerBuyerCountAmount(start, end);
    }

    @RequestMapping(value = "kpi/buyers-suppliers/count", method = RequestMethod.GET)
    public Statistics getKPIBuyersSuppliersCount(@RequestParam(required = false) String startDate,
                                                 @RequestParam(required = false) String endDate) {
        OffsetDateTime end = isNull(endDate) ? tenderRepository.getMaxDatePublished() : parseOffsetDateTime(endDate);
        OffsetDateTime start = isNull(startDate) ? end.minusYears(1) : parseOffsetDateTime(startDate);
        return statisticsMarketPageService.getKPIBuyersSuppliersCount(start, end);
    }

    @RequestMapping(value = "kpi/contracts/gsw/count", method = RequestMethod.GET)
    public Statistics getKPIContractsGSWCount(@RequestParam(required = false) String startDate,
                                              @RequestParam(required = false) String endDate) {
        OffsetDateTime end = isNull(endDate) ? tenderRepository.getMaxDatePublished() : parseOffsetDateTime(endDate);
        OffsetDateTime start = isNull(startDate) ? end.minusYears(1) : parseOffsetDateTime(startDate);
        return statisticsMarketPageService.getKPIGSWCount(start, end);
    }

    @RequestMapping(value = "enquiries/avg-per-procedure", method = RequestMethod.GET)
    public Statistics getEnquiriesPerProcedure(@RequestParam(required = false) String startDate,
                                               @RequestParam(required = false) String endDate) {
        OffsetDateTime end = isNull(endDate) ? tenderRepository.getMaxDatePublished() : parseOffsetDateTime(endDate);
        OffsetDateTime start = isNull(startDate) ? end.minusYears(1) : parseOffsetDateTime(startDate);
        return statisticsProceduresPageService.getEnquiriesPerProcedure(start, end);
    }

    @RequestMapping(value = "classification/count/avg-per-buyer-supplier", method = RequestMethod.GET)
    public Statistics getClassificationAvgPerBuyerSupplier(@RequestParam(required = false) String startDate,
                                                           @RequestParam(required = false) String endDate) {
        OffsetDateTime end = isNull(endDate) ? tenderRepository.getMaxDatePublished() : parseOffsetDateTime(endDate);
        OffsetDateTime start = isNull(startDate) ? end.minusYears(1) : parseOffsetDateTime(startDate);
        return statisticsMarketPageService.getClassificationAvgPerBuyer(start, end);
    }

    @RequestMapping(value = "/contract/budget/amount/share", method = RequestMethod.GET, produces = "application/json")
    public Statistics getBudgetShare(@RequestParam(required = false) String startDate,
                                     @RequestParam(required = false) String endDate) {
        OffsetDateTime end = isNull(endDate) ? contractRepository.getMaxDateCreated() : parseOffsetDateTime(endDate);
        OffsetDateTime start = isNull(startDate) ? end.minusYears(1) : parseOffsetDateTime(startDate);
        return statisticsMarketPageService.getBudgetAmountShare(start, end);
    }

    @RequestMapping(value = "/kpi/small-scale-business/lots/count", method = RequestMethod.GET, produces = "application/json")
    public Statistics getLotsForSmallScaleBusiness(@RequestParam(required = false) String startDate,
                                                   @RequestParam(required = false) String endDate) {
        OffsetDateTime end = isNull(endDate) ? contractRepository.getMaxDateCreated() : parseOffsetDateTime(endDate);
        OffsetDateTime start = isNull(startDate) ? end.minusYears(1) : parseOffsetDateTime(startDate);
        return statisticsMarketPageService.getLotsForSmallScaleBusiness(start, end);
    }

    @RequestMapping(value = "/small-scale-suppliers/contracts/amount", method = RequestMethod.GET, produces = "application/json")
    public List<Statistics> getSuppliersByScaleContractsAmount(@RequestParam(required = false) String startDate,
                                                               @RequestParam(required = false) String endDate) {
        OffsetDateTime end = isNull(endDate) ? contractRepository.getMaxDateCreated() : parseOffsetDateTime(endDate);
        OffsetDateTime start = isNull(startDate) ? end.minusYears(1) : parseOffsetDateTime(startDate);
        return statisticsContractsPageService.getSuppliersByScaleCount(start, end);
    }

    @RequestMapping(value = "/okrb-region/top/count", method = RequestMethod.GET, produces = "application/json")
    public List<OKRB> getRegionsWithTopCountOKRB(@RequestParam(required = false) String startDate,
                                                 @RequestParam(required = false) String endDate) {
        OffsetDateTime end = isNull(endDate) ? contractRepository.getMaxDateCreated() : parseOffsetDateTime(endDate);
        OffsetDateTime start = isNull(startDate) ? end.minusYears(1) : parseOffsetDateTime(startDate);
        return statisticsMarketPageService.getRegionsWithTopCountOKRB(start, end);
    }

    @RequestMapping(value = "/okrb-region/top/amount", method = RequestMethod.GET, produces = "application/json")
    public List<OKRB> getRegionsWithTopAmountOKRB(@RequestParam(required = false) String startDate,
                                                  @RequestParam(required = false) String endDate) {
        OffsetDateTime end = isNull(endDate) ? contractRepository.getMaxDateCreated() : parseOffsetDateTime(endDate);
        OffsetDateTime start = isNull(startDate) ? end.minusYears(1) : parseOffsetDateTime(startDate);
        return statisticsMarketPageService.getRegionsWithTopAmountOKRB(start, end);
    }

    @RequestMapping(value = "/buyers-regions/buyers-count", method = RequestMethod.GET, produces = "application/json")
    public List<DistributionStatistics> getBuyersRegionBuyerCount(@RequestParam(required = false) String startDate,
                                                                  @RequestParam(required = false) String endDate) {
        OffsetDateTime end = isNull(endDate) ? contractRepository.getMaxDateCreated() : parseOffsetDateTime(endDate);
        OffsetDateTime start = isNull(startDate) ? end.minusYears(1) : parseOffsetDateTime(startDate);
        return statisticsMarketPageService.getBuyersRegionBuyerCount(start, end);
    }

    @RequestMapping(value = "/buyers-capital/buyers-count", method = RequestMethod.GET, produces = "application/json")
    public List<DistributionStatistics> getBuyersCapitalBuyerCount(@RequestParam(required = false) String startDate,
                                                                   @RequestParam(required = false) String endDate) {
        OffsetDateTime end = isNull(endDate) ? contractRepository.getMaxDateCreated() : parseOffsetDateTime(endDate);
        OffsetDateTime start = isNull(startDate) ? end.minusYears(1) : parseOffsetDateTime(startDate);
        return statisticsMarketPageService.getBuyersCapitalBuyerCount(start, end);
    }

    @RequestMapping(value = "/suppliers/residency/count", method = RequestMethod.GET, produces = "application/json")
    public List<Statistics> getResidencyDistribution(@RequestParam(required = false) String startDate,
                                                     @RequestParam(required = false) String endDate) {
        OffsetDateTime end = isNull(endDate) ? contractRepository.getMaxDateCreated() : parseOffsetDateTime(endDate);
        OffsetDateTime start = isNull(startDate) ? end.minusYears(1) : parseOffsetDateTime(startDate);
        return statisticsMarketPageService.getResidencyDistribution(start, end);
    }

    @RequestMapping(value = "/suppliers-countries/suppliers-count", method = RequestMethod.GET, produces = "application/json")
    public List<DistributionStatistics> getSuppliersCountriesSuppliersCount(@RequestParam(required = false) String startDate,
                                                                            @RequestParam(required = false) String endDate) {
        OffsetDateTime end = isNull(endDate) ? contractRepository.getMaxDateCreated() : parseOffsetDateTime(endDate);
        OffsetDateTime start = isNull(startDate) ? end.minusYears(1) : parseOffsetDateTime(startDate);
        return statisticsMarketPageService.getSuppliersCountriesSuppliersCount(start, end);
    }

    @RequestMapping(value = "/contracts/competitive/count-amount", method = RequestMethod.GET, produces = "application/json")
    public Statistics getContractsCompetitiveCountAmount(@RequestParam(required = false) String startDate,
                                                         @RequestParam(required = false) String endDate) {
        OffsetDateTime end = isNull(endDate) ? contractRepository.getMaxDateCreated() : parseOffsetDateTime(endDate);
        OffsetDateTime start = isNull(startDate) ? end.minusYears(1) : parseOffsetDateTime(startDate);
        return statisticsContractsPageService.getContractsCompetitiveCountAmount(start, end);
    }

    @RequestMapping(value = "dates/contracts/competitive/count-amount", method = RequestMethod.GET, produces = "application/json")
    public List<Statistics> getDatesContractsCompetitiveCountAmount(@RequestParam(required = false) String startDate,
                                                                    @RequestParam(required = false) String endDate) {
        OffsetDateTime end = isNull(endDate) ? contractRepository.getMaxDateCreated() : parseOffsetDateTime(endDate);
        OffsetDateTime start = isNull(startDate) ? end.minusYears(1) : parseOffsetDateTime(startDate);
        return statisticsContractsPageService.getDatesContractsCompetitiveCountAmount(start, end);
    }

    @RequestMapping(value = "/procedure-types/contracts/amount", method = RequestMethod.GET, produces = "application/json")
    public List<Statistics> getProcedureTypesContractsCount(@RequestParam(required = false) String startDate,
                                                            @RequestParam(required = false) String endDate) {
        OffsetDateTime end = isNull(endDate) ? contractRepository.getMaxDateCreated() : parseOffsetDateTime(endDate);
        OffsetDateTime start = isNull(startDate) ? end.minusYears(1) : parseOffsetDateTime(startDate);
        return statisticsContractsPageService.getProcedureTypesContractsAmount(start, end);
    }

    @RequestMapping(value = "/classification/top/by-contract-amount", method = RequestMethod.GET, produces = "application/json")
    public List<OKRB> getTopOKRBByContractsAmount(@RequestParam(required = false) String startDate,
                                                  @RequestParam(required = false) String endDate) {
        OffsetDateTime end = isNull(endDate) ? contractRepository.getMaxDateCreated() : parseOffsetDateTime(endDate);
        OffsetDateTime start = isNull(startDate) ? end.minusYears(1) : parseOffsetDateTime(startDate);
        return statisticsMarketPageService.getTopOKRBByContractsAmount(start, end);
    }

    @RequestMapping(value = "/buyers/competitive/top/by-contract-amount", method = RequestMethod.GET, produces = "application/json")
    public List<Buyer> getTopNonCompetitiveBuyersByContractsAmount(@RequestParam(required = false) String startDate,
                                                                   @RequestParam(required = false) String endDate) {
        OffsetDateTime end = isNull(endDate) ? contractRepository.getMaxDateCreated() : parseOffsetDateTime(endDate);
        OffsetDateTime start = isNull(startDate) ? end.minusYears(1) : parseOffsetDateTime(startDate);
        return statisticsMarketPageService.getTopCompetitiveBuyersByContractsAmount(start, end);
    }

    @RequestMapping(value = "/related-lots/share", method = RequestMethod.GET, produces = "application/json")
    public Statistics getShareOfRelatedLots(@RequestParam(required = false) String startDate,
                                            @RequestParam(required = false) String endDate) {
        OffsetDateTime end = isNull(endDate) ? contractRepository.getMaxDateCreated() : parseOffsetDateTime(endDate);
        OffsetDateTime start = isNull(startDate) ? end.minusYears(1) : parseOffsetDateTime(startDate);
        return statisticsMarketPageService.getShareOfRelatedLots(start, end);
    }

    @RequestMapping(value = "/top-10-suppliers/share/by-contract-count", method = RequestMethod.GET, produces = "application/json")
    public Statistics top10SuppliersShareByContractCount(@RequestParam(required = false) String startDate,
                                                         @RequestParam(required = false) String endDate) {
        OffsetDateTime end = isNull(endDate) ? contractRepository.getMaxDateCreated() : parseOffsetDateTime(endDate);
        OffsetDateTime start = isNull(startDate) ? end.minusYears(1) : parseOffsetDateTime(startDate);
        return statisticsMarketPageService.top10SuppliersShareByContractCount(start, end);
    }

    @RequestMapping(value = "/top-10-suppliers/share/by-contract-amount", method = RequestMethod.GET, produces = "application/json")
    public Statistics top10SuppliersShareByContractAmount(@RequestParam(required = false) String startDate,
                                                          @RequestParam(required = false) String endDate) {
        OffsetDateTime end = isNull(endDate) ? contractRepository.getMaxDateCreated() : parseOffsetDateTime(endDate);
        OffsetDateTime start = isNull(startDate) ? end.minusYears(1) : parseOffsetDateTime(startDate);
        return statisticsMarketPageService.top10SuppliersShareByContractAmount(start, end);
    }


}
