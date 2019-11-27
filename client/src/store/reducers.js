import * as TYPES from './types';

const initialState = {
  filter: {},
  user: {},
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

