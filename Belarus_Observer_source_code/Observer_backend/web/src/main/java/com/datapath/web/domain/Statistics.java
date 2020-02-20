package com.datapath.web.domain;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.Map;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Statistics {
    Avg avg;
    Avg avgCount;
    Avg avgAmount;
    Integer n;
    Long count;
    Key key;
    String date;
    String day;
    Double share;
    Double amountShare;
    Double countShare;
    Double amount;
    Double competitiveAmount;
    Double uncompetitiveAmount;
    Statistics buyers;
    Statistics suppliers;
    Statistics competitive;
    Statistics uncompetitive;
    Statistics resident;
    Statistics nonResident;
    List<Statistics> dates;
    List<Statistics> gsw;
    List<Statistics> values;
    Map<String, Statistics> result;
}
