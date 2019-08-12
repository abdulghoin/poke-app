import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import Loader from "./Loader";

const PokeList = () => {
  const [data, setData] = useState([]);
  const [uri, setUri] = useState("https://pokeapi.co/api/v2/pokemon");
  const [total, setTotal] = useState(0);
  const [onNextLoad, setNL] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    const fetchData = async () => {
      const response = await fetch(uri);
      const result = await response.json();

      setData(data.length > 0 ? [...data, ...result.results] : result.results);
      setIsLoading(false);
      setUri(result.next);
      setTotal(result.count);
    };

    fetchData();
  }, [onNextLoad]);

  return (
    <>
      {data.length > 0 && (
        <ul>
          {data.map(({ name }) => (
            <li key={name}>
              <Link to={`/${name}`} className="no-underline block p-2 w-full">
                {name}
              </Link>
            </li>
          ))}
        </ul>
      )}

      {isLoading ? (
        <Loader dataTestId="loading" />
      ) : (
        data.length < total && (
          <div className="text-center py-3">
            <button
              onClick={() => setNL(onNextLoad + 1)}
              className="bg-blue-600 hover:bg-blue-400 text-white px-6 py-1 rounded cursor-pointer"
            >
              next
            </button>
          </div>
        )
      )}
    </>
  );
};

export default PokeList;
