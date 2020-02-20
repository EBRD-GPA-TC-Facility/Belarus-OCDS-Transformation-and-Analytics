package com.datapath.web.domain;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Procurement {
    String title;
    String tenderId;
    String procuringEntity;
    String procurementMethod;
    String description;
    String buyer;
    String supplier;
    Double amount;
    Integer duration;
    Integer enquiries;
}