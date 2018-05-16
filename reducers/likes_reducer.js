import _ from 'lodash';
import { REHYDRATE } from 'redux-persist/es/constants';
import { LIKE_JOB, CLEAR_LIKE_JOBS } from '../actions/types';

export default function (state = [], action) {
  switch (action.type) {
    case REHYDRATE:
      return action.payload.likedJobs || [];
    case LIKE_JOB:
      return _.uniqBy([
        action.payload, ...state
      ], 'jobkey');
    case CLEAR_LIKE_JOBS:
      return [];
    default:
      return state;
  }
}
