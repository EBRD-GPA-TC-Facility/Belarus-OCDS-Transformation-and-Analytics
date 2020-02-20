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
public class InternationalStoryTellingCommon {
    List<DistributionStatistics> suppliersCountriesSuppliersCount;
    Statistics avgContractAmountPerNonResidentContract ;
    Statistics amountShareOfNonResidentContracts;
    Statistics contractCountPerNonResidentSupplier;
    Statistics maxNonResidentContractAmount;
    List<Statistics> topNonResidentCountries;
    List<Statistics> contractsOfTopAndNonTopNonResidentCountries;
    List<DistributionStatistics> countriesContractsAmountCountSuppliers;
    List<Statistics> topResidentNonResidentOkrbs;
    List<Statistics> residentNonResidentOkrbs;
    List<Statistics> regionsWithNonResidentSuppliers;
}





