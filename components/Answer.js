import React, { useEffect, createRef } from 'react';
import { Button, InputGroup, FormControl, Spinner } from 'react-bootstrap';
import client from '../utils/feathers';
import { CenteredRow } from '../styles';

const poll = client.service('poll');

const answerRef = createRef();

export const Answer = ({
  question,
  isLeader,
  ownAnswer,
  pin,
  name,
  isMobile
}) => {
  useEffect(() => {
    if (question) {
      answerRef.current.focus();
    }
  });

  const handleAnswer = async () => {
    const { value: answer } = answerRef.current;

    if (answer !== '') {
      await poll.patch(pin, { operation: 'answer', name, answer });
    }
  };

  const handleKey = event => {
    if (event.keyCode === 13) {
      return handleAnswer();
    }
  };

  const width = isMobile ? '80%' : '50%';

  return question ? (
    <>
      <CenteredRow>
        <InputGroup style={{ width, maxWidth: '480px' }}>
          <FormControl
            placeholder="Your answer"
            aria-label="Your Answer"
            ref={answerRef}
            onKeyDown={handleKey}
          />
          <InputGroup.Append>
            <Button
              variant="outline-primary"
              onClick={handleAnswer}
              style={{ width: '80px' }}
            >
              Answer
            </Button>
          </InputGroup.Append>
        </InputGroup>
      </CenteredRow>
      {ownAnswer && <CenteredRow>Your answer: {ownAnswer}</CenteredRow>}
    </>
  ) : (
    !isLeader && (
      <CenteredRow>
        <span
          style={{
            marginTop: 'auto',
            marginBottom: 'auto',
            textAlgin: 'center'
          }}
        >
          Waiting for question
        </span>
        <Spinner animation="grow" variant="primary" />
      </CenteredRow>
    )
  );
};
