import React from 'react';
import { BarChart } from 'react-d3-components';
import _ from 'lodash';
import { CenteredRow } from '../styles';
import { Voters } from './';

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

  const labelSizes = _.map(values, ({ x }) => Math.min(200 / x.length, 50));

  const textFill = window.getComputedStyle(
    document.getElementsByTagName('body')[0]
  ).color;

  return (
    showChart && (
      <CenteredRow>
        <Voters answers={answers} values={_.map(values, 'x')} />
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
          {`${labelSizes.map(
            (size, n) => `g.x.axis g:nth-of-type(${n + 1}) text {
              font-size: ${size}px;
            }`
          )}

          .bar {
            fill: var(--primary);
          }

          text {
            fill: ${textFill};
          }
          `}
        </style>
      </CenteredRow>
    )
  );
};
