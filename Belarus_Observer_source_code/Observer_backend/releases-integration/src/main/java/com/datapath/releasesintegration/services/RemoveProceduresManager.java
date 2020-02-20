package com.datapath.releasesintegration.services;

import com.datapath.persistence.entities.Tender;
import com.datapath.persistence.repositories.TenderRepository;
import com.datapath.releasesintegration.domain.ProcedureResponseEntity;
import com.datapath.releasesintegration.domain.ReleasesResponseEntity;
import com.datapath.releasesintegration.parsers.TenderParser;
import com.datapath.releasesintegration.utils.ServiceStatus;
import lombok.Synchronized;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import javax.transaction.Transactional;
import java.time.OffsetDateTime;
import java.util.List;
import java.util.Optional;

import static com.datapath.persistence.utils.DateTimeUtils.parseOffsetDateTime;
import static com.datapath.releasesintegration.utils.LinksUtils.getProcedureUrl;
import static com.datapath.releasesintegration.utils.LinksUtils.getReleasesUrl;
import static java.util.Objects.nonNull;


@Slf4j
@Service
public class RemoveProceduresManager {

    private RestTemplate restTemplate;
    private TenderParser tenderParser;
    private ServiceStatus serviceStatus;
    private TenderRepository tenderRepository;
    private ProcedureSaveService procedureSaveService;
    private MaterializedViewsUpdateService materializedViewsUpdateService;


    public RemoveProceduresManager(
            RestTemplate restTemplate,
            TenderParser tenderParser,
            TenderRepository tenderRepository,
            ProcedureSaveService procedureSaveService,
            MaterializedViewsUpdateService materializedViewsUpdateService) {
        this.restTemplate = restTemplate;
        this.tenderParser = tenderParser;
        this.tenderRepository = tenderRepository;
        this.procedureSaveService = procedureSaveService;
        this.materializedViewsUpdateService = materializedViewsUpdateService;
        this.serviceStatus = ServiceStatus.ENABLED;
    }

    public ServiceStatus getServiceStatus() {
        return this.serviceStatus;
    }

    public void setServiceStatus(ServiceStatus serviceStatus) {
        this.serviceStatus = serviceStatus;
    }


    @Transactional
    @Synchronized
    public boolean removeProcedures() {

        Optional<Tender> exchangeTrades = tenderRepository.getFirstByProcedureTypeId(10l);
        if (exchangeTrades.isPresent()) {
            tenderRepository.delete(exchangeTrades.get());
            log.info("{}",exchangeTrades.get().getId());
            return true;
        }
        return false;

    }

}
