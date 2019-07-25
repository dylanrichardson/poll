import React from 'react';
import { CenteredRow } from '../styles';
import { BarChart } from 'react-d3-components';
import _ from 'lodash';

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

  const numTicks = _.max(_.map(values, 'y'));

  const chartWidth =
    window.innerWidth < 768
      ? window.innerWidth * 0.8
      : window.innerWidth * WIDTH_RATIO;
  const chartHeight = window.innerHeight * HEIGHT_RATIO;

  const horizontalMargin = chartWidth * 0.1;
  const verticalMargin = chartHeight * 0.05;

  return (
    showResults &&
    values.length > 0 && (
      <CenteredRow>
        <BarChart
          data={{ values }}
          width={chartWidth}
          height={chartHeight}
          margin={{
            top: verticalMargin,
            bottom: verticalMargin,
            left: horizontalMargin,
            right: horizontalMargin
          }}
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
