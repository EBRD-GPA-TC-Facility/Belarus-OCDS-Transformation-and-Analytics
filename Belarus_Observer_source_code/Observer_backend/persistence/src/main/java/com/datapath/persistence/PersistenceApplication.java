package com.datapath.persistence;

import com.datapath.persistence.repositories.OKRBRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.InitializingBean;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;
import org.springframework.jdbc.datasource.init.ResourceDatabasePopulator;
import org.springframework.stereotype.Component;

import javax.sql.DataSource;

@Slf4j
@Component
public class PersistenceApplication implements InitializingBean {

    private DataSource dataSource;
    private OKRBRepository okrbRepository;

    public PersistenceApplication(DataSource dataSource, OKRBRepository okrbRepository) {
        this.dataSource = dataSource;
        this.okrbRepository = okrbRepository;
    }

    private void initOKRB() {
        Resource okrbResource = new ClassPathResource("okrb_catalog.sql");
        Resource departments = new ClassPathResource("departments.sql");
        ResourceDatabasePopulator populator = new ResourceDatabasePopulator();
//        populator.addScripts( );
//        populator.execute(dataSource);
    }

    @Override
    public void afterPropertiesSet() {
        if (okrbRepository.count() == 0) {
            initOKRB();
        }
    }
}
