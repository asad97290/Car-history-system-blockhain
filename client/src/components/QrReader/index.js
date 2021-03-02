import React from "react";

import Data from "./Data";
import { Helmet } from "react-helmet";

function index() {
  return (
    <div>
      <Helmet>
        <title>Qr code Reader</title>
      </Helmet>
      <Data />
    </div>
  );
}

export default index;
