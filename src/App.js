import React, { Suspense, lazy } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  NavLink
} from "react-router-dom";
import { Provider } from "react-redux";

import store from "./store";

import Loader from "./components/Loader";

import "./App.css";

const List = lazy(() => import("./components/PokeList"));
const Detail = lazy(() => import("./components/PokeDetail"));

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <header className="text-center p-2 fixed w-full bg-white z-10 top-0">
          <NavLink to="/" className="inline-block">
            <h1>Poke App</h1>
          </NavLink>
          <NavLink
            to="/my-pokemon"
            className="my-poke inline-block absolute rounded text-xs px-2 py-1 bg-blue-600 hover:bg-blue-400 text-white"
          >
            <h1>My Poke</h1>
          </NavLink>
        </header>

        <main>
          <Suspense fallback={<Loader />}>
            <Switch>
              <Route path="/my-pokemon" component={List} />
              <Route path="/:name" component={Detail} />
              <Route path="/" component={List} />
            </Switch>
          </Suspense>
        </main>
      </Router>
    </Provider>
  );
};

export default App;
