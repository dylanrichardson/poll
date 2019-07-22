import React from 'react';
import { Members, Leader, Answer, Question, Results } from './';

export const Poll = ({
  pin,
  members,
  leader,
  name,
  answers,
  question,
  showResults
}) => {
  return (
    <>
      <Members members={members} leader={leader} />
      {leader === name && <Leader pin={pin} showResults={showResults} />}
      <Question question={question} />
      <Answer pin={pin} name={name} />
      {showResults && <Results answers={answers} />}
    </>
  );
};
