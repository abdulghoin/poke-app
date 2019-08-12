import { combineReducers } from "redux";

import myPokemon from "./myPokemon";
import allPokemon from "./allPokemon";

export default combineReducers({
  myPokemon,
  allPokemon
});
