import React from "react";
import styled from "styled-components";
import "./App.css";
import MainWrapper from "./components/MainWrapper";

const LayoutWrapper = styled.div``;
const StyledH1 = styled.h1`
  padding: 0 2em;
`;

function App() {
  return (
    <LayoutWrapper>
      <StyledH1>NYC Demographic Survey Data</StyledH1>
      <MainWrapper />
    </LayoutWrapper>
  );
}
export default App;
