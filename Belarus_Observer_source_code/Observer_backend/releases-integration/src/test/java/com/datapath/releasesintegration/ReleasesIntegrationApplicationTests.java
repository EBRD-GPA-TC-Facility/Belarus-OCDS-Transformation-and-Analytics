package com.datapath.releasesintegration;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import java.time.ZoneId;
import java.util.TimeZone;

@RunWith(SpringRunner.class)
@SpringBootTest(classes = ReleasesIntegrationApplication.class)
public class ReleasesIntegrationApplicationTests {


    private static final ZoneId DEFAULT_TIMEZONE = ZoneId.of("Europe/Minsk");

    static {
        TimeZone.setDefault(TimeZone.getTimeZone(DEFAULT_TIMEZONE));

    }

    @Test
    public void contextLoads() {
    }

}
