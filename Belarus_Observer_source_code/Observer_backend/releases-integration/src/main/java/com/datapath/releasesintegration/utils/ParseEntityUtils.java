package com.datapath.releasesintegration.utils;

import java.util.Optional;
import java.util.function.Supplier;

public class ParseEntityUtils {

    public static <T> Optional<T> resolve(Supplier<T> resolver) {
        try {
            T result = resolver.get();
            return Optional.ofNullable(result);
        } catch (NullPointerException e) {
            return Optional.empty();
        }
    }
}
