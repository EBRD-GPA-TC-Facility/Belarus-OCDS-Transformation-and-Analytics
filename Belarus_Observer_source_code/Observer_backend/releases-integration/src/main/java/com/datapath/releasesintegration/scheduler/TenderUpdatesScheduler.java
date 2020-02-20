package com.datapath.releasesintegration.scheduler;

import com.datapath.releasesintegration.services.ProceduresUpdatesManager;
import com.datapath.releasesintegration.utils.ServiceStatus;
import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

@Component
@Slf4j
public class TenderUpdatesScheduler  {

    private static final int TENDERS_UPDATES_RATE = 100_000;
    private static final int TENDERS_UPDATES_DELAY = 100;

    private ProceduresUpdatesManager proceduresUpdatesManager;

    public TenderUpdatesScheduler(ProceduresUpdatesManager proceduresUpdatesManager) {
        this.proceduresUpdatesManager = proceduresUpdatesManager;
    }

    @Scheduled(fixedRate = TENDERS_UPDATES_RATE, initialDelay = TENDERS_UPDATES_DELAY)
    public void checkTendersForUpdates() {
        try {
            if (proceduresUpdatesManager.getServiceStatus() == ServiceStatus.ENABLED) {
                proceduresUpdatesManager.loadProcedures();
            } else {
                log.info("TendersUpdateManager disabled.");
            }
        } catch (Exception ex) {
            log.error("Error CheckTendersForUpdates failed {}", ex.getMessage());
            proceduresUpdatesManager.setServiceStatus(ServiceStatus.ENABLED);
        }
    }
}
