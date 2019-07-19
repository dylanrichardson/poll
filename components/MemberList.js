import React from 'react';

export const MemberList = ({ leader, members }) => {
  return (
    <ul>
      {members.map(member => (
        <li key={member}>{member === leader ? <b>{member}</b> : member}</li>
      ))}
    </ul>
  );
};
