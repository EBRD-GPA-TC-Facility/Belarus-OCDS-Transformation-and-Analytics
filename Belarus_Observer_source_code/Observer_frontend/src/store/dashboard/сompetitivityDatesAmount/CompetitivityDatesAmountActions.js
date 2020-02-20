import { get }    from "../../../utils/api/apiUtils"
import * as Types from "./CompetitivityDatesAmountConstants"
import * as API   from "../../../utils/api/apiConstants"

export const getCompetitivityDatesAmount = () => {
  const TYPES = [
    Types.COMPETITIVITY_DATES_AMOUNT_REQUEST,
    Types.COMPETITIVITY_DATES_AMOUNT_SUCCESS,
    Types.COMPETITIVITY_DATES_AMOUNT_FAILURE
  ]
  return get(API.COMPETITIVITY_DATES_AMOUNT, TYPES)
}
