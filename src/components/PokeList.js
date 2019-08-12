import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import { getAllPokemon } from "../actions/allPokemon";

import { getMyPokemon } from "../actions/myPokemon";

import Loader from "./Loader";

import "./PokeList.css";

const PokeList = ({
  location: { pathname },
  allPokemon: { data, loading },
  myPokemon,
  getAllPokemon,
  getMyPokemon
}) => {
  const { results, next, count: total } = data || {};
  const [onNextLoad, setNL] = useState(0);
  let listPage = !pathname.includes("my-pokemon");

  useEffect(() => {
    if (listPage) {
      getMyPokemon();
      getAllPokemon(onNextLoad, next);
    } else {
      getMyPokemon();
    }
  }, [pathname, onNextLoad]);

  let list = listPage ? results : myPokemon;
  list = list || [];
  myPokemon = myPokemon.map(({ name }) => name);

  return (
    <>
      <h5 className="text-center py-3 mx-4 font-bold border-b-2 border-gray-500">
        {listPage ? "All Pokemon" : "Your Pokemon"}
      </h5>
      {list.length > 0 ? (
        <ul className="px-4">
          {list.map(({ name }) => (
            <li key={name}>
              <Link
                to={`/${name}`}
                className="no-underline block p-2 w-full relative"
              >
                {name}
                {listPage && myPokemon.includes(name) && (
                  <span className="your-poke text-xs p-1 bg-blue-400 absolute rounded">
                    yours
                  </span>
                )}
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-center text-sm my-4">No Pokemon</p>
      )}

      {listPage &&
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
