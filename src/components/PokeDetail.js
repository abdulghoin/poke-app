import React, { useState, useEffect } from "react";

import Loader from "./Loader";

import "./PokeDetail.css";

const PokeDetail = ({
  match: {
    params: { name }
  }
}) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    const fetchData = async () => {
      let uri = `https://pokeapi.co/api/v2/pokemon/${name}`;
      const response = await fetch(uri);
      const result = await response.json();
      setData(result);
      setIsLoading(false);
    };

    fetchData();
  }, [name]);

  if (isLoading) return <Loader />;

  console.log(data);
  const { sprites, types, moves } = data;
  const src = sprites.front_default;

  return (
    <section className="detail">
      <img src={src} alt={name} />
      <div>
        <b className="title">Name</b>
        <span>{name}</span>
      </div>
      <div className="rounded-section">
        <b className="title">Types</b>
        <ul>
          {types.map(({ type: { name } }) => (
            <li
              key={name}
              className="sm:w-1/5 md:w-1/3 lg:w-1/4 xl:w-1/5 sm:inline-block"
            >
              {name}
            </li>
          ))}
        </ul>
      </div>
      <div className="rounded-section">
        <b className="title">Moves</b>
        <ul>
          {moves.map(({ move: { name } }) => (
            <li
              key={name}
              className="sm:w-1/5 md:w-1/3 lg:w-1/4 xl:w-1/5 sm:inline-block"
            >
              {name}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default PokeDetail;
