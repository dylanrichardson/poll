import React from 'react';
import { CenteredRow } from '../styles';
import { BarChart } from 'react-d3-components';
import _ from 'lodash';

export const Results = ({ answers, showResults }) => {
  const answerEntries = Object.entries(answers);

  console.log(_.countBy(Object.values(answers)));

  const data = {
    values: _.sortBy(
      Object.entries(_.countBy(Object.values(answers))).map(([x, y]) => ({
        x,
        y
      })),
      'x'
    )
  };

  var sort = d3.ascending;

  return (
    showResults &&
    answerEntries.length > 0 && (
      <CenteredRow>
        <div>
          <BarChart
            data={data}
            width={800}
            height={400}
            margin={{ top: 50, bottom: 50, left: 100, right: 100 }}
            sort={sort}
          />
          <style>{`
                g.x.axis text {
                    font-size: 20px;
                    transform-origin: 25px 50px;
                    transform: rotate(-25deg);
                }
                `}</style>
        </div>
      </CenteredRow>
    )
  );
};
