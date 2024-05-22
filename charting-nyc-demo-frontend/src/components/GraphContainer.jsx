import React, { useState, useEffect } from "react";
import AreaChartView from "./AreaChartView";
import BarChartView from "./BarChartView";
import styled from "styled-components";

const LayoutWrapper = styled.div``;
const SelectionContainer = styled.div``;
const ChartContainer = styled.div`
  background-color: lightgray;
`;

const GraphContainer = (props) => {
  const { surveyData } = props.data;
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
        <label htmlFor="chart style selection">Select A Chart Style: </label>
        <select
          id="chart style selection"
          value={chartStyle}
          onChange={handleChange}
        >
          {chartOptions && renderOptions()}
        </select>
      </SelectionContainer>
      <ChartContainer>
        {chartStyle === "Area Chart" ? (
          <AreaChartView data={surveyData} />
        ) : (
          <BarChartView data={surveyData} />
        )}
      </ChartContainer>
    </LayoutWrapper>
  );
};

export default GraphContainer;
