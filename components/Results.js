import React, { useState, useEffect } from 'react';
import { Overlay, Tooltip } from 'react-bootstrap';
import { BarChart } from 'react-d3-components';
import _ from 'lodash';
import { CenteredRow } from '../styles';

const WIDTH_RATIO = 0.6;
const HEIGHT_RATIO = 0.3;

export const Results = ({ answers, showResults, width, height }) => {
  const [show, setShow] = useState(false);
  const [target, setTarget] = useState(null);
  const [voters, setVoters] = useState([]);

  const values = _.sortBy(
    Object.entries(_.countBy(Object.values(answers))).map(([x, y]) => ({
      x,
      y
    })),
    'x'
  );

  useEffect(() => {
    const bars = document.querySelectorAll('g g .bar');

    const enterListener = ({ target }) => {
      setShow(true);
      setTarget(target);

      const index = Array.from(target.parentNode.children).indexOf(target);
      const selectedVoters = _.keys(
        _.pickBy(answers, answer => answer === values[index].x)
      );
      setVoters(selectedVoters);
    };
    const leaveListener = () => {
      setShow(false);
    };

    bars.forEach(bar => {
      bar.addEventListener('mouseenter', enterListener);
      bar.addEventListener('mouseout', leaveListener);
    });

    return () => {
      bars.forEach(bar => {
        bar.removeEventListener('mouseenter', enterListener);
        bar.removeEventListener('mouseout', leaveListener);
      });
    };
  });

  const showChart = showResults && values.length > 0;

  const numTicks = _.max(_.map(values, 'y'));

  const chartWidth = width < 768 ? width * 0.8 : width * WIDTH_RATIO;
  const chartHeight = height * HEIGHT_RATIO;

  const horizontalMargin = chartWidth * 0.1;
  const verticalMargin = chartHeight * 0.05;

  const labelSizes = _.map(values, ({ x }) => Math.min(200 / x.length, 50));

  return (
    showChart && (
      <CenteredRow>
        <Overlay target={target} show={show} placement="right">
          {props => (
            <Tooltip
              {...props}
              show={props.show.toString()}
              style={{ ...props.style, maxWidth: '160px' }}
            >
              {voters.join(', ')}
            </Tooltip>
          )}
        </Overlay>
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
          {labelSizes.map(
            (size, n) => `g.x.axis g:nth-of-type(${n + 1}) text {
              font-size: ${size}px;
            }`
          )}
        </style>
      </CenteredRow>
    )
  );
};
