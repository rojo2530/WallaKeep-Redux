import * as TYPES from './types';

const initialState = {
  adverts: [],
  filter: {},
  user: {}
}

export const user = (state = initialState, action) => {
  switch(action.type) {
    case TYPES.SET_USER:
      return action.user;
    default: 
      return state;
  }
};

export const filter = (state = initialState, action) => {
  switch(action.type) {
    case TYPES.SET_FILTER:
      return action.filter;
    default: 
      return state;
  }
};

