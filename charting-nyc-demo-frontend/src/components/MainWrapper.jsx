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

const formatData = (dataArr) => {
  if (dataArr.length === 0) return [];
  return dataArr.map((dataObj) => {
    const { jurisdiction_name, count_participants, count_female, count_male } =
      dataObj;

    const newObj = {
      zipcode: parseInt(jurisdiction_name, 10),
      participants: parseInt(count_participants, 10),
      female: parseInt(count_female, 10),
      male: parseInt(count_male, 10),
    };
    return newObj;
  });
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

  return formatData(matchingObjects);
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
  }, [selectedOption, allData]);

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
