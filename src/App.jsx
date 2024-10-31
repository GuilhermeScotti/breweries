import { useState, useEffect } from "react";
import "./App.css";
import Breweries from "./components/Breweries";
import Stats from "./components/Stats";

const PER_PAGE = 10;
const GET_URL = `https://api.openbrewerydb.org/v1/breweries?by_country=united_states&per_page=${PER_PAGE}`;
const METADATA_URL =
  "https://api.openbrewerydb.org/v1/breweries/meta?by_country=united_states";

const App = () => {
  const [breweries, setBreweries] = useState([]);
  const [metadata, setMetadata] = useState({});
  const [page, setPage] = useState(1);
  const [maxPages, setMaxPage] = useState(0);
  const [queryParams, setQueryParams] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      var data = await fetch(`${METADATA_URL}${queryParams}`);
      var dataJson = await data.json();
      setMetadata(dataJson);
      setMaxPage(Math.ceil(dataJson.total / PER_PAGE));

      var data = await fetch(`${GET_URL}${queryParams}&page=${page}`);
      var dataJson = await data.json();
      setBreweries(dataJson);
    };

    fetchData();
  }, [page, queryParams]);

  const goToPage = (searchValue) => {
    if (searchValue > maxPages) {
      alert("Page number is too high");
      return;
    }

    if (searchValue === "") {
      setPage(1);
    } else {
      setPage(Number(searchValue));
    }
  };

  const setStateFilter = (searchValue) => {
    let params = new URLSearchParams(queryParams);

    params.delete("by_state");

    if (searchValue) {
      params.append("by_state", searchValue);
    }

    setQueryParams(`&${params.toString()}`);
    setPage(1);
  };

  return (
    <>
      <h2>USA Breweries</h2>

      <Stats metadata={metadata} max_pages={maxPages} params={queryParams} />
      <br />

      <div className="container column">
        <Breweries breweries={breweries} />

        <div className="card">
          <div>
            <button onClick={() => setPage(page - 1)} disabled={page <= 1}>
              Prev. Page
            </button>
            <button
              onClick={() => setPage(page + 1)}
              disabled={page >= Math.ceil(metadata.total / PER_PAGE)}
            >
              Next Page
            </button>
            <input
              type="number"
              placeholder="Go to page..."
              onChange={(inputString) => goToPage(inputString.target.value)}
            />
            <div>
              Page: {page} of {maxPages}
            </div>
            <select onChange={(e) => setStateFilter(e.target.value)}>
              <option value="">Select a state...</option>
              {states.map((state) => (
                <option key={state} value={state}>
                  {state}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </>
  );
};

const states = [
  "Alabama",
  "Alaska",
  "Arizona",
  "Arkansas",
  "California",
  "Colorado",
  "Connecticut",
  "Delaware",
  "Florida",
  "Georgia",
  "Hawaii",
  "Idaho",
  "Illinois",
  "Indiana",
  "Iowa",
  "Kansas",
  "Kentucky",
  "Louisiana",
  "Maine",
  "Maryland",
  "Massachusetts",
  "Michigan",
  "Minnesota",
  "Mississippi",
  "Missouri",
  "Montana",
  "Nebraska",
  "Nevada",
  "New Hampshire",
  "New Jersey",
  "New Mexico",
  "New York",
  "North Carolina",
  "North Dakota",
  "Ohio",
  "Oklahoma",
  "Oregon",
  "Pennsylvania",
  "Rhode Island",
  "South Carolina",
  "South Dakota",
  "Tennessee",
  "Texas",
  "Utah",
  "Vermont",
  "Virginia",
  "Washington",
  "West Virginia",
  "Wisconsin",
  "Wyoming",
];

export default App;
