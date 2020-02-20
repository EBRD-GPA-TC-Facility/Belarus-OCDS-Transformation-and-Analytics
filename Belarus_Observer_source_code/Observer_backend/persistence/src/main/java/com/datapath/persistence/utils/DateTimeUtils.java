package com.datapath.persistence.utils;

import java.time.OffsetDateTime;
import java.time.format.DateTimeFormatter;

public class DateTimeUtils {
    private static final String ZONED_DATE_TIME_FORMAT = "yyyy-MM-dd'T'HH:mm:ssXXX";

    public static OffsetDateTime parseOffsetDateTime(String zonedDateTimeStr) {
        return OffsetDateTime.parse(zonedDateTimeStr, DateTimeFormatter.ofPattern(ZONED_DATE_TIME_FORMAT));
    }

    public static String offsetDateTimeToString(OffsetDateTime zonedDateTime) {
        return zonedDateTime.format(DateTimeFormatter.ofPattern(ZONED_DATE_TIME_FORMAT));
    }

}
