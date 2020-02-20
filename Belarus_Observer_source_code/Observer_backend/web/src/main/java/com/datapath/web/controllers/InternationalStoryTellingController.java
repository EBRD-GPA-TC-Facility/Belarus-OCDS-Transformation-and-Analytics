package com.datapath.web.controllers;

import com.datapath.persistence.repositories.ContractRepository;
import com.datapath.web.domain.InternationalStoryTellingCommon;
import com.datapath.web.services.CommonStatisticsService;
import com.datapath.web.services.InternationalStoryTellingService;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.time.OffsetDateTime;
import java.time.ZoneId;

import static com.datapath.persistence.utils.DateTimeUtils.parseOffsetDateTime;
import static java.util.Objects.isNull;

@RestController
@CrossOrigin
@RequestMapping(value = "api/belarus-analytics/v1/story-telling", produces = MediaType.APPLICATION_JSON_VALUE)
public class InternationalStoryTellingController {

    private CommonStatisticsService commonStatisticsService;
    private InternationalStoryTellingService internationalStoryTellingService;
    private ContractRepository contractRepository;


    public InternationalStoryTellingController(CommonStatisticsService commonStatisticsService,
                                               InternationalStoryTellingService internationalStoryTellingService,
                                               ContractRepository contractRepository) {
        this.contractRepository = contractRepository;
        this.commonStatisticsService = commonStatisticsService;
        this.internationalStoryTellingService = internationalStoryTellingService;
    }

    @RequestMapping(value = "/international", method = RequestMethod.GET)
    public InternationalStoryTellingCommon getKPIsProceduresCountContractsAmountContractsCountPerSupplierBuyersSuppliersCount(
            @RequestParam(required = false) String startDate,
            @RequestParam(required = false) String endDate) {
        OffsetDateTime end = isNull(endDate) ? contractRepository.getMaxDateCreated() : parseOffsetDateTime(endDate);
        LocalDateTime dateTime = LocalDateTime.of(2016, 1, 1, 0, 0);
        OffsetDateTime start = OffsetDateTime.of(dateTime, ZoneId.of("Europe/Minsk").getRules().getOffset(dateTime));
        return internationalStoryTellingService.getStoryTelling(start, end);
    }


}
