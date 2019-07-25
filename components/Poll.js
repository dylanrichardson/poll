import React, { useState, useEffect } from 'react';
import { Col } from 'react-bootstrap';
import styled from 'styled-components';
import { Ask, ToggleResults, Answer, Question, Results, Info } from './';
import { PageContainer, CenteredContainer, CenteredRow } from '../styles';

const MEDIUM = 768;
const EXTRA_LARGE = 1200;

const CenteredCol = styled(Col)`
  height: 100%;

  @media (min-width: ${MEDIUM}px) {
    margin-left: -25vw;
  }

  @media (min-width: ${EXTRA_LARGE}px) {
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
  const defaultWidth = (window && window.innerWidth) || 700;
  const defaultHeight = (window && window.innerHeight) || 1000;

  const [width, setWidth] = useState(defaultWidth);
  const [height, setHeight] = useState(defaultHeight);

  const updateWindowDimensions = () => {
    setWidth(window.innerWidth);
    setHeight(window.innerHeight);
  };

  useEffect(() => {
    updateWindowDimensions();

    window.addEventListener('resize', updateWindowDimensions);

    return () => window.removeEventListener('resize', updateWindowDimensions);
  });

  const isLeader = leader === name;
  const ownAnswer = answers[name];

  members.sort();

  return (
    <PageContainer verticalPadding="5vh">
      <CenteredRow className="align-items-center" style={{ height: '100%' }}>
        <Info
          isMobile={width < MEDIUM}
          members={members}
          leader={leader}
          name={name}
          pin={pin}
        />
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
            <Results
              answers={answers}
              showResults={showResults}
              width={width}
              height={height}
            />
          </CenteredContainer>
        </CenteredCol>
      </CenteredRow>
    </PageContainer>
  );
};
