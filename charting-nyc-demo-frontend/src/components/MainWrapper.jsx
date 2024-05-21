import React, { useState, useEffect } from "react";
import styled from "styled-components";
import getAllData from "../utilities/getAllData";

const ComponentContainer = styled.div``;

const getZips = (array, neighborhood) => {
  return array.find((item) => item.name && item.name === neighborhood);
};

const MainWrapper = (props) => {
  const [allData, setAllData] = useState(getAllData());
  const [selectedOption, setSelectedOption] = useState("");
  const [selectedZips, setSelectedZips] = useState([]);
  const [selectedData, setSelectedData] = useState([]);

  useEffect(() => {
    if (!selectedOption) return;

    const neighborData = getZips(allData.neighborhoods, selectedOption);
    console.log("neighborData: ", neighborData);
    neighborData &&
      neighborData.zipcode &&
      setSelectedZips(neighborData.zipcode);
  }, [selectedOption]);

  const handleChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const renderOptions = () => {
    return allData.neighborhoods.map((nHood, index) => {
      const newKey = nHood.name && nHood.name.replace(/\s+/g, "");
      return (
        <option key={`${index}${newKey}`} value={`${nHood.name}`}>
          {nHood.name}
        </option>
      );
    });
  };

  return (
    <ComponentContainer>
      <h3>Neighborhood: {`${selectedOption}`}</h3>
      <label htmlFor="dropdown">Choose an option:</label>
      <select id="dropdown" value={selectedOption} onChange={handleChange}>
        <option value="" disabled>
          Select an option
        </option>
        {allData && allData.neighborhoods && renderOptions()}
      </select>
    </ComponentContainer>
  );
};

export default MainWrapper;
