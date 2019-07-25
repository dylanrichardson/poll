import React from 'react';
import { Col } from 'react-bootstrap';
import styled from 'styled-components';
import {
  Members,
  Ask,
  ToggleResults,
  Answer,
  Question,
  Results,
  Pin
} from './';
import { PageContainer, CenteredContainer, CenteredRow } from '../styles';

const CenteredCol = styled(Col)`
  height: 100%;
  margin-left: -25vw;

  @media (min-width: 1200px) {
    margin-left: ${-100 / 6}vw;
  }
`;

export const Poll = ({
  pin,
  members,
  leader,
  name,
  answers,
  question,
  showResults
}) => {
  const isLeader = leader === name;
  const ownAnswer = answers[name];

  members.sort();

  return (
    <PageContainer verticalPadding="5vh">
      <CenteredRow className="align-items-center" style={{ height: '100%' }}>
        <Col xs={3} xl={2} style={{ zIndex: 1 }}>
          <Pin pin={pin} />
          <Members members={members} leader={leader} name={name} />
        </Col>
        <CenteredCol>
          <CenteredContainer>
            <Question question={question} />
            <Ask pin={pin} isLeader={isLeader} />
            <Answer
              pin={pin}
              name={name}
              question={question}
              isLeader={isLeader}
              ownAnswer={ownAnswer}
            />
            <ToggleResults
              pin={pin}
              isLeader={isLeader}
              showResults={showResults}
              question={question}
            />
            <Results answers={answers} showResults={showResults} />
          </CenteredContainer>
        </CenteredCol>
      </CenteredRow>
    </PageContainer>
  );
};
