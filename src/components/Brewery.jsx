import React from "react";
import { Link } from "react-router-dom";

const Brewery = ({ brewery }) => {
  return (
    <tr
      key={brewery.id}
      onClick={() => (window.location.href = `/brewery/${brewery.id}`)}
    >
      <td>{brewery.name}</td>
      <td>{brewery.state}</td>
      <td>{brewery.city}</td>
      <td>
        <a href={brewery.website_url} target="_blank" rel="noopener noreferrer">
          {brewery.website_url}
        </a>
      </td>
      <td>
        <Link to={`/brewery/${brewery.id}`}>see more...</Link>
      </td>
    </tr>
  );
};

export default Brewery;
