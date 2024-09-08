import Brewery from "./Brewery";

const Breweries = ({ breweries }) => {
  return (
    <>
      <table className="blur-background">
        <thead>
          <tr>
            <th>Name</th>
            <th>State</th>
            <th>City</th>
            <th>Website</th>
          </tr>
        </thead>
        <tbody>
          {breweries.map((brewery) => (
            <Brewery key={brewery.id} brewery={brewery} />
          ))}
        </tbody>
      </table>
    </>
  );
};

export default Breweries;
