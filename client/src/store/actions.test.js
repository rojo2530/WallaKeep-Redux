import { setCurrentPage, setFilter, fetchAdverts } from './actions';
import { SET_CURRENT_PAGE, SET_FILTER, FETCH_ADVERTS_REQUEST, FETCH_ADVERTS_SUCCESS, FETCH_SINGLE_ADVERT_SUCCESS } from './types';
import api from '../utils/api';

jest.mock('../utils/api', () => {
  return jest.fn().mockImplementation(() => {
    return {getAdverts: jest.fn()};
  });
});


describe('actions', () => {
  describe('setCurrentPage', () => {
    it('should create a SET_CURRENT_PAGE', () => {
      const currentPage = 1;
      const expectedAction = {
        type: SET_CURRENT_PAGE,
        currentPage,
      }
      expect(setCurrentPage(currentPage)).toEqual(expectedAction);
    });
  });
  describe('setFilter', () => {
    it('should create a SET_FILTER', () => {
      const filter = {};
      const expectedAction = {
        type: SET_FILTER,
        filter,
      }
      expect(setFilter(filter)).toEqual(expectedAction);
    });
  });

  describe('fetchAdverts', () => {
    beforeEach(() => {
      dispatch.mockClear();
    });
    const dispatch = jest.fn();
    const getState = () => ({filter: {}, currentPage: 1});
    const adverts = [];
    api().getAdverts.mockResolvedValueOnce(adverts);
    it('should dispatch a FETCH_ADVERTS_REQUEST action', async () => {
      await fetchAdverts()(dispatch, getState);
      expect(dispatch).toHaveBeenNthCalledWith(1, {type: FETCH_ADVERTS_REQUEST});
      expect(api().getAdverts).toHaveBeenCalled();
      expect(dispatch).toHaveBeenNthCalledWith(2, {type: FETCH_ADVERTS_SUCCESS, adverts});
    });
  });
});