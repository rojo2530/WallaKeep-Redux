import 
  { SET_USER, 
    SET_FILTER, 
    // SET_ADVERTS,
    FETCH_ADVERTS_REQUEST,
    FETCH_ADVERTS_SUCCESS,
    FETCH_ADVERTS_FAILURE 
  } from './types';

import api from '../utils/api';

const { getAdverts } = api();

export const fetchAdverts = () => {
  return async function(dispatch, getState) {
    const { filter } = getState();
    dispatch(fetchAdvertsRequest());
    try {
      const { results } = await getAdverts(filter);
      dispatch(fetchAdvertsSuccess(results));
    } catch (error) {
      dispatch(fetchAdvertsFailure(error));
    }
  }
}

export const fetchAdvertsRequest = () => ({
  type: FETCH_ADVERTS_REQUEST,
});

export const fetchAdvertsFailure = error => ({
  type: FETCH_ADVERTS_FAILURE,
  error,
});

export const fetchAdvertsSuccess = adverts => ({
  type: FETCH_ADVERTS_SUCCESS,
  adverts,
})

export const setUser = user => ({
  type: SET_USER,
  user,
});

export const setFilter = filter => ({
  type: SET_FILTER,
  filter,
});

