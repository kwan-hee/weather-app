import React from "react";
import { Button } from "react-bootstrap";
const WeatherButton = ({ cities, setCity }) => {
  console.log("cities?", cities);

  return (
    <div>
      {/* <Button variant="warning" onClick={()=>handleCityChange("current")}>Current Location</Button> */}
      {/* <Button variant="warning" onClick={() => setCity("current")}>
        Current Location
      </Button> */}
      {cities.map((item) => (
        <Button variant="danger" onClick={() => setCity(item)}>
          {item}
        </Button>
      ))}
    </div>
  );
};

export default WeatherButton;
