package com.datapath.web.domain;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class DistributionStatistics {
    Key key;
    String date;
    Statistics lots;
    Statistics buyers;
    Statistics contracts;
    Statistics suppliers;
    Statistics procedures;
    Statistics procuringEntities;
    Statistics goods;
    Statistics works;
    Statistics services;
    List<Statistics> values;
    List<DistributionStatistics> dates;
}
