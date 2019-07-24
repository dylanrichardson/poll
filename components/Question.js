import React from 'react';
import { CenteredRow } from '../styles';

export const Question = ({ question }) => {
  return (
    question && (
      <CenteredRow>
        <h1 className="display-4" style={{ textAlign: 'center' }}>
          {question}
        </h1>
      </CenteredRow>
    )
  );
};
