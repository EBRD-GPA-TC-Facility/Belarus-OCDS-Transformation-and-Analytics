package com.datapath.web.domain;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Buyer {
    String name;
    String region;
    Contract contract;

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class Contract {
        Long count;
        Double amount;

    }
}