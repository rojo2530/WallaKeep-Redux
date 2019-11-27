import { SET_USER, SET_FILTER, SET_ADVERTS } from './types';

export const setUser = user => ({
  type: SET_USER,
  user,
});

export const setAdverts = adverts => ({
  type: SET_ADVERTS,
  adverts,
});

export const setFilter = filter => ({
  type: SET_FILTER,
  filter,
});

