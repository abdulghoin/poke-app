import React, { Suspense, lazy } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  NavLink
} from "react-router-dom";

import Loader from "./components/Loader";

import "./App.css";

const List = lazy(() => import("./components/PokeList"));
const Detail = lazy(() => import("./components/PokeDetail"));

const App = () => {
  return (
    <Router>
      <header className="text-center p-2 fixed w-full bg-white z-10 top-0">
        <NavLink to="/" className="inline-block">
          <h1>Poke App</h1>
        </NavLink>
      </header>

      <main>
        <Suspense fallback={<Loader />}>
          <Switch>
            <Route path="/:name" component={Detail} />
            <Route path="/" component={List} />
          </Switch>
        </Suspense>
      </main>
    </Router>
  );
};

export default App;
