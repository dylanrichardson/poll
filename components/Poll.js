import React, { useState, useEffect } from 'react';
import { Col, Row } from 'react-bootstrap';
import styled from 'styled-components';
import { Ask, ToggleResults, Answer, Question, Results, Info } from './';
import { PageContainer, CenteredContainer, CenteredRow } from '../styles';

const SMALL = 466;
const MEDIUM = 768;
const EXTRA_LARGE = 1200;

const TITLE_MIN_HEIGHT = 440;
const TITLE_MIN_WIDTH = 830;

const CenteredCol = styled(Col)`
  height: 80%;

  @media (min-width: ${MEDIUM}px) {
    margin-left: -25vw;
  }

  @media (min-width: ${SMALL}px) {
    height: 100%;
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

  const ownAnswer = answers[name];
  const isLeader = leader === name;
  const isMobile = width < MEDIUM;

  const showTitle = width > TITLE_MIN_WIDTH && height > TITLE_MIN_HEIGHT;

  members.sort();

  return (
    <>
      {showTitle && (
        <Row style={{ position: 'absolute', top: '15px', left: '35px' }}>
          <Col>
            <h1 className="display-4">
              <span style={{ color: 'red' }}>Poll</span>
              <span style={{ fontWeight: 600 }}>job</span>
            </h1>
          </Col>
        </Row>
      )}
      <PageContainer verticalPadding="5vh">
        <CenteredRow className="align-items-center" style={{ height: '100%' }}>
          <Info
            isMobile={isMobile}
            width={width}
            members={members}
            leader={leader}
            name={name}
            pin={pin}
          />
          <CenteredCol>
            <CenteredContainer>
              <Question question={question} />
              <Ask pin={pin} isLeader={isLeader} isMobile={isMobile} />
              <Answer
                pin={pin}
                name={name}
                question={question}
                isLeader={isLeader}
                ownAnswer={ownAnswer}
                isMobile={isMobile}
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
    </>
  );
};
