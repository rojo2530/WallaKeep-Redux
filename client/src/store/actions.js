import 
  { SET_USER, 
    SET_FILTER, 
    FETCH_ADVERTS_REQUEST,
    FETCH_ADVERTS_SUCCESS,
    FETCH_ADVERTS_FAILURE, 
    FETCH_SINGLE_ADVERT_REQUEST,
    FETCH_SINGLE_ADVERT_FAILURE,
    FETCH_SINGLE_ADVERT_SUCCESS,
    CREATE_ADVERT_REQUEST,
    CREATE_ADVERT_SUCCESS,
    CREATE_ADVERT_FAILURE,
    EDIT_ADVERT_REQUEST,
    EDIT_ADVERT_SUCCESS,
    EDIT_ADVERT_FAILURE,
    SET_CURRENT_PAGE,
  } from './types';

import api from '../utils/api';

const { getAdverts, getAdvertDetail, createAdvert, updateAdvert } = api();

export const fetchAdverts = () => {
  return async function(dispatch, getState) {
    const { filter, currentPage } = getState();
    dispatch(fetchAdvertsRequest());
    try {
      const { results } = await getAdverts(filter, currentPage);
      dispatch(fetchAdvertsSuccess(results));
    } catch (error) {
      dispatch(fetchAdvertsFailure(error));
    }
  }
}

export const fecthSingleAdvert = id => {
  return async function (dispatch, getState) {
    const { currentAdvert } = getState();
    //Si el anuncio ya está en redux, no despachamos nada
    if (!currentAdvert || id !== currentAdvert._id) {
      console.log('Hace petición a la api');
      dispatch(fetchSingleAdvertRequest(id));
      try {
        const advert = await getAdvertDetail(id);
        dispatch(fetchSingleAdvertSuccess(advert));
      } catch (error) {
        dispatch(fetchSingleAdvertFailure(error));
      }
    }
  }
}

export const createAdvertPost = advert => {
  return async function (dispatch, getState) {
    dispatch(createAdvertRequest(advert));
    try {
      const { result } = await createAdvert(advert);
      dispatch(createAdvertSuccess(result));
    } catch (error) {
      dispatch(createAdvertFailure(error));
    }
  }
}

export const editAdvertPost = (id, advert) => {
  return async function (dispatch, getState) {
    dispatch(editAdvertRequest(advert));
    try {
      const { data } = await updateAdvert(id, advert);
      dispatch(editAdvertSuccess(data.result));
    } catch (error) {
      dispatch(editAdvertFailure(error));
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

export const fetchSingleAdvertSuccess = currentAdvert => ({
  type: FETCH_SINGLE_ADVERT_SUCCESS,
  currentAdvert,
})

export const createAdvertRequest = () => ({
  type: CREATE_ADVERT_REQUEST,
});

export const createAdvertFailure = error => ({
  type: CREATE_ADVERT_FAILURE,
  error,
});

export const createAdvertSuccess = currentAdvert => ({
  type: CREATE_ADVERT_SUCCESS,
  currentAdvert,
});

export const editAdvertRequest = () => ({
  type: EDIT_ADVERT_REQUEST,
});

export const editAdvertFailure = error => ({
  type: EDIT_ADVERT_FAILURE,
  error,
});

export const editAdvertSuccess = currentAdvert => ({
  type: EDIT_ADVERT_SUCCESS,
  currentAdvert,
});

export const setUser = user => ({
  type: SET_USER,
  user,
});

export const setFilter = filter => ({
  type: SET_FILTER,
  filter,
});

export const setCurrentPage = currentPage => ({
  type: SET_CURRENT_PAGE,
  currentPage,
});
