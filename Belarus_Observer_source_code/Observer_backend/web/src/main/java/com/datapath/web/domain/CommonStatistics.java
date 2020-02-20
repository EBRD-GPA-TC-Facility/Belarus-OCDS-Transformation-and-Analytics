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
public class CommonStatistics {
    Statistics kpiProceduresCount;
    Statistics kpiContractsAmount;
    Statistics kpiContractsCountPerSupplier;
    Statistics kpiBuyersSuppliersCount;
    Statistics kpiShareCompleteLots;
    Statistics kpiLotsForSmallScaleBusiness;
    Statistics kpiGSWCount;
    Statistics contractsCompetitiveCountAmount;
    List<Statistics> datesContractsCompetitiveCountAmount;
    List<Statistics> suppliersScaleAmount;
    Statistics budgetAmountShare;
    List<Statistics> procedureTypesContractsAmount;
    Statistics classificationAvgPerBuyer;
    List<OKRB> topOKRBByContractsAmount;
    List<OKRB> regionsWithTopCountOKRB;
    List<OKRB> regionsWithTopAmountOKRB;
    List<DistributionStatistics> buyersCapitalBuyerCount;
    List<DistributionStatistics> buyersRegionBuyerCount;
    List<Buyer> topCompetitiveBuyersByContractsAmount;
    Statistics top10SuppliersShareByContractCount;
    Statistics top10SuppliersShareByContractAmount;
    List<DistributionStatistics> suppliersCountriesSuppliersCount;
    List<Statistics> residencyDistribution;
    List<Statistics> suppliersByScaleAmount;
    Statistics enquiriesPerProcedure;
    Statistics proceduresCountPerMonth;
    DistributionStatistics contractsPerBuyerCountAmount;


}


