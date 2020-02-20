package com.datapath.releasesintegration.services;

import com.datapath.persistence.entities.Tender;
import com.datapath.persistence.repositories.TenderRepository;
import com.datapath.releasesintegration.domain.ProcedureResponseEntity;
import com.datapath.releasesintegration.domain.ReleasesResponseEntity;
import com.datapath.releasesintegration.parsers.TenderParser;
import com.datapath.releasesintegration.utils.ServiceStatus;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.time.OffsetDateTime;
import java.util.List;

import static com.datapath.persistence.utils.DateTimeUtils.parseOffsetDateTime;
import static com.datapath.releasesintegration.utils.LinksUtils.getProcedureUrl;
import static com.datapath.releasesintegration.utils.LinksUtils.getReleasesUrl;
import static java.util.Objects.nonNull;


@Slf4j
@Service
public class ProceduresUpdatesManager {

    private RestTemplate restTemplate;
    private TenderParser tenderParser;
    private ServiceStatus serviceStatus;
    private TenderRepository tenderRepository;
    private ProcedureSaveService procedureSaveService;
    private MaterializedViewsUpdateService materializedViewsUpdateService;


    public ProceduresUpdatesManager(
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

    public ServiceStatus getServiceStatus(){
        return this.serviceStatus;
    }

    public void setServiceStatus(ServiceStatus serviceStatus){
         this.serviceStatus = serviceStatus;
    }

    @Async
    public void loadProcedures()  {
        setServiceStatus(ServiceStatus.DISABLED);
        OffsetDateTime offset = tenderRepository.getMaxDate();
//        OffsetDateTime offset = OffsetDateTime.of(2018,1,1,1,1,1,1, ZoneOffset.of("+3"));
        System.out.println(offset);
        Integer pageSize =  20000;
        while (true) {
            String url = getReleasesUrl(pageSize, offset);
            log.info("Load procedures from {}", url);
            ResponseEntity<ReleasesResponseEntity> response = restTemplate.exchange(url, HttpMethod.GET, null, ReleasesResponseEntity.class);
            System.out.println(response);
            if (response.getStatusCode().is2xxSuccessful() && nonNull(response.getBody()) && nonNull(response.getBody().getContent())) {
                List<ReleasesResponseEntity.Content> procedures = response.getBody().getContent();
                for (ReleasesResponseEntity.Content content : procedures) {
                    String procedureId = content.getOcid();
                    OffsetDateTime dateTime = parseOffsetDateTime(content.getDate());

                    String procedureUrl = getProcedureUrl(procedureId);

                    log.info("Load procedure  {}", procedureUrl);
                    ProcedureResponseEntity procedure = restTemplate.getForObject(procedureUrl, ProcedureResponseEntity.class);
                    Tender tender = tenderParser.parseToTender(procedure);

                    if ( nonNull(tender) && dateTime.equals(tender.getDate())) {
                        procedureSaveService.saveTender(tender);
                        log.info("Saved {}", procedureUrl);

                    }
                    offset = dateTime;
                }
//                materializedViewsUpdateService.updateViews();
                if (procedures.size() == 1) {
                    setServiceStatus(ServiceStatus.ENABLED);
                    return;
                }
            }


        }

    }

}
