import { SEARCH_MOVIE,  SEARCH_SUCESS, SEARCH_LOADING  } from '../constants/ActionTypes';
import axios from 'axios';

const api_key = '90631245f8b04d0d4416f766e97dcd6a';
const url = 'https://api.themoviedb.org/3/search/movie';

export function searchSuccess(payload) {
  return {
     type:  SEARCH_SUCESS ,
     payload
  }
}

export function movieLoading(){
  return {
    type: SEARCH_LOADING
  }
}

export function searchMovie(query) {
  return dispatch => {
    dispatch(movieLoading());
    axios.get(url, {
      params:{
        query,
        api_key
      }
    })
    .then(function(response){
      dispatch(searchSuccess(response.data));
    })
  }
};
