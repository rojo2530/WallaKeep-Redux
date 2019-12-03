import * as TYPES from './types';

export const initialState = {
  filter: {},
  user: {},
  adverts: [],
  ui: {
    isFetching: false,
    error: null,
  }
}

export const user = (state = initialState.user, action) => {
  switch(action.type) {
    case TYPES.SET_USER:
      return action.user;
    default: 
      return state;
  }
};

export const filter = (state = initialState.filter, action) => {
  switch(action.type) {
    case TYPES.SET_FILTER:
      return action.filter;
    default: 
      return state;
  }
};

export const adverts = (state = initialState.adverts, action) => {
  switch(action.type) {
    case TYPES.FETCH_ADVERTS_SUCCESS:
      return action.adverts;
    
    

    default: 
      return state;
  }
}

export const ui = (state = initialState.ui, action) => {
  switch(action.type) {
    case TYPES.FETCH_ADVERTS_REQUEST:
      return { ...state, isFetching: true, error: null }
    case TYPES.FETCH_ADVERTS_FAILURE:
      return { ...state, isFetching: false, error: action.error }
    case TYPES.FETCH_ADVERTS_SUCCESS:
      return { ...state, isFetching: false, error: null }
    default: 
      return state;
  }
}