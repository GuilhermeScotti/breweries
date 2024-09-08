import React from "react";

const Brewery = ({ brewery }) => {
  return (
    <tr key={brewery.id}>
      <td>{brewery.name}</td>
      <td>{brewery.state}</td>
      <td>{brewery.city}</td>
      <td>
        <a href={brewery.website_url} target="_blank" rel="noopener noreferrer">
          {brewery.website_url}
        </a>
      </td>
    </tr>
  );
};

export default Brewery;
