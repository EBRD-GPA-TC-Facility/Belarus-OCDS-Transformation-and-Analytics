package com.datapath.web.domain;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Avg {
    Double perPKRB;
    Double perHour;
    Double perMonth;
    Double perBuyer;
    Double perSupplier;
    Double perContract;
    Double perProcedure;
}
