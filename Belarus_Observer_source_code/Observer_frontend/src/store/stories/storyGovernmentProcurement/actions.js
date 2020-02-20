import { get }   from '../../../utils/api/apiUtils'
import * as Type from './constants'
import * as API  from '../../../utils/api/apiConstants'


export const getStoryGovernmentProcurement = () => {
  const TYPES = [
    Type.GET_STORY_GOVERNMENT_PROCUREMENT_REQUEST,
    Type.GET_STORY_GOVERNMENT_PROCUREMENT_SUCCESS,
    Type.GET_STORY_GOVERNMENT_PROCUREMENT_FAILURE,
  ]
  return get(API.STORY_GOVERNMENT_PROCUREMENT, TYPES)
}
