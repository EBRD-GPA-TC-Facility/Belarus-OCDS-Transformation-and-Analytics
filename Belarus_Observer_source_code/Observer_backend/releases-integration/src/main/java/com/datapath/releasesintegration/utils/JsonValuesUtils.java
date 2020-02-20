package com.datapath.releasesintegration.utils;

import static java.util.Objects.isNull;

public class JsonValuesUtils {

    public static Double getDouble(String str) {
        return isNull(str) ? null : Double.parseDouble(str);
    }

    public static Long getLong(String str) {
        return isNull(str) ? null : Long.parseLong(str);
    }

    public static String getString(String str) {
        return isNull(str) ? null : str.replaceAll("\u0000", "");
    }
}
