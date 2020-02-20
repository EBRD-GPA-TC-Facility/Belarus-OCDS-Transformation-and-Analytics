package com.datapath.releasesintegration.utils;

import java.time.OffsetDateTime;

import static com.datapath.persistence.utils.DateTimeUtils.offsetDateTimeToString;
import static java.util.Objects.isNull;

public class LinksUtils {

    private static final String RELEASES_URL = "http://192.168.27.208:8110/belarus/releases";
//    private static final String RELEASES_URL = "http://212.98.171.10:8110/belarus/releases";


    public static String getReleasesUrl(Integer size, OffsetDateTime offset) {
        return isNull(offset) ? String.format("%s?size=%d", RELEASES_URL, size) :
                String.format("%s?size=%d&offset=%s", RELEASES_URL, size, offsetDateTimeToString(offset));
    }

    public static String getProcedureUrl(String procedureId) {
        return String.format("%s/%s", RELEASES_URL, procedureId);
    }
}
