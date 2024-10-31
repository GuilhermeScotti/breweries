import { useState, useEffect } from "react";
import { useRoutes } from "react-router-dom";
import "./App.css";
import Breweries from "./components/Breweries";
import Stats from "./components/Stats";
import Home from "./pages/Home";
import BreweryDetailPage from "./pages/BreweryDetail";

const App = () => {
  let element = useRoutes([
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/brewery/:id",
      element: <BreweryDetailPage />,
    },
  ]);

  return <>{element}</>;
};
export default App;
