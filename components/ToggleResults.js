import React from 'react';
import client from '../utils/feathers';
import { CenteredRow } from '../styles';

const poll = client.service('poll');

const toggleResults = async (pin, showResults) => {
  await poll.patch(pin, { operation: 'toggleResults', showResults });
};

export const ToggleResults = ({ pin, showResults, isLeader, question }) => {
  return (
    isLeader &&
    question && (
      <CenteredRow>
        <div className="custom-control custom-switch">
          <input
            type="checkbox"
            className="custom-control-input"
            id="show-results"
            checked={showResults}
            onChange={() => toggleResults(pin, !showResults)}
          />
          <label className="custom-control-label" htmlFor="show-results">
            Show results
          </label>
        </div>
      </CenteredRow>
    )
  );
};
