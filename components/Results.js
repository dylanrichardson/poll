import React, { useEffect } from 'react';
import { BarChart } from 'react-d3-components';
import _ from 'lodash';
import { CenteredRow } from '../styles';
import { Voters } from './';

const WIDTH_RATIO = 0.6;
const HEIGHT_RATIO = 0.3;

const svgDefs = `
  <defs>
    <pattern
      id="pattern-stripe"
      width="14"
      height="1"
      patternUnits="userSpaceOnUse"
      patternTransform="rotate(45)"
    >
      <rect width="8" height="1" transform="translate(0,0)" fill="white"></rect>
    </pattern>
    <mask id="mask-stripe">
      <rect
        x="0"
        y="0"
        width="100%"
        height="100%"
        fill="url(#pattern-stripe)"
      />
    </mask>
  </defs>
`;

export const Results = ({ answers, showResults, width, height }) => {
  const values = _.sortBy(
    Object.entries(_.countBy(Object.values(answers))).map(([x, y]) => ({
      x,
      y
    })),
    'x'
  );

  const showChart = showResults && values.length > 0;

  useEffect(() => {
    if (showChart) {
      document
        .querySelector('#results svg')
        .insertAdjacentHTML('afterbegin', svgDefs);
    }
  });

  const numTicks = _.max(_.map(values, 'y'));

  const chartWidth = width < 768 ? width * 0.8 : width * WIDTH_RATIO;
  const chartHeight = height * HEIGHT_RATIO;

  const horizontalMargin = chartWidth * 0.1;
  const verticalMargin = chartHeight * 0.05;

  const labelSizes = _.map(values, ({ x }) => Math.min(200 / x.length, 50));

  const labelSizesCSS = labelSizes
    .map(
      (size, n) => `g.x.axis g:nth-of-type(${n + 1}) text {
      font-size: ${size}px;
    }`
    )
    .join(' ');

  const textFill = window.getComputedStyle(
    document.getElementsByTagName('body')[0]
  ).color;

  return (
    showChart && (
      <CenteredRow id="results">
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
          {labelSizesCSS}
          {`
          .bar {
            fill: var(--primary);
            mask: url(#mask-stripe);
          }

          text {
            fill: ${textFill};
          }

          g.x.axis text {
            font-family: "Cabin Sketch", cursive;
            font-weight: 300;
          }
          `}
        </style>
      </CenteredRow>
    )
  );
};
