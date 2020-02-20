package com.datapath.web.controllers;

import com.datapath.persistence.repositories.ContractRepository;
import com.datapath.persistence.repositories.EnquiryRepository;
import com.datapath.persistence.repositories.TenderRepository;
import com.datapath.web.domain.DistributionStatistics;
import com.datapath.web.domain.Procurement;
import com.datapath.web.domain.Result;
import com.datapath.web.domain.Statistics;
import com.datapath.web.services.HomePageService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import java.time.OffsetDateTime;
import java.util.List;
import java.util.Map;

import static com.datapath.persistence.utils.DateTimeUtils.parseOffsetDateTime;
import static java.util.Objects.isNull;

@Slf4j
@RestController
@CrossOrigin
@RequestMapping(value = "api/belarus-analytics/v1/home-page", produces = MediaType.APPLICATION_JSON_VALUE)
public class HomePageController {

    private HomePageService homePageService;

    private TenderRepository tenderRepository;
    private ContractRepository contractRepository;
    private EnquiryRepository enquiryRepository;

    public HomePageController(HomePageService homePageService,
                              TenderRepository tenderRepository,
                              EnquiryRepository enquiryRepository,
                              ContractRepository contractRepository) {
        this.homePageService = homePageService;
        this.enquiryRepository = enquiryRepository;
        this.tenderRepository = tenderRepository;
        this.contractRepository = contractRepository;
    }

    //    KPIs
    @RequestMapping(value = "kpi/procuring-entities/count", method = RequestMethod.GET)
    public Statistics getKPIProcuringEntitiesCount(@RequestParam(required = false) String startDate,
                                                   @RequestParam(required = false) String endDate) {
        OffsetDateTime end = isNull(endDate) ? tenderRepository.getMaxDatePublished() : parseOffsetDateTime(endDate);
        OffsetDateTime start = isNull(startDate) ? end.minusDays(6) : parseOffsetDateTime(startDate);
        return homePageService.getProcuringEntitiesKPI(start, end);
    }

    @RequestMapping(value = "kpi/suppliers/count", method = RequestMethod.GET)
    public Statistics getKPISuppliesCount(@RequestParam(required = false) String startDate,
                                          @RequestParam(required = false) String endDate) {
        OffsetDateTime end = isNull(endDate) ? tenderRepository.getMaxDatePublished() : parseOffsetDateTime(endDate);
        OffsetDateTime start = isNull(startDate) ? end.minusDays(6) : parseOffsetDateTime(startDate);
        return homePageService.getSuppliersKPICount(start, end);
    }

    @RequestMapping(value = "kpi/contracts/count", method = RequestMethod.GET)
    public Statistics getKPIPContractsCount(@RequestParam(required = false) String startDate,
                                            @RequestParam(required = false) String endDate) {
        OffsetDateTime end = isNull(endDate) ? tenderRepository.getMaxDatePublished() : parseOffsetDateTime(endDate);
        OffsetDateTime start = isNull(startDate) ? end.minusDays(6) : parseOffsetDateTime(startDate);
        return homePageService.getContractKPICount(start, end);
    }

    @RequestMapping(value = "kpi/contracts/amount", method = RequestMethod.GET)
    public Statistics getKPIPContracts(@RequestParam(required = false) String startDate,
                                       @RequestParam(required = false) String endDate) {
        OffsetDateTime end = isNull(endDate) ? tenderRepository.getMaxDatePublished() : parseOffsetDateTime(endDate);
        OffsetDateTime start = isNull(startDate) ? end.minusDays(6) : parseOffsetDateTime(startDate);
        return homePageService.getContractKPIAmount(start, end);
    }

    @RequestMapping(value = "kpi/lots/count/per-procedure", method = RequestMethod.GET)
    public Statistics getLotsPerTenderKPI(@RequestParam(required = false) String startDate,
                                          @RequestParam(required = false) String endDate) {
        OffsetDateTime end = isNull(endDate) ? tenderRepository.getMaxDatePublished() : parseOffsetDateTime(endDate);
        OffsetDateTime start = isNull(startDate) ? end.minusDays(6) : parseOffsetDateTime(startDate);
        log.info("{} - {}", start, end);
        return homePageService.getLotsPerTenderKPI(start, end);
    }

    @RequestMapping(value = "kpi/okrb/count/per-procedure", method = RequestMethod.GET)
    public Statistics getKPIPOkrbCountPerProcedure(@RequestParam(required = false) String startDate,
                                                   @RequestParam(required = false) String endDate) {
        OffsetDateTime end = isNull(endDate) ? tenderRepository.getMaxDatePublished() : parseOffsetDateTime(endDate);
        OffsetDateTime start = isNull(startDate) ? end.minusDays(6) : parseOffsetDateTime(startDate);
        log.info("{} - {}", start, end);
        return homePageService.getOKRBPerTenderKPI(start, end);
    }

    @RequestMapping(value = "kpi/contracts/count/per-supplier", method = RequestMethod.GET)
    public Statistics getKPIPContractsCountPerSupplier(@RequestParam(required = false) String startDate,
                                                       @RequestParam(required = false) String endDate) {
        OffsetDateTime end = isNull(endDate) ? contractRepository.getMaxDateCreated() : parseOffsetDateTime(endDate);
        OffsetDateTime start = isNull(startDate) ? end.minusDays(6) : parseOffsetDateTime(startDate);
        log.info("{} - {}", start, end);
        return homePageService.getContractsPerSupplierCountKPI(start, end);
    }

    @RequestMapping(value = "kpi/lots/complete/count", method = RequestMethod.GET)
    public Statistics getLotsCompleteKPICount(@RequestParam(required = false) String startDate,
                                              @RequestParam(required = false) String endDate) {
        OffsetDateTime end = isNull(endDate) ? tenderRepository.getMaxDatePublished() : parseOffsetDateTime(endDate);
        OffsetDateTime start = isNull(startDate) ? end.minusDays(6) : parseOffsetDateTime(startDate);
        return homePageService.getLotsCompleteKPICount(start, end);
    }

    @RequestMapping(value = "kpi/lots/active/count", method = RequestMethod.GET)
    public Statistics getLotsActiveKPICount(@RequestParam(required = false) String startDate,
                                            @RequestParam(required = false) String endDate) {
        OffsetDateTime end = isNull(endDate) ? tenderRepository.getMaxDatePublished() : parseOffsetDateTime(endDate);
        OffsetDateTime start = isNull(startDate) ? end.minusDays(6) : parseOffsetDateTime(startDate);
        return homePageService.getLotsActiveKPICount(start, end);
    }

    @RequestMapping(value = "kpi/enquiries/count", method = RequestMethod.GET)
    public Statistics getKPIEnquiriesCount(@RequestParam(required = false) String startDate,
                                           @RequestParam(required = false) String endDate) {
        OffsetDateTime end = isNull(endDate) ? enquiryRepository.getMaxDate() : parseOffsetDateTime(endDate);
        OffsetDateTime start = isNull(startDate) ? end.minusDays(6) : parseOffsetDateTime(startDate);
        return homePageService.getKPIEnquiriesCount(start, end);
    }

    //      Procuring Entities

    @RequestMapping(value = "/procuring-entities/count", method = RequestMethod.GET)
    public Statistics getProcuringEntitiesCount(@RequestParam(required = false) String startDate,
                                                @RequestParam(required = false) String endDate) {
        OffsetDateTime end = isNull(endDate) ? tenderRepository.getMaxDatePublished() : parseOffsetDateTime(endDate);
        OffsetDateTime start = isNull(startDate) ? end.minusDays(6) : parseOffsetDateTime(startDate);
        return homePageService.getProcuringEntitiesCount(start, end);
    }

    @RequestMapping(value = "/procuring-entities/dates/count", method = RequestMethod.GET)
    public Statistics getProcuringEntitiesDatesCount(@RequestParam(required = false) String startDate,
                                                     @RequestParam(required = false) String endDate) {
        OffsetDateTime end = isNull(endDate) ? tenderRepository.getMaxDatePublished() : parseOffsetDateTime(endDate);
        OffsetDateTime start = isNull(startDate) ? end.minusDays(6) : parseOffsetDateTime(startDate);
        return homePageService.getProcuringEntitiesDatesCount(start, end);
    }

    //    Contracts

    @RequestMapping(value = "/contracts/count", method = RequestMethod.GET)
    public Statistics getContractCount(@RequestParam(required = false) String startDate,
                                       @RequestParam(required = false) String endDate) {
        OffsetDateTime end = isNull(endDate) ? contractRepository.getMaxDateCreated() : parseOffsetDateTime(endDate);
        OffsetDateTime start = isNull(startDate) ? end.minusDays(6) : parseOffsetDateTime(startDate);
        return homePageService.getContractCount(start, end);
    }

    @RequestMapping(value = "/contracts/dates/count", method = RequestMethod.GET)
    public Statistics getContractDatesCount(@RequestParam(required = false) String startDate,
                                            @RequestParam(required = false) String endDate) {
        OffsetDateTime end = isNull(endDate) ? contractRepository.getMaxDateCreated() : parseOffsetDateTime(endDate);
        OffsetDateTime start = isNull(startDate) ? end.minusDays(6) : parseOffsetDateTime(startDate);
        return homePageService.getContractDatesCount(start, end);
    }

    @RequestMapping(value = "/contracts/amount", method = RequestMethod.GET)
    public Statistics getContractsSum(@RequestParam(required = false) String startDate,
                                      @RequestParam(required = false) String endDate) {
        OffsetDateTime end = isNull(endDate) ? contractRepository.getMaxDateCreated() : parseOffsetDateTime(endDate);
        OffsetDateTime start = isNull(startDate) ? end.minusDays(6) : parseOffsetDateTime(startDate);
        return homePageService.getContractsSum(start, end);
    }

    @RequestMapping(value = "/contracts/dates/amount", method = RequestMethod.GET)
    public Statistics getContractsDatesSum(@RequestParam(required = false) String startDate,
                                           @RequestParam(required = false) String endDate) {
        OffsetDateTime end = isNull(endDate) ? contractRepository.getMaxDateCreated() : parseOffsetDateTime(endDate);
        OffsetDateTime start = isNull(startDate) ? end.minusDays(6) : parseOffsetDateTime(startDate);
        return homePageService.getContractsDatesSum(start, end);
    }

    @RequestMapping(value = "/contracts/dates/competitivity/amount", method = RequestMethod.GET)
    public Statistics getCompetitivityDatesAmount(@RequestParam(required = false) String startDate,
                                                  @RequestParam(required = false) String endDate) {
        OffsetDateTime end = isNull(endDate) ? contractRepository.getMaxDateCreated() : parseOffsetDateTime(endDate);
        OffsetDateTime start = isNull(startDate) ? end.minusDays(6) : parseOffsetDateTime(startDate);
        return homePageService.getCompetitivityDatesAmount(start, end);
    }

    //    Suppliers

    @RequestMapping(value = "/suppliers/count", method = RequestMethod.GET)
    public Statistics getSuppliersCount(@RequestParam(required = false) String startDate,
                                        @RequestParam(required = false) String endDate) {
        OffsetDateTime end = isNull(endDate) ? tenderRepository.getMaxDatePublished() : parseOffsetDateTime(endDate);
        OffsetDateTime start = isNull(startDate) ? end.minusDays(6) : parseOffsetDateTime(startDate);
        return homePageService.getSuppliersCount(start, end);
    }

    @RequestMapping(value = "/suppliers/dates/count", method = RequestMethod.GET)
    public Statistics getSuppliersDatesCount(@RequestParam(required = false) String startDate,
                                             @RequestParam(required = false) String endDate) {
        OffsetDateTime end = isNull(endDate) ? tenderRepository.getMaxDatePublished() : parseOffsetDateTime(endDate);
        OffsetDateTime start = isNull(startDate) ? end.minusDays(6) : parseOffsetDateTime(startDate);
        return homePageService.getSuppliersDatesCount(start, end);
    }

    //    Lots

    @RequestMapping(value = "/lots/complete/count", method = RequestMethod.GET)
    public Statistics getLotsCompleteCount(@RequestParam(required = false) String startDate,
                                           @RequestParam(required = false) String endDate) {
        OffsetDateTime end = isNull(endDate) ? tenderRepository.getMaxDatePublished() : parseOffsetDateTime(endDate);
        OffsetDateTime start = isNull(startDate) ? end.minusDays(6) : parseOffsetDateTime(startDate);
        return homePageService.getLotsCompleteCount(start, end);
    }

    @RequestMapping(value = "/lots/complete/dates/count", method = RequestMethod.GET)
    public Statistics getLotsCompleteDatesCount(@RequestParam(required = false) String startDate,
                                                @RequestParam(required = false) String endDate) {
        OffsetDateTime end = isNull(endDate) ? tenderRepository.getMaxDatePublished() : parseOffsetDateTime(endDate);
        OffsetDateTime start = isNull(startDate) ? end.minusDays(6) : parseOffsetDateTime(startDate);
        return homePageService.getLotsCompleteDatesCount(start, end);
    }

    @RequestMapping(value = "/lots/active/count", method = RequestMethod.GET)
    public Statistics getLotsActiveCount(@RequestParam(required = false) String startDate,
                                         @RequestParam(required = false) String endDate) {
        OffsetDateTime end = isNull(endDate) ? tenderRepository.getMaxDatePublished() : parseOffsetDateTime(endDate);
        OffsetDateTime start = isNull(startDate) ? end.minusDays(6) : parseOffsetDateTime(startDate);
        return homePageService.getLotsActiveCount(start, end);
    }

    @RequestMapping(value = "/lots/active/dates/count", method = RequestMethod.GET)
    public Statistics getLotsActiveDatesCount(@RequestParam(required = false) String startDate,
                                              @RequestParam(required = false) String endDate) {
        OffsetDateTime end = isNull(endDate) ? tenderRepository.getMaxDatePublished() : parseOffsetDateTime(endDate);
        OffsetDateTime start = isNull(startDate) ? end.minusDays(6) : parseOffsetDateTime(startDate);
        return homePageService.getLotsActiveDatesCount(start, end);
    }

    //    Procedures

    @RequestMapping(value = "/procedures/successful/count", method = RequestMethod.GET)
    public Statistics getSuccessfulProceduresCount(@RequestParam(required = false) String startDate,
                                                   @RequestParam(required = false) String endDate) {
        OffsetDateTime end = isNull(endDate) ? tenderRepository.getMaxDatePublished() : parseOffsetDateTime(endDate);
        OffsetDateTime start = isNull(startDate) ? end.minusDays(6) : parseOffsetDateTime(startDate);
        return homePageService.getSuccessfulProceduresCount(start, end);
    }

    @RequestMapping(value = "/procedures/avg-per-hour", method = RequestMethod.GET)
    public Statistics getAvgProceduresPerHour(@RequestParam(required = false) String startDate,
                                              @RequestParam(required = false) String endDate) {
        OffsetDateTime end = isNull(endDate) ? tenderRepository.getMaxDatePublished() : parseOffsetDateTime(endDate);
        OffsetDateTime start = isNull(startDate) ? end.minusDays(6) : parseOffsetDateTime(startDate);
        return homePageService.getAvgProceduresPerHour(start, end);
    }

    @RequestMapping(value = "/procedures/competetive/every-n", method = RequestMethod.GET)
    public Statistics getCompetetiveEveryN(@RequestParam(required = false) String startDate,
                                           @RequestParam(required = false) String endDate) {
        OffsetDateTime end = isNull(endDate) ? tenderRepository.getMaxDatePublished() : parseOffsetDateTime(endDate);
        OffsetDateTime start = isNull(startDate) ? end.minusDays(6) : parseOffsetDateTime(startDate);
        return homePageService.getCompetetiveEveryN(start, end);
    }

    @RequestMapping(value = "/procedures/top", method = RequestMethod.GET)
    public Procurement getTopProcurement(@RequestParam(required = false) String startDate,
                                         @RequestParam(required = false) String endDate) {
        OffsetDateTime end = isNull(endDate) ? contractRepository.getMaxDateCreated() : parseOffsetDateTime(endDate);
        OffsetDateTime start = isNull(startDate) ? end.minusDays(6) : parseOffsetDateTime(startDate);
        return homePageService.getTopProcurement(start, end);
    }

    @RequestMapping(value = "/procedures/single-source/top", method = RequestMethod.GET)
    public List<Procurement> getTopSingleSourceProcedures(@RequestParam(required = false) String startDate,
                                                          @RequestParam(required = false) String endDate) {
        OffsetDateTime end = isNull(endDate) ? contractRepository.getMaxDateCreated() : parseOffsetDateTime(endDate);
        OffsetDateTime start = isNull(startDate) ? end.minusDays(6) : parseOffsetDateTime(startDate);
        return homePageService.getTopSingleSourceProcedures(start, end);
    }

    @RequestMapping(value = "/okrb/top", method = RequestMethod.GET)
    public List<Statistics> getTopOKRB(@RequestParam(required = false) String startDate,
                                       @RequestParam(required = false) String endDate) {
        OffsetDateTime end = isNull(endDate) ? contractRepository.getMaxDateCreated() : parseOffsetDateTime(endDate);
        OffsetDateTime start = isNull(startDate) ? end.minusDays(6) : parseOffsetDateTime(startDate);
        return homePageService.getTopOKRB(start, end);
    }

    @RequestMapping(value = "/contracts/common", method = RequestMethod.GET)
    public Result getContractsCommonInfo(@RequestParam(required = false) String startDate,
                                         @RequestParam(required = false) String endDate) {
        OffsetDateTime end = isNull(endDate) ? contractRepository.getMaxDateCreated() : parseOffsetDateTime(endDate);
        OffsetDateTime start = isNull(startDate) ? end.minusDays(6) : parseOffsetDateTime(startDate);
        return homePageService.getContractsCommonInfo(start, end);
    }

    @RequestMapping(value = "/regions/competitivity-procurement", method = RequestMethod.GET)
    public List<DistributionStatistics> getRegionsProcurement(@RequestParam(required = false) String startDate,
                                                              @RequestParam(required = false) String endDate) {
        OffsetDateTime end = isNull(endDate) ? tenderRepository.getMaxDate() : parseOffsetDateTime(endDate);
        OffsetDateTime start = isNull(startDate) ? end.withDayOfYear(1) : parseOffsetDateTime(startDate);
        return homePageService.getRegionsProcurement(start, end);
    }

    @RequestMapping(value = "/regions/top/procurement", method = RequestMethod.GET)
    public Map<String, List<Statistics>> getTopRegionsProcurement(@RequestParam(required = false) String startDate,
                                                                  @RequestParam(required = false) String endDate) {
        OffsetDateTime end = isNull(endDate) ? tenderRepository.getMaxDate() : parseOffsetDateTime(endDate);
        OffsetDateTime start = isNull(startDate) ? end.withDayOfYear(1) : parseOffsetDateTime(startDate);
        return homePageService.getTopRegionsProcurement(start, end);
    }

    @RequestMapping(value = "/belarus-products/share", method = RequestMethod.GET)
    public Statistics getShareOfBelarusProducts(@RequestParam(required = false) String startDate,
                                                @RequestParam(required = false) String endDate) {
        OffsetDateTime end = isNull(endDate) ? tenderRepository.getMaxDate() : parseOffsetDateTime(endDate);
        OffsetDateTime start = isNull(startDate) ? end.withDayOfYear(1) : parseOffsetDateTime(startDate);
        return homePageService.getShareOfBelarusProducts(start, end);
    }

    @RequestMapping(value = "/product-countries/contract-items/amount", method = RequestMethod.GET)
    public List<Statistics> getContractItemsCountriesAmount(@RequestParam(required = false) String startDate,
                                                            @RequestParam(required = false) String endDate) {
        OffsetDateTime end = isNull(endDate) ? tenderRepository.getMaxDate() : parseOffsetDateTime(endDate);
        OffsetDateTime start = isNull(startDate) ? end.withDayOfYear(1) : parseOffsetDateTime(startDate);
        return homePageService.getContractItemsCountriesAmount(start, end);
    }

    @RequestMapping(value = "/countries/okrb/top/amount", method = RequestMethod.GET)
    public Map<String, Statistics> getCountriesTOPOKRBsAmount(@RequestParam(required = false) String startDate,
                                                            @RequestParam(required = false) String endDate) {
        OffsetDateTime end = isNull(endDate) ? tenderRepository.getMaxDate() : parseOffsetDateTime(endDate);
        OffsetDateTime start = isNull(startDate) ? end.withDayOfYear(1) : parseOffsetDateTime(startDate);
        return homePageService.getCountriesTOPOKRBsAmount(start, end);
    }


}
