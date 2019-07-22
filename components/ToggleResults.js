import React, { Component } from 'react';
import client from '../utils/feathers';

const poll = client.service('poll');

const toggleResults = async (pin, showResults) => {
  await poll.patch(pin, { operation: 'toggleResults', showResults });
};

export const ToggleResults = ({ pin, showResults }) => {
  return (
    <div>
      Show results
      <input
        type="checkbox"
        checked={showResults}
        onChange={() => toggleResults(pin, !showResults)}
      />
    </div>
  );
};
