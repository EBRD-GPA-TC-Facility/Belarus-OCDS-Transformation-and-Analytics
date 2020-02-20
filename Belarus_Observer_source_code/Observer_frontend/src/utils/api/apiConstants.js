export const BASE_URL = '/api/belarus-analytics/v1/'
// export const BASE_URL = 'http://213.136.84.11:8080/api/belarus-analytics/v1/'

export const DETECT_LOCALITY = 'http://ipinfo.io/json'

export const PROCURING_ENT_DATES_COUNT = 'home-page/kpi/procuring-entities/count'
export const SUPPLIERS_DATES_COUNT = 'home-page/kpi/suppliers/count'
export const LOTS_COMPLETE_DATES_COUNT = 'home-page/kpi/lots/complete/count'
export const LOTS_ACTIVE_DATES_COUNT = 'home-page/kpi/lots/active/count'

export const PER_PROCEDURE_LOTS_COUNT = 'home-page/kpi/lots/count/per-procedure'
export const PER_PROCEDURE_OKRB_COUNT = 'home-page/kpi/okrb/count/per-procedure'
export const PER_SUPPLIER_CONTRACTS_COUNT = 'home-page/kpi/contracts/count/per-supplier'

export const PROCEDURES_SUCCESSFUL_COUNT = 'home-page/procedures/successful/count'
export const PROCEDURES_AVG_PER_HOUR = 'home-page/procedures/avg-per-hour'
export const PROCEDURES_COMPETETIVE_EVERY_N = 'home-page/procedures/competetive/every-n'

export const KPI_CONTRACTS_COUNT = 'home-page/kpi/contracts/count'
export const KPI_CONTRACTS_AMOUNT = 'home-page/kpi/contracts/amount'

export const OKRB_TOP = 'home-page/okrb/top'
export const PROCEDURES_TOP = 'home-page/procedures/top'
export const ENQUIRIES_COUNT = 'home-page/kpi/enquiries/count'

export const PROCEDURES_SINGLE_SOURCE_TOP = 'home-page/procedures/single-source/top'

export const CONTRACTS_COMMON_INFO = 'home-page/contracts/common'

export const COMPETITIVITY_DATES_AMOUNT = 'home-page/contracts/dates/competitivity/amount'

// Statistic
//
export const GET_KPI_PROCEDURES_COUNT = 'common-statistics/kpi/procedures/count'
export const GET_KPI_CONTRACTS_AMOUNT = 'common-statistics/kpi/contracts/amount'
export const GET_KPI_CONTRACTS_AMOUNT_AVG_PER_SUPPLIER = 'common-statistics/kpi/contracts/count/avg/per-supplier'
export const GET_KPI_LOTS_COMPLETED_SHARE = 'common-statistics/kpi/lots/completed-share'

export const GET_DATES_BUYERS_AVG_CONTRACTS = 'common-statistics/dates/buyers-avg-contracts'
export const GET_KPI_BUYERS_SUPPLIERS_COUNT = 'common-statistics/kpi/buyers-suppliers/count'

export const GET_KPI_CONTRACTS_GSW_COUNT = 'common-statistics/kpi/contracts/gsw/count'

export const GET_TOP_TEN_SUPPLIERS_BY_CONTRACT_AMOUNT = 'common-statistics/top-10-suppliers/share/by-contract-amount'
export const GET_TOP_TEN_SUPPLIERS_BY_CONTRACT_COUNT = 'common-statistics/top-10-suppliers/share/by-contract-count'

export const GET_SMALL_SCALE_SUPPLIERS_CONTRACTS_AMOUNT_STATE = 'common-statistics/small-scale-suppliers/contracts/amount\n'

export const GET_ENQUIRIES_AVG_PER_PROCEDURE = 'common-statistics/enquiries/avg-per-procedure'
export const GET_AVG_PER_BUYER_SUPPLIER = 'common-statistics/classification/count/avg-per-buyer-supplier'
export const GET_PROCEDURES_COUNT_PER_MONTH = 'common-statistics/procedures/count/per-month'
export const GET_CONTRACT_BUDGET_AMOUNT_SHARE = 'common-statistics/contract/budget/amount/share'

export const GET_OKRB_REGION_TOP_AMOUNT = 'common-statistics/okrb-region/top/count'
export const GET_OKRB_REGION_TOP_COUNT = 'common-statistics/okrb-region/top/amount'

export const GET_SUPPLIERS_RESIDENCY_COUNT = 'common-statistics/suppliers/residency/count'
export const GET_BUYERS_REGIONS_CAPITAL_COUNT = 'common-statistics/buyers-capital/buyers-count'
export const GET_BUYERS_REGIONS_BUYERS_COUNT = 'common-statistics/buyers-regions/buyers-count'
export const GET_SUPPLIERS_REGIONS_SUPPLIERS_COUNT = 'common-statistics/suppliers-countries/suppliers-count'

export const GET_DATES_CONTRACTS_COMPETITIVE_COUNT_AMOUNT = 'common-statistics/dates/contracts/competitive/count-amount'
export const GET_PROCEDURE_TYPES_CONTRACTS_AMOUNT_STATE = 'common-statistics/procedure-types/contracts/amount'
export const GET_CONTRACTS_COMPETETIVE_COUNT_AMOUNT = 'common-statistics/contracts/competitive/count-amount'

export const GET_BUYERS_COMPETITIVE_TOP_BY_CONTRACT_AMOUNT = 'common-statistics/buyers/competitive/top/by-contract-amount'
export const GET_CLASSIFICATION_TOP_BY_CONTRACT_AMOUNT = 'common-statistics/classification/top/by-contract-amount'

export const GET_SMALL_SCALE_BUSINESS_LOTS_COUNT = 'common-statistics/kpi/small-scale-business/lots/count'

// Stories
//
export const GET_PRODUCT_COUNTRIES_CONTRACT_ITEMS_AMOUNT = 'home-page/product-countries/contract-items/amount'
export const GET_COUNTRIES_OKRB_TOP_AMOUNT = 'home-page/countries/okrb/top/amount'

export const GET_REGIONS_TOP_PROCUREMENT = 'home-page/regions/top/procurement'
export const GET_REGIONS_COMPETITIVITY_PROCUREMENT = 'home-page/regions/competitivity-procurement'

export const STORY_GOVERNMENT_PROCUREMENT = 'story-telling/international'

// Statistic merged
//
export const GET_AVERAGES = 'common-statistics-combinations/averages/enquiriesPerProcedure-proceduresCountPerMonth'
export const GET_BUYERS_SUPPLIERS = 'common-statistics-combinations/buyers-suppliers/buyersCapital-buyersRegion-topCompetitiveBuyers-top10SuppliersShareByCount-top10SuppliersShareByAmount-suppliersCountries-residency-scaleCount'
export const GET_CLASS_AVG_PER_TOP_BY_CONT_AMOUNT_REG_TOP_COUNT_AMOUNT_OKRB = 'common-statistics-combinations/classification/avgPerBuyer-topByContractsAmount-regionsWithTopCountOKRB-regionsWithTopAmountOKRB'
export const GET_CONT_COM_COUNT_AMOUNT_DATES_COM_CASSABA_SHARE = 'common-statistics-combinations/contracts/competitiveCountAmount-datesCompetitiveCountAmount-BySuppliersScaleAmount-budgetAmountShare'
export const GET_KPI_PROC_CCA_CONT_C_PER_SBS_COUNT = 'common-statistics-combinations/kpis/proceduresCount-contractsAmount-contractsCountPerSupplier-buyersSuppliersCount'
export const GET_KPI_SHARE_COMP_LLFS_SCALE_BUS_GSWC = 'common-statistics-combinations/kpis/shareCompleteLots-kpiLotsForSmallScaleBusiness-kpiGSWCount'

export const GET_BELARUS_PRODUCTS_SHARE = 'home-page/belarus-products/share'
