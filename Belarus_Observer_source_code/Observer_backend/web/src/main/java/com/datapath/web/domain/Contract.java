package com.datapath.web.domain;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Contract {
    String title;
    String id;
    String buyer;
    Double amount;
    String supplier;
    String dateCreated;
    Long timestamp;
    String procedureTypeStr;
    Integer procedureType;
    String competitivityStr;
    Integer competitivity;
    String fundsStr;
    Integer funds;
    long itemsCount;
}