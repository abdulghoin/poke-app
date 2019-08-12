import React from "react";

import "./Loader.css";

export default ({ dataTestId }) => (
  <section data-testid={dataTestId} className="w-full text-center">
    <div className="lds-ellipsis">
      <div />
      <div />
      <div />
      <div />
    </div>
  </section>
);
