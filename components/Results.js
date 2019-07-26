import React, { useEffect } from 'react';
import { CenteredRow } from '../styles';
import { BarChart } from 'react-d3-components';
import _ from 'lodash';
import { TextBox } from 'd3plus-text';

const WIDTH_RATIO = 0.6;
const HEIGHT_RATIO = 0.3;

export const Results = ({ answers, showResults, width, height }) => {
  const values = _.sortBy(
    Object.entries(_.countBy(Object.values(answers))).map(([x, y]) => ({
      x,
      y
    })),
    'x'
  );

  const showChart = showResults && values.length > 0;

  const numTicks = _.max(_.map(values, 'y'));

  const chartWidth = width < 768 ? width * 0.8 : width * WIDTH_RATIO;
  const chartHeight = height * HEIGHT_RATIO;

  const horizontalMargin = chartWidth * 0.1;
  const verticalMargin = chartHeight * 0.05;

  useEffect(() => {
    if (showChart) {
      console.log(document.querySelector('g.x.axis > g > text'));
    }
  });

  // char : size
  // 30 : 5
  // 20 : 10
  // 10 : 20
  const labelSize = 20;

  return (
    showChart && (
      <CenteredRow>
        <BarChart
          data={{ values }}
          width={chartWidth}
          height={chartHeight}
          margin={{
            top: verticalMargin,
            bottom: verticalMargin * 5,
            left: horizontalMargin,
            right: horizontalMargin
          }}
          yAxis={{ tickArguments: [numTicks] }}
          sort={d3.ascending}
        />
        <style>
          {`g.x.axis text {
              font-size: ${labelSize}px;
          
            }`}

          {/* transform-origin: 25px 50px;
              transform: rotate(-25deg); */}
        </style>
      </CenteredRow>
    )
  );
};
