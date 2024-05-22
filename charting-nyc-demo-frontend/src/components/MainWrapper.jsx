import React, { useState, useEffect } from "react";
import styled from "styled-components";
import GraphContainer from "./GraphContainer";
import getAllData from "../utilities/getAllData";

const ComponentContainer = styled.div``;
const SelectorContainer = styled.div``;

const defaultData = {
  name: "",
  zipcodes: [],
  surveyData: [],
};

const getZips = (array, neighborhood) => {
  return array.find((item) => item.name && item.name === neighborhood);
};

const getDataByZip = (zipcodes, allData) => {
  const stringZips = zipcodes.map((item) => item.toString());
  const zipSet = new Set(stringZips);

  const matchingObjects = allData.filter((data) =>
    zipSet.has(data["jurisdiction_name"])
  );

  return matchingObjects;
};

const MainWrapper = (props) => {
  const [allData, setAllData] = useState(getAllData());
  const [selectedOption, setSelectedOption] = useState("");
  const [selectedData, setSelectedData] = useState(defaultData);

  useEffect(() => {
    if (!selectedOption) return;
    // should reformat surveyData with just {name, male, female} for rechart
    let newSelectedData = {
      name: "",
      zipcodes: [],
      surveyData: [],
    };
    const neighborData = getZips(allData.neighborhoods, selectedOption);
    const filteredData = getDataByZip(neighborData.zipcode, allData.responses);

    newSelectedData.name = selectedOption;
    newSelectedData.zipcodes = neighborData.zipcode;
    newSelectedData.surveyData = filteredData;
    setSelectedData(newSelectedData);
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
      <SelectorContainer>
        <label htmlFor="neighborhood selection">Select A Neighborhood: </label>
        <select
          id="neighborhood selection"
          value={selectedOption}
          onChange={handleChange}
        >
          <option value="" disabled>
            Select an option
          </option>
          {allData && allData.neighborhoods && renderOptions()}
        </select>
      </SelectorContainer>
      {selectedData && <GraphContainer data={selectedData} />}
    </ComponentContainer>
  );
};

export default MainWrapper;
