package com.datapath.web.domain;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CommonInfo {
    Integer dayNumber;
    Long tenderCount;
    Double tendersCompetitiveShare;
    Long contractsCount;
    Double contractsAmount;
    Double contractBudgetShare;
}