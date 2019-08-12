import {
  MY_POKEMON,
  ADD_MY_POKEMON,
  REMOVE_MY_POKEMON
} from "../actions/actionTypes";

let defaultState = [];

export default (state = defaultState, action) => {
  switch (action.type) {
    case MY_POKEMON:
      state = localStorage.getItem("my_pokemon") || state;
      return state;
    case ADD_MY_POKEMON:
      state.push(action.payload);
      localStorage.setItem("my_pokemon", JSON.stringify(state));
      return state;
    case REMOVE_MY_POKEMON:
      state.splice(state.indexOf(action.payload), 1);
      localStorage.setItem("my_pokemon", JSON.stringify(state));
      return state;
    default:
      return state;
  }
};
