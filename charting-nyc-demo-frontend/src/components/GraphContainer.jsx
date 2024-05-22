import React, { useState, useEffect } from "react";
import styled from "styled-components";

const LayoutWrapper = styled.div``;
const SelectionContainer = styled.div``;

const GraphContainer = (props) => {
  const { data } = props;
  const chartOptions = ["Area Chart", "Bar Chart"];
  const [chartStyle, setChartStyle] = useState("Area Chart");
  const handleChange = (event) =>
    event &&
    event.target &&
    event.target.value &&
    setChartStyle(event.target.value);
  const renderOptions = () => {
    return chartOptions.map((label, index) => {
      return (
        <option key={`${index}chartOption`} value={label}>
          {label}
        </option>
      );
    });
  };

  return (
    <LayoutWrapper>
      <SelectionContainer>
        <label htmlFor="chart style selection">Select A Chart Style:</label>
        <select
          id="chart style selection"
          value={chartStyle}
          onChange={handleChange}
        >
          {chartOptions && renderOptions()}
        </select>
      </SelectionContainer>
    </LayoutWrapper>
  );
};

export default GraphContainer;
