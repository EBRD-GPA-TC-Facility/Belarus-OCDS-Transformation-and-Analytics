package com.datapath.web;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.scheduling.annotation.EnableAsync;
import org.springframework.scheduling.annotation.EnableScheduling;

import java.time.ZoneId;
import java.util.TimeZone;

@SpringBootApplication
@ComponentScan(basePackages = {"com.datapath"})
@EntityScan(basePackages = {"com.datapath"})
@EnableJpaRepositories(basePackages = {"com.datapath"})
@EnableScheduling
@EnableAsync
//@PropertySource("file:application.properties")
public class WebApplication {

    private static final ZoneId DEFAULT_TIMEZONE = ZoneId.of("Europe/Minsk");

    static {
        TimeZone.setDefault(TimeZone.getTimeZone(DEFAULT_TIMEZONE));

    }

    public static void main(String[] args) {
        SpringApplication.run(WebApplication.class, args);
    }
}
