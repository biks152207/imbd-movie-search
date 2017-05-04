import { fromJS } from 'immutable';

import { SEARCH_SUCESS, SEARCH_LOADING } from '../constants/ActionTypes';

const initialState = fromJS({
  movies: {},
  loading: false
})
export default function movie(state = initialState, action) {
  switch (action.type) {
  case SEARCH_SUCESS :
    const newstate = state.set('movies', action.payload).set('loading', false);
    return newstate;
  case SEARCH_LOADING :
    const newState = state.set('loading', true);
    return newState;
  default:
    return state;
  }
}
