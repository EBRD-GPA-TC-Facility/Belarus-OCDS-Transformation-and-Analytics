package com.datapath.web.services;

import com.datapath.persistence.repositories.EnquiryRepository;
import com.datapath.persistence.repositories.LotRepository;
import com.datapath.persistence.repositories.TenderRepository;
import com.datapath.web.domain.Avg;
import com.datapath.web.domain.Statistics;
import org.springframework.stereotype.Service;

import java.time.OffsetDateTime;
import java.util.List;
import java.util.stream.Collectors;

import static java.util.Objects.isNull;

@Service
public class StatisticsProceduresPageService {

    private static final String UNDEFINED_KEY = "undefined";

    private LotRepository lotRepository;
    private TenderRepository tenderRepository;
    private EnquiryRepository enquiryRepository;

    private Long tenderCount;

    public StatisticsProceduresPageService(LotRepository lotRepository,
                                           TenderRepository tenderRepository,
                                           EnquiryRepository enquiryRepository) {
        this.lotRepository = lotRepository;
        this.tenderRepository = tenderRepository;
        this.enquiryRepository = enquiryRepository;
    }



    public Statistics getKPIProceduresCount(OffsetDateTime startDate, OffsetDateTime endDate) {

        Long tendersCount = tenderRepository.getTendersCount(startDate, endDate);
        List<Object[]> tendersCountByDate = tenderRepository.getTendersCountByDate(startDate, endDate);

        List<Statistics> dates = tendersCountByDate.stream().map(item -> {
            String date = item[0].toString().substring(0, 7);
            Long dateCount = Long.parseLong(item[1].toString());
            return Statistics.builder().date(date).count(dateCount).build();
        }).collect(Collectors.toList());
        return Statistics.builder().count(tendersCount).dates(dates).build();
    }

    public Statistics getProceduresCountPerMonth(OffsetDateTime startDate, OffsetDateTime endDate) {
        Long tendersCount = tenderRepository.getTendersCount(startDate, endDate);
        return Statistics.builder().avg(Avg.builder().perMonth((double) tendersCount / 12).build()).build();
    }

    public Statistics getKPIShareCompleteLots(OffsetDateTime startDate, OffsetDateTime endDate) {
        Double completeShare = lotRepository.getShareOfComplete(startDate, endDate);
        List<Object[]> completeShareByDate = lotRepository.getShareOfCompleteByDate(startDate, endDate);
        List<Statistics> dates = completeShareByDate.stream().map(item -> {
            String date = item[0].toString().substring(0, 7);
            Double dateShare = isNull(item[1]) ? 0 : Double.parseDouble(item[1].toString());
            return Statistics.builder().date(date).share(dateShare).build();
        }).collect(Collectors.toList());
        return Statistics.builder().share(completeShare).dates(dates).build();

    }

    public Statistics getEnquiriesPerProcedure(OffsetDateTime startDate, OffsetDateTime endDate) {
        Object[] tendersWithEnquiriesData = tenderRepository.getTendersWithEnquiries(startDate, endDate).get(0);
        double enquiries = Double.parseDouble(tendersWithEnquiriesData[0].toString());
        double tenders = Double.parseDouble(tendersWithEnquiriesData[2].toString());
        return Statistics.builder()
                .avg(Avg.builder().perProcedure(enquiries / tenders).build())
                .build();
    }

}
