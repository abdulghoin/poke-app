import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import { getAllPokemon } from "../actions/allPokemon";

import { getMyPokemon } from "../actions/myPokemon";

import Loader from "./Loader";

const PokeList = ({
  location: { pathname },
  allPokemon: { data, loading },
  myPokemon,
  getAllPokemon,
  getMyPokemon
}) => {
  const { results, next, count: total } = data || {};
  const [onNextLoad, setNL] = useState(0);

  useEffect(() => {
    if (pathname.includes("my-pokemon")) {
      getMyPokemon();
    } else {
      getAllPokemon(onNextLoad, next);
    }
  }, [pathname, onNextLoad]);

  let list = pathname.includes("my-pokemon") ? myPokemon : results;
  list = list || [];

  return (
    <>
      {list.length > 0 ? (
        <ul>
          {list.map(({ name }) => (
            <li key={name}>
              <Link to={`/${name}`} className="no-underline block p-2 w-full">
                {name}
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-center text-sm my-4">No Pokemon</p>
      )}

      {!pathname.includes("my-pokemon") &&
        (loading ? (
          <Loader dataTestId="loading" />
        ) : (
          list.length < total && (
            <div className="text-center py-3">
              <button
                onClick={() => setNL(onNextLoad + 1)}
                className="bg-blue-600 hover:bg-blue-400 text-white px-6 py-1 rounded cursor-pointer"
              >
                next
              </button>
            </div>
          )
        ))}
    </>
  );
};

const mapStoreToProps = ({ allPokemon, myPokemon }) => ({
  allPokemon,
  myPokemon
});

const mapDispatchToProps = {
  getAllPokemon,
  getMyPokemon
};

export default connect(
  mapStoreToProps,
  mapDispatchToProps
)(PokeList);
