import React from 'react';

export const Results = ({ answers }) => {
  return (
    <ul>
      {Object.entries(answers).map(([name, answer]) => (
        <li key={name}>
          {name}: {answer}
        </li>
      ))}
    </ul>
  );
};
