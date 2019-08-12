import { ALL_POKEMON, FETCH_ALL_POKEMON, NEXT_POKEMON } from "./actionTypes";

let defaultUri = "https://pokeapi.co/api/v2/pokemon";

export const getAllPokemon = (next, nextUri) => async dispatch => {
  let uri = defaultUri;
  dispatch(fetchAllPokemon());
  console.log(next, uri);

  const response = await fetch(next > 0 ? nextUri : defaultUri);
  const result = await response.json();
  if (next > 0) {
    dispatch(nextAllPokemon(result));
  } else {
    dispatch(fetchedAllPokemon(result));
  }
  return result;
};

const fetchAllPokemon = () => ({
  type: FETCH_ALL_POKEMON
});

const fetchedAllPokemon = result => ({
  type: ALL_POKEMON,
  payload: result
});

const nextAllPokemon = result => ({
  type: NEXT_POKEMON,
  payload: result
});
