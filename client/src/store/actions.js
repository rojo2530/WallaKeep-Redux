import 
  { SET_USER, 
    SET_FILTER, 
    // SET_ADVERTS,
    FETCH_ADVERTS_REQUEST,
    FETCH_ADVERTS_SUCCESS,
    FETCH_ADVERTS_FAILURE, 
    FETCH_SINGLE_ADVERT_REQUEST,
    FETCH_SINGLE_ADVERT_FAILURE,
    FETCH_SINGLE_ADVERT_SUCCESS,
    CREATE_ADVERT_REQUEST,
    CREATE_ADVERT_SUCCESS,
    CREATE_ADVERT_FAILURE,
  } from './types';

import api from '../utils/api';

const { getAdverts, getAdvertDetail, createAdvert } = api();

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

export const fecthSingleAdvert = id => {
  return async function (dispatch, getState) {
    dispatch(fetchSingleAdvertRequest(id));
    try {
      const advert = await getAdvertDetail(id);
      dispatch(fetchSingleAdvertSuccess(advert));
    } catch (error) {
      dispatch(fetchSingleAdvertFailure(error));
    }
  }
}

export const createAdvert = advert => {
  return async function (dispatch, getState) {
    dispatch(createAdvertRequest());
    try {
      const response = await createAdvert(advert);
      dispatch(createAdvertSuccess(response));
    } catch (error) {
      dispatch(createAdvertFailure(error));
    }
  }
}

export const fetchAdvertsRequest = id => ({
  type: FETCH_ADVERTS_REQUEST,
});

export const fetchAdvertsFailure = error => ({
  type: FETCH_ADVERTS_FAILURE,
  error,
});

export const fetchAdvertsSuccess = adverts => ({
  type: FETCH_ADVERTS_SUCCESS,
  adverts,
});

export const fetchSingleAdvertRequest = id => ({
  type: FETCH_SINGLE_ADVERT_REQUEST,
});

export const fetchSingleAdvertFailure = error => ({
  type: FETCH_SINGLE_ADVERT_FAILURE,
  error,
});

export const fetchSingleAdvertSuccess = advert => ({
  type: FETCH_SINGLE_ADVERT_SUCCESS,
  advert,
})

export const createAdvertRequest = id => ({
  type: CREATE_ADVERT_REQUEST,
});

export const createAdvertFailure = error => ({
  type: CREATE_ADVERT_FAILURE,
  error,
});

export const createAdvertSuccess = advert => ({
  type: CREATE_ADVERT_SUCCESS,
  advert,
})

export const setUser = user => ({
  type: SET_USER,
  user,
});

export const setFilter = filter => ({
  type: SET_FILTER,
  filter,
});

