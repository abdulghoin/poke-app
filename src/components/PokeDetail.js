import React, { useState, useEffect } from "react";
import { useTransition, animated, config } from "react-spring";

import Loader from "./Loader";

import "./PokeDetail.css";

const changeSprites = sprites =>
  Object.values(sprites)
    .filter(i => i !== null)
    .map(i => i);

const PokeDetail = ({
  match: {
    params: { name }
  }
}) => {
  const [data, setData] = useState(null);
  const [sprites, setSprites] = useState([]);
  const [spritesLength, setSL] = useState(4);
  const [index, set] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    const fetchData = async () => {
      let uri = `https://pokeapi.co/api/v2/pokemon/${name}`;
      const response = await fetch(uri);
      const result = await response.json();

      let sprites = changeSprites(result.sprites);
      setSprites(sprites);
      setSL(sprites.length);
      setData(result);
      setIsLoading(false);
    };

    fetchData();
  }, [name]);

  useEffect(() => {
    let imgInterval = setInterval(
      () => set(state => (state + 1) % spritesLength),
      5000
    );

    return () => clearInterval(imgInterval);
  }, [spritesLength]);

  const transitions = useTransition(
    sprites.length > 0 ? sprites[index] : "",
    item => item,
    {
      from: { opacity: 0 },
      enter: { opacity: 1 },
      leave: { opacity: 0 },
      config: config.molasses
    }
  );
  if (isLoading) return <Loader />;

  let { types, moves } = data;

  // const src = sprites[0].src;
  return (
    <section className="detail">
      {transitions.map(({ item, props, key }) => (
        <animated.div
          key={key}
          className="img"
          style={{
            ...props,
            backgroundImage: `url(${item})`
          }}
        />
      ))}
      {/* <img src={src} alt={name} /> */}
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
