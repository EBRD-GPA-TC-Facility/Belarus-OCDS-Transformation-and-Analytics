package com.datapath.releasesintegration.services;

import com.datapath.persistence.repositories.TenderRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Slf4j
@Service
public class MaterializedViewsUpdateService {

    private TenderRepository tenderRepository;

    public MaterializedViewsUpdateService(TenderRepository tenderRepository) {
        this.tenderRepository = tenderRepository;
    }

    public void updateViews() {
    }


}
