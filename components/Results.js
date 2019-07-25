import React, { useState, useEffect } from 'react';
import { CenteredRow } from '../styles';
import { BarChart } from 'react-d3-components';
import _ from 'lodash';

const WIDTH_RATIO = 0.7;
const HEIGHT_RATIO = 0.4;

export const Results = ({ answers, showResults }) => {
  const defaultWidth = (window && window.innerWidth * WIDTH_RATIO) || 400;
  const defaultHeight = (window && window.innerHeight * HEIGHT_RATIO) || 300;

  const [width, setWidth] = useState(defaultWidth);
  const [height, setHeight] = useState(defaultHeight);

  const updateChartDimensions = () => {
    setWidth(window.innerWidth * WIDTH_RATIO);
    setHeight(window.innerHeight * HEIGHT_RATIO);
  };

  useEffect(() => {
    updateChartDimensions();

    window.addEventListener('resize', updateChartDimensions);

    return () => window.removeEventListener('resize', updateChartDimensions);
  });

  const values = _.sortBy(
    Object.entries(_.countBy(Object.values(answers))).map(([x, y]) => ({
      x,
      y
    })),
    'x'
  );

  const numTicks = _.max(_.map(values, 'y'));

  return (
    showResults &&
    values.length > 0 && (
      <CenteredRow>
        <BarChart
          data={{ values }}
          width={width}
          height={height}
          margin={{ top: 50, bottom: 50, left: 100, right: 100 }}
          yAxis={{ tickArguments: [numTicks] }}
          sort={d3.ascending}
        />
        <style>
          {`g.x.axis text {
              font-size: 20px;
              transform-origin: 25px 50px;
              transform: rotate(-25deg);
            }`}
        </style>
      </CenteredRow>
    )
  );
};
