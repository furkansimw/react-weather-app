import React from "react";

const CountriesItem = ({ data, onClick, active }) => {
  return (
    <div className={`item ${active ? "active" : ""}`} onClick={onClick}>
      <p>{data.name}</p>
    </div>
  );
};

export default CountriesItem;
  