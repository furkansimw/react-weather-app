import axios from "axios";
import React, { useEffect, useState } from "react";
import CountriesItem from "./components/CountriesItem";

const App = () => {
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [country, setCounty] = useState(null);
  const [state, setState] = useState(null);
  const [city, setCity] = useState(null);
  const [data, setData] = useState(null);
  useEffect(() => {
    fetch("countries.json")
      .then((res) => res.json())
      .then((res) => setCountries(res));
  }, []);
  const get = (data) => {
    console.log(data);
    const key = "028e5a7aa60025be76785baaa3d08ee0";
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${data.latitude}&lon=${data.longitude}&appid=${key}`;
    console.log(url);
    axios.get(url).then((res) => {
      setData(res.data);
    });
  };
  return (
    <div
      className="App"
      style={{
        backgroundColor: data && "#000000",
        color: data && "#fff",
      }}
    >
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
      <div
        style={{
          display: data ? "block" : "none",
        }}
        className="Preview"
      >
   
          <img
            src="close.svg"
            alt="close"
            style={{
              width: "36px",
              cursor: "pointer",
              height: "36px",
            }}
            onClick={() => {
              setData(null);
              setCity(null);
            }}
          />
          <div className="data">
            <h1>{data?.name}</h1>
            <h2>{(data?.main?.temp - 273.15).toFixed(2)} °</h2>
          </div>
        
      </div>
      <div className="Content">
        <div className="Countries">
          {countries.map((data) => (
            <CountriesItem
              data={data}
              key={data.id}
              onClick={() => {
                setCities([]);
                setCity(null);
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
                setCity(null);
                fetch("cities.json")
                  .then((res) => res.json())
                  .then((res) => {
                    setCities(
                      res.filter((_value) => _value.state_name === data.name)
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
                setCity(data);
                get(data);
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
//(valNum-32) / 1.8
