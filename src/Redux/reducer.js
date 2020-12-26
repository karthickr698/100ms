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

const initState = {
  allCharacterDatas: [],
  paginationDatas: [],
  filterDatas: [],
  quotes: [],
  personData: {},
  category: [],
  isLoading: false,
  isError: false,
  isDataLodaing: false,
  isDataFail: false,
  filterDataLoading: false,
}
export const reducer = (state = initState, action) => {
  switch (action.type) {
    case FETCH_ALL_CHARACTERS:
      return {
        ...state,
        isLoading: true,
        isError: false,
      }

    case FETCH_ALL_CHARACTERS_SUCCESS:
      let arr = []
      action.payload.map((ele) => {
        if (!arr.includes(ele.category)) {
          arr.push(ele.category)
        }
      })
      return {
        ...state,
        isLoading: false,
        allCharacterDatas: action.payload,
        filterDatas: action.payload,
        category: arr,
      }

    case FETCH_ALL_CHARACTERS_FAILURE:
      return {
        ...state,
        isLoading: false,
        isError: true,
      }

    case FETCH_INDIVIDUAL_CHARACTERS:
      return {
        ...state,
        isLoading: true,
        isError: false,
      }

    case FETCH_INDIVIDUAL_CHARACTERS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        personData: action.payload[0],
      }

    case FETCH_INDIVIDUAL_CHARACTERS_FAILURE:
      return {
        ...state,
        isLoading: false,
        isError: true,
      }

    case FETCH_PAGINATION_CHARACTERS:
      return {
        ...state,
        isDataLodaing: true,
        isDataFail: false,
      }

    case FETCH_PAGINATION_CHARACTERS_SUCCESS:
      return {
        ...state,
        isDataLodaing: false,
        paginationDatas: action.payload,
      }

    case FETCH_PAGINATION_CHARACTERS_FAILURE:
      return {
        ...state,
        isDataFail: true,
        isDataLodaing: false,
      }

    case FETCH_QUOTES:
      return {
        ...state,
        isDataLodaing: true,
        isDataFail: false,
      }

    case FETCH_QUOTES_SUCCESS:
      return {
        ...state,
        isDataLodaing: false,
        quotes: action.payload,
      }

    case FETCH_QUOTES_FAILURE:
      return {
        ...state,
        isDataLodaing: false,
        isDataFail: true,
      }

    case SEARCH_DATA:
      return {
        ...state,
        filterDataLoading: true,
      }

    case SEARCH_DATA_SUCCESS:
      const data = action.payload.splice
      return {
        ...state,
        filterDataLoading: false,
        filterDatas: action.payload,
        allCharacterDatas: action.payload,
        paginationDatas: action.payload.slice(0, 11),
      }

    case SEARCH_DATA_FAILURE:
      return {
        ...state,
        filterDataLoading: false,
      }

    default:
      return state
  }
}
