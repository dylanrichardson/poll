import React from 'react';
import { Members, Ask, Answer, Question, Results } from './';

export const Poll = ({ pin, members, leader, name, answers, question }) => {
  return (
    <>
      <Members members={members} leader={leader} />
      {leader === name && <Ask pin={pin} />}
      <Question question={question} />
      <Answer pin={pin} name={name} />
      <Results answers={answers} />
    </>
  );
};
