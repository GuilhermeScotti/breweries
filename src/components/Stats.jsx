import React, { useState, useEffect } from "react";

const Stats = ({ metadata, params }) => {
  const [stateStats, setStateStats] = useState({});
  const [cityStats, setCityStats] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      var url = `https://api.openbrewerydb.org/v1/breweries?by_country=united_states&per_page=${metadata.per_page}`;

      if (params) {
        url = `${url}${params}`;
      }

      const breweries = [];

      const maxPages = Math.ceil(metadata.total / metadata.per_page);

      for (let i = 1; i <= maxPages; i++) {
        var data = await fetch(`${url}&page=${i}`);
        var dataJson = await data.json();
        breweries.push(...dataJson);
      }

      const states = breweries.map((brewery) => brewery.state);
      const cities = breweries.map((brewery) => brewery.city);

      function countOccurrences(arr) {
        return arr.reduce((acc, value) => {
          acc[value] = (acc[value] || 0) + 1;
          return acc;
        }, {});
      }

      const stateCounts = countOccurrences(states);
      const cityCounts = countOccurrences(cities);

      const mostCommonState = Object.entries(stateCounts).reduce((max, entry) =>
        entry[1] > max[1] ? entry : max
      );

      setStateStats({
        mostCommon: mostCommonState[0],
        count: mostCommonState[1],
      });

      const mostCommonCity = Object.entries(cityCounts).reduce((max, entry) =>
        entry[1] > max[1] ? entry : max
      );
      setCityStats({
        mostCommon: mostCommonCity[0],
        count: mostCommonCity[1],
      });
    };

    fetchData();
  }, [metadata, params]);

  return (
    <div className="container">
      <div className="card">Total Breweries: {metadata.total}</div>
      <div className="card">
        Highest State Count: {stateStats.mostCommon} - {stateStats.count}
      </div>
      <div className="card">
        Highest City Count: {cityStats.mostCommon} - {cityStats.count}
      </div>
    </div>
  );
};

export default Stats;
