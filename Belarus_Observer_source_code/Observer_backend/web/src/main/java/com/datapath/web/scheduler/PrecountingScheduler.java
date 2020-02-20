package com.datapath.web.scheduler;

import com.datapath.web.services.CommonStatisticsService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.InitializingBean;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

@Component
@Slf4j
public class PrecountingScheduler implements InitializingBean {

    CommonStatisticsService commonStatisticsService;

    public PrecountingScheduler(CommonStatisticsService commonStatisticsService) {
        this.commonStatisticsService = commonStatisticsService;
    }

    @Scheduled(cron = "0 0 0 * * *")
    public void updatePrecountings() {
        log.info("statistics precountings start");
        commonStatisticsService.updatePrecountedInfo();
        log.info("statistics precountings finished");
    }


    @Override
    public void afterPropertiesSet() throws Exception {
        log.info("statistics precountings start");
        commonStatisticsService.updatePrecountedInfo();
        log.info("statistics precountings finished");
    }
}
