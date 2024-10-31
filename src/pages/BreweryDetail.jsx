import React from "react";
import { useParams } from "react-router-dom";

import BreweryDetail from "../components/BreweryDetail";

const BreweryDetailPage = (props) => {
  let params = useParams();

  return (
    <div>
      <BreweryDetail id={params.id} />
    </div>
  );
};

export default BreweryDetailPage;
