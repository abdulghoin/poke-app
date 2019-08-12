import {
  ALL_POKEMON,
  FETCH_ALL_POKEMON,
  NEXT_POKEMON
} from "../actions/actionTypes";

let defaultState = {
  data: null,
  loading: true
};

export default (state = defaultState, action) => {
  let { data } = state;
  switch (action.type) {
    case FETCH_ALL_POKEMON:
      return { ...state, loading: true };
    case ALL_POKEMON:
      console.log(action.payload);
      data = action.payload;
      return { ...state, data, loading: false };
    case NEXT_POKEMON:
      data = {
        ...data,
        ...action.payload,
        results: [...data.results, ...action.payload.results]
      };
      return { ...state, data, loading: false };

    default:
      return state;
  }
};
