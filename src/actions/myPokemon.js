import { ADD_MY_POKEMON, REMOVE_MY_POKEMON, MY_POKEMON } from "./actionTypes";

export const getMyPokemon = () => ({
  type: MY_POKEMON
});

export const addMyPokemon = pokemon => ({
  type: ADD_MY_POKEMON,
  payload: pokemon
});

export const removeMyPokemon = pokemon => ({
  type: REMOVE_MY_POKEMON,
  payload: pokemon
});
