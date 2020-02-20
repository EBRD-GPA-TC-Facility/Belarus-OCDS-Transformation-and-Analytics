package com.datapath.releasesintegration.services;

import com.datapath.releasesintegration.ReleasesIntegrationApplication;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import java.time.ZoneId;
import java.util.TimeZone;
import java.util.regex.Matcher;
import java.util.regex.Pattern;


@RunWith(SpringRunner.class)
@SpringBootTest(classes = ReleasesIntegrationApplication.class)
public class ProceduresUpdatesManagerTest {

    @Autowired
    ProceduresUpdatesManager proceduresUpdatesManager;

    private static final ZoneId DEFAULT_TIMEZONE = ZoneId.of("Europe/Minsk");

    static {
        TimeZone.setDefault(TimeZone.getTimeZone(DEFAULT_TIMEZONE));
    }

    @Test
    public void loadProcedures() {
//        proceduresUpdatesManager.loadProcedures();
        System.out.println("test");
        String str = "BY-UNP-290459038; 291185692; 691307153; 101077359; 700037179; 490077693.";
        Pattern compile = Pattern.compile("(BY-UNP-(\\d+([;,])?\\s*)+)");
        Matcher matcher = compile.matcher(str);
        boolean s = matcher.matches();
        System.out.println(s);


    }
}