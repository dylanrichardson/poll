import React from 'react';
import { Ask, ToggleResults } from './';

export const Leader = ({ pin, showResults }) => {
  return (
    <>
      <Ask pin={pin} />
      <ToggleResults pin={pin} showResults={showResults} />
    </>
  );
};
