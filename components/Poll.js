import React from 'react';
import { Members, Leader, Answer, Question, Results } from './';
import { CenteredContainer, CenteredRow } from '../styles';

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
    <CenteredContainer>
      <CenteredRow>
        <Members members={members} leader={leader} name={name} />
      </CenteredRow>
      <CenteredRow>
        {leader === name && <Leader pin={pin} showResults={showResults} />}
      </CenteredRow>
      <CenteredRow>
        <Question question={question} />
      </CenteredRow>
      <CenteredRow>
        <Answer
          pin={pin}
          name={name}
          question={question}
          isLeader={leader === name}
        />
      </CenteredRow>
      <CenteredRow> {showResults && <Results answers={answers} />}</CenteredRow>
    </CenteredContainer>
  );
};
