import React, { useState, useEffect } from "react";
import {
  BarChart,
  Bar,
  Rectangle,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Label,
  Legend,
  ResponsiveContainer,
} from "recharts";
import styled from "styled-components";

const TestColorOne = styled.div`
  height: 30px;
  width: 100%;
  background-color: #82ca9d;
`;
const TestColorTwo = styled.div`
  height: 30px;
  width: 100%;
  background-color: #44318d;
`;

const BarChartView = (props) => {
  const { data } = props;
  return (
    <div>
      <BarChart
        width={1080}
        height={720}
        data={data}
        margin={{
          top: 10,
          right: 10,
          left: 10,
          bottom: 25,
        }}
      >
        <defs>
          <linearGradient id="colorParticipants" x1="0" y1="0" x2="0" y2="1">
            <stop offset="8%" stopColor="#8884d8" stopOpacity={0.9} />
            <stop offset="95%" stopColor="#A4B3B6" stopOpacity={0.1} />
          </linearGradient>
          <linearGradient id="colorFemale" x1="0" y1="0" x2="0" y2="1">
            <stop offset="8%" stopColor="#8d5fe7" stopOpacity={0.9} />
            <stop offset="95%" stopColor="#44318D" stopOpacity={0.2} />
          </linearGradient>
          <linearGradient id="colorMale" x1="0" y1="0" x2="0" y2="1">
            <stop offset="8%" stopColor="#ef3a3a" stopOpacity={0.9} />
            <stop offset="95%" stopColor="#E98074" stopOpacity={0.2} />
          </linearGradient>
        </defs>

        <XAxis dataKey="zipcode">
          <Label value="Zipcode" offset={-15} position="insideBottom" />
        </XAxis>
        <YAxis>
          <Label
            value="# of Survey Responses"
            angle={-90}
            position="insideLeft"
          />
        </YAxis>
        <CartesianGrid strokeDasharray="3 3" fill="#1e1e1e" />
        <Tooltip />
        <Legend verticalAlign="top" height={36} />
        <Bar dataKey={"participants"} fill="url(#colorParticipants)" />
        <Bar dataKey={"female"} fill="url(#colorFemale)" />
        <Bar dataKey={"male"} fill="url(#colorMale)" />
      </BarChart>
    </div>
  );
};

export default BarChartView;
