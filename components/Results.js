import React from 'react';
import { CenteredRow } from '../styles';

export const Results = ({ answers, showResults }) => {
  const answerEntries = Object.entries(answers);

  return (
    showResults &&
    answerEntries.length > 0 && (
      <CenteredRow>
        <ul>
          {answerEntries.map(([name, answer]) => (
            <li key={name}>
              {name}: {answer}
            </li>
          ))}
        </ul>
      </CenteredRow>
    )
  );
};
