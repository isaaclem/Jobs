import axios from 'axios';
import reverseGeocode from 'latlng-to-zip';
import qs from 'qs';

import {
  FETCH_JOBS,
  LIKE_JOB,
  CLEAR_LIKE_JOBS
} from './types';

const JOB_ROOT_URL = 'http://api.indeed.com/ads/apisearch?';
const JOB_QUERY_PARAMS = {
  publisher: '4201738803816157',
  format: 'json',
  v: 2,
  latlong: 1,
  radius: 10,
  q: 'javascript'
};

const buildJobsURL = (zip) => {
  const query = qs.stringify({ ...JOB_QUERY_PARAMS, l: zip });
  return `${JOB_ROOT_URL}${query}`;
};

export const fetchJobs = (region, callbback) => async dispatch => {
  try {
    const zipCode = await reverseGeocode(region);
    const url = buildJobsURL(zipCode);
    const { data } = await axios.get(url);

    dispatch({ type: FETCH_JOBS, payload: data });
    callbback();
  } catch (err) {
    console.log(err);
  }
};

export const likeJob = (job) => {
  return {
    type: LIKE_JOB,
    payload: job
  };
};

export const clearLikeJobs = () => {
  return { type: CLEAR_LIKE_JOBS };
};
