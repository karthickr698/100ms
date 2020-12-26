import {
  FETCH_ALL_CHARACTERS,
  FETCH_ALL_CHARACTERS_SUCCESS,
  FETCH_ALL_CHARACTERS_FAILURE,
  FETCH_INDIVIDUAL_CHARACTERS,
  FETCH_INDIVIDUAL_CHARACTERS_SUCCESS,
  FETCH_INDIVIDUAL_CHARACTERS_FAILURE,
  FETCH_PAGINATION_CHARACTERS,
  FETCH_PAGINATION_CHARACTERS_SUCCESS,
  FETCH_PAGINATION_CHARACTERS_FAILURE,
  FETCH_QUOTES,
  FETCH_QUOTES_SUCCESS,
  FETCH_QUOTES_FAILURE,
  SEARCH_DATA,
  SEARCH_DATA_SUCCESS,
  SEARCH_DATA_FAILURE,
} from './actionTypes'
import axios from 'axios'
import { BASEURL } from '../url'

const fetchAllCharacters = () => {
  return {
    type: FETCH_ALL_CHARACTERS,
  }
}

const fetchAllCharactersSuccess = (payload) => {
  return {
    type: FETCH_ALL_CHARACTERS_SUCCESS,
    payload,
  }
}

const fetchAllCharactersFailure = () => {
  return {
    type: FETCH_ALL_CHARACTERS_FAILURE,
  }
}

export const getAllCharacters = () => (dispatch) => {
  dispatch(fetchAllCharacters())
  axios({
    method: 'GET',
    url: BASEURL + 'characters',
    headers: { 'Content-Type': 'application/json;charset=utf-8' },
  })
    .then((res) => {
      dispatch(fetchAllCharactersSuccess(res.data))
      dispatch(getPaginationCharacters(0))
    })
    .catch((err) => {
      dispatch(fetchAllCharactersFailure(err))
    })
}

export const fetchIndividualCharacters = () => {
  return {
    type: FETCH_INDIVIDUAL_CHARACTERS,
  }
}
export const fetchIndividualCharactersSuccess = (payload) => {
  return {
    type: FETCH_INDIVIDUAL_CHARACTERS_SUCCESS,
    payload,
  }
}
export const fetchIndividualCharactersFailure = () => {
  return {
    type: FETCH_INDIVIDUAL_CHARACTERS_FAILURE,
  }
}

export const getIndividualCharacters = (payload) => (dispatch) => {
  dispatch(fetchIndividualCharacters())
  axios({
    method: 'GET',
    url: BASEURL + `characters/${payload}`,
    headers: { 'Content-Type': 'application/json;charset=utf-8' },
  })
    .then((res) => {
      dispatch(fetchIndividualCharactersSuccess(res.data))
      dispatch(getQuotes(res.data[0].name))
    })
    .catch((err) => {
      dispatch(fetchIndividualCharactersFailure(err))
    })
}

export const fetchPaginationCharacters = () => {
  return {
    type: FETCH_PAGINATION_CHARACTERS,
  }
}

export const fetchPaginationCharactersSuccess = (payload) => {
  return {
    type: FETCH_PAGINATION_CHARACTERS_SUCCESS,
    payload,
  }
}

export const fetchPaginationCharactersFailure = () => {
  return {
    type: FETCH_PAGINATION_CHARACTERS_FAILURE,
  }
}

export const getPaginationCharacters = (payload) => (dispatch) => {
  dispatch(fetchPaginationCharacters())
  axios({
    method: 'GET',
    url: BASEURL + `characters?limit=10&offset=${payload}`,
    headers: { 'Content-Type': 'application/json;charset=utf-8' },
  })
    .then((res) => {
      dispatch(fetchPaginationCharactersSuccess(res.data))
    })
    .catch((err) => {
      dispatch(fetchPaginationCharactersFailure(err))
    })
}

export const fetchQuotes = () => {
  return {
    type: FETCH_QUOTES,
  }
}

export const fetchQuotesSuccess = (payload) => {
  return {
    type: FETCH_QUOTES_SUCCESS,
    payload,
  }
}

export const fetchQuotesFailure = () => {
  return {
    type: FETCH_QUOTES_FAILURE,
  }
}

export const getQuotes = (payload) => (dispatch) => {
  dispatch(fetchQuotes())
  const format = payload.split(' ').join('+')
  axios({
    method: 'GET',
    url: BASEURL + `quote?author=${format}`,
    headers: { 'Content-Type': 'application/json;charset=utf-8' },
  })
    .then((res) => {
      dispatch(fetchQuotesSuccess(res.data))
    })
    .catch((err) => {
      dispatch(fetchQuotesFailure(err))
    })
}

export const searchData = (payload) => {
  return {
    type: SEARCH_DATA,
  }
}

export const searchDataSuccess = (payload) => {
  return {
    type: SEARCH_DATA_SUCCESS,
    payload,
  }
}

export const searchDataFailure = (payload) => {
  return {
    type: SEARCH_DATA_FAILURE,
  }
}

export const getSearchData = (name, type) => (dispatch) => {
  dispatch(searchData())
  const format = name.split(' ').join('+')
  const URL =
    type === 'name'
      ? `characters?name=${format}`
      : `characters?category=${format}`
  axios({
    method: 'GET',
    url: BASEURL + URL,
    headers: { 'Content-Type': 'application/json;charset=utf-8' },
  })
    .then((res) => {
      dispatch(searchDataSuccess(res.data))
    })
    .catch((err) => {
      dispatch(searchDataFailure(err))
    })
}
