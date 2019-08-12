import React, { useState, useEffect } from "react";
import { useTransition, animated, config } from "react-spring";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import { addMyPokemon, removeMyPokemon } from "../actions/myPokemon";

import { Dialog } from "@material-ui/core";

import Loader from "./Loader";

import "./PokeDetail.css";
import catchingSrc from "../assets/images/catching.gif";

const changeSprites = sprites =>
  Object.values(sprites)
    .filter(i => i !== null)
    .map(i => i);

const PokeDetail = ({
  match: {
    params: { name }
  },
  myPokemon,
  addMyPokemon,
  removeMyPokemon
}) => {
  const [data, setData] = useState(null);
  const [sprites, setSprites] = useState([]);
  const [spritesLength, setSL] = useState(4);
  const [index, set] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [catchPokemon, setCatch] = useState("");

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

  function getCathingResult() {
    let res = Math.floor(Math.random() * 2);
    let resText = "failed";
    if (res === 1) {
      resText = "success";
      addMyPokemon({ name });
    }
    return resText;
  }

  function catching() {
    setDialogOpen(true);
    setCatch("");
    setTimeout(() => {
      setCatch(getCathingResult());
    }, 2000);
  }

  function closeDialog() {
    setDialogOpen(false);
    setTimeout(() => {
      setCatch("");
    }, 500);
  }

  function removePokemon() {
    removeMyPokemon(name);
  }

  const isMyPokemon = myPokemon.map(({ name }) => name).includes(name);
  // const src = sprites[0].src;
  return (
    <>
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

        <div className="catch">
          {isMyPokemon ? (
            <button onClick={removePokemon}>Remove My Pokemon</button>
          ) : (
            <button onClick={catching}>Catch</button>
          )}
        </div>
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

      <Dialog
        open={dialogOpen}
        disableBackdropClick={true}
        disableEscapeKeyDown={true}
        onClose={closeDialog}
      >
        <div className="dialog-content">
          {(() => {
            switch (catchPokemon.toLowerCase()) {
              case "success":
                return (
                  <div className="text-center text-xl">
                    <b className="text-blue-400 text-3xl my-8">Success</b>
                    <p>Yei...</p>
                    <p>You got {name}</p>
                    <div className="text-sm my-8">
                      <button
                        onClick={closeDialog}
                        className="rounded text-white px-4 py-1  mx-2 bg-red-600 hover:bg-red-400"
                      >
                        Close
                      </button>
                      <button className="rounded text-white px-4 py-1 mx-2 bg-blue-600 hover:bg-blue-400">
                        <Link to="/my-pokemon" onClick={closeDialog}>
                          Check My Pokemon
                        </Link>
                      </button>
                    </div>
                  </div>
                );
              case "failed":
                return (
                  <div className="text-center text-xl">
                    <b className="text-red-400 text-3xl my-8">Failed</b>
                    <p>Sorry...</p>
                    <div className="text-sm my-8">
                      <button
                        onClick={closeDialog}
                        className="rounded text-white px-4 py-1  mx-2 bg-red-600 hover:bg-red-400"
                      >
                        Close
                      </button>
                      <button
                        onClick={catching}
                        className="rounded text-white px-4 py-1 mx-2 bg-blue-600 hover:bg-blue-400"
                      >
                        Try again
                      </button>
                    </div>
                  </div>
                );
              default:
                return <img src={catchingSrc} alt="catching" />;
            }
          })()}
        </div>
      </Dialog>
    </>
  );
};

const mapStoreToProps = ({ myPokemon }) => ({
  myPokemon
});

const mapDispatchToProps = {
  addMyPokemon,
  removeMyPokemon
};

export default connect(
  mapStoreToProps,
  mapDispatchToProps
)(PokeDetail);
