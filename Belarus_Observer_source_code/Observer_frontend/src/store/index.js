import { combineReducers } from 'redux'
import { routerReducer }   from 'react-router-redux'

import navigation               from './navigation/NavReducers'
import dashboard                from './dashboard/DashboardReducers'
import kpiChart                 from './dashboard/kpiCharts/KpiChartsReducers'
import competitivityDatesAmount from './dashboard/сompetitivityDatesAmount/CompetitivityDatesAmountReducers'

import kpiProceduresCountState                   from './statistic/kpiProceduresCount/KpiProceduresCountReducers'
import kpiContractsAmountState                   from './statistic/kpiContractsAmount/KpiContractsAmountReducers'
import kpiContractsAmountAvgPerSupplierState
                                                 from './statistic/kpiContractsAmountAvgPerSupplier/KpiContractsAmountAvgPerSupplierReducers'
import kpiLotsCompletedShareState                from './statistic/kpiLotsCompletedShare/KpiLotsCompletedShareReducers'
import datesBuyersAvgContractsState
                                                 from './statistic/datesBuyersAvgContracts/DatesBuyersAvgContractsReducers'
import kpiBuyersSuppliersCountState
                                                 from "./statistic/kpiBuyersSuppliersCount/KpiBuyersSuppliersCountReducers"
import classificationTopByContractAmountState
                                                 from "./statistic/classificationTopByContractAmount/ClassificationTopByContractAmountReducers"
import buyersCompetitiveTopByContractAmountState
                                                 from "./statistic/buyersCompetitiveTopByContractAmount/BuyersCompetitiveTopByContractAmountReducers"
import topTenSuppliersByContractCountAmountState from "./statistic/topTenSuppliers/topTenSuppliersReducers"
import enquiriesAvgPerProcedureState
                                                 from "./statistic/enquiriesAvgPerProcedure/EnquiriesAvgPerProcedureReducers"
import avgPerBuyerSupplierState                  from "./statistic/avgPerBuyerSupplier/AvgPerBuyerSupplierReducers"
import contractBudgetAmountShareState
                                                 from "./statistic/contractBudgetAmountShare/ContractBudgetAmountShareReducers"
import proceduresCountPerMonthState
                                                 from "./statistic/proceduresCountPerMonth/proceduresCountPerMonthReducers"
import buyersRegionsBuyersCountState
                                                 from "./statistic/buyersRegionsBuyersCount/buyersRegionsBuyersCountReducers"
import buyersRegionsCapitalCountState
                                                 from "./statistic/buyersRegionsCapitalCount/BuyersRegionsCapitalCountReducers"
import okrbRegionTopAmountState                  from "./statistic/okrbRegionTopAmount/OkrbRegionTopAmountReducers"
import okrbRegionTopCountState                   from "./statistic/okrbRegionTopCount/OkrbRegionTopCountReducers"
import procedureTypesContractsAmountState
                                                 from "./statistic/procedureTypesContractsAmount/ProcedureTypesContractsAmountReducers"
import ContractsCompetetiveCountAmountState
                                                 from "./statistic/contractsContractsCompetetiveCountAmount/ContractsCompetetiveCountAmountReducers"
import smallScaleSuppliersContractsAmountState
                                                 from "./statistic/smallScaleSuppliersContractsAmount/SmallScaleSuppliersContractsAmountReducers"
import kpiContractsGswCountState                 from "./statistic/kpiContractsGswCount/KpiContractsGswCountReducers"
import smallScaleBusinessLotsCountState
                                                 from "./statistic/smallScaleBusinessLotsCount/SmallScaleBusinessLotsCountReducers"
import suppliersRegionsSuppliersCountState
                                                 from "./statistic/suppliersRegionsSuppliersCount/SuppliersRegionsSuppliersCountReducers"
import suppliersResidencyCountState
                                                 from "./statistic/suppliersResidencyCount/SuppliersResidencyCountReducers"
import datesContractsCompetitiveCountAmountState
                                                 from "./statistic/datesContractsCompetitiveCountAmount/DatesContractsCompetitiveCountAmountReducers"
import buyBelarusianState                        from "./stories/buyBelarusian/reducer"
import buyRegionState                            from "./stories/buyRegion/reducer"
import statisticState                            from "./statisticMerge/reducer"
import { localeReducer }                         from "./locale/LocaleReducer"
import governmentProcurementState                from "./stories/storyGovernmentProcurement/reducer"


export default combineReducers({
  locale: localeReducer,
  routing: routerReducer,
  navigation,
  governmentProcurementState,
  dashboard,
  statisticState,
  kpiChart,
  competitivityDatesAmount,
  kpiProceduresCountState,
  kpiContractsAmountState,
  kpiContractsAmountAvgPerSupplierState,
  kpiLotsCompletedShareState,
  datesBuyersAvgContractsState,
  kpiBuyersSuppliersCountState,
  classificationTopByContractAmountState,
  buyersCompetitiveTopByContractAmountState,
  topTenSuppliersByContractCountAmountState,
  enquiriesAvgPerProcedureState,
  avgPerBuyerSupplierState,
  contractBudgetAmountShareState,
  proceduresCountPerMonthState,
  buyersRegionsBuyersCountState,
  buyersRegionsCapitalCountState,
  okrbRegionTopAmountState,
  okrbRegionTopCountState,
  procedureTypesContractsAmountState,
  ContractsCompetetiveCountAmountState,
  smallScaleSuppliersContractsAmountState,
  kpiContractsGswCountState,
  smallScaleBusinessLotsCountState,
  suppliersRegionsSuppliersCountState,
  suppliersResidencyCountState,
  datesContractsCompetitiveCountAmountState,
  buyBelarusianState,
  buyRegionState,
})
