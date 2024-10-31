import React, { useState, useEffect } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  LabelList,
} from "recharts";

const Stats = ({ metadata, params }) => {
  const [stateStats, setStateStats] = useState({});
  const [cityStats, setCityStats] = useState({});
  const [top10states, setTop10states] = useState([]);

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

      const sortedStates = Object.entries(stateCounts)
        .map(([state, count]) => ({ state, count }))
        .sort((a, b) => b.count - a.count)
        .slice(0, 10); // Step 3: Select the top 10

      setTop10states(sortedStates);

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
    <div>
      <div className="container">
        <div className="card">Total Breweries: {metadata.total}</div>
        <div className="card">
          Highest State Count: {stateStats.mostCommon} - {stateStats.count}
        </div>
        <div className="card">
          Highest City Count: {cityStats.mostCommon} - {cityStats.count}
        </div>
      </div>

      <div>Top 10 States</div>

      <div className="container">
        <BarChart
          width={600}
          height={400}
          data={top10states}
          layout="vertical"
          margin={{ top: 20, right: 30, left: 50, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            type="number"
            label={{
              value: "Number of Breweries",
              position: "insideBottom",
              offset: -5,
            }}
          />
          <YAxis
            type="category"
            dataKey="state"
            label={{ angle: -90, position: "insideLeft" }}
            offset={-10}
          />
          <Tooltip fill="#fff" />
          <Bar dataKey="count" fill="#8884d8">
            <LabelList dataKey="count" position="insideRight" fill="#fff" />
          </Bar>
        </BarChart>
      </div>
    </div>
  );
};

export default Stats;
