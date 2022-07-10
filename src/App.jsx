import React, { useEffect, useState } from "react";
import CountriesItem from "./components/CountriesItem";

const App = () => {
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [country, setCounty] = useState(null);
  const [state, setState] = useState(null);
  const [city, setCity] = useState(null);
  let _states = [];
  let _cities = [];
  useEffect(() => {
    fetch("countries.json")
      .then((res) => res.json())
      .then((res) => setCountries(res));
  }, []);
  return (
    <div className="App">
      <button
        onClick={() => {
          console.log({ _states });
        }}
        style={
          {
            position:'fixed',
            bottom:'10px',
            right: '10px',
          }
        }
      >
        Button
      </button>
      <div className="Header">
        <p>Weather App</p>
      </div>
      <div className="banner">
        <div className="banner-content">
          <div className="box">
            <p className="county">{country === null ? "" : country.name}</p>
          </div>
          <div className="box">
            <p className="county">{state === null ? "" : state.name}</p>
          </div>
          <div className="box">
            <p className="county">{city === null ? "" : city.name}</p>
          </div>
        </div>
      </div>
      <div className="Content">
        <div className="Countries">
          {countries.map((data) => (
            <CountriesItem
              data={data}
              key={data.id}
              onClick={() => {
                setCities([])
                setCity(null)
                setCounty(data);
                fetch("states.json")
                  .then((res) => res.json())
                  .then((res) => {
                    setStates(
                      res.filter((_value) => _value.country_name === data.name)
                    );
                  });
              }}
              active={data === country}
            />
          ))}
        </div>
        <div className="States">
          {states.map((data) => (
            <CountriesItem
              data={data}
              key={data.id}
              onClick={() => {
                console.log(data);
                setState(data);
                setCity(null)
                fetch("cities.json")
                  .then((res) => res.json())
                  .then((res) => {
                    setCities(
                      res.filter(
                        (_value) => _value.state_name === data.name
                      )
                    );
                  });
              }}
              active={data === state}
            />
          ))}
        </div>
        <div className="Cities">
          {cities.map((data) => (
            <CountriesItem
              data={data}
              key={data.id}
              onClick={() => {
                setCity(data)
              }}
              active={data === city}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default App;
