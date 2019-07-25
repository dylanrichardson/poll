import React, { useEffect, createRef } from 'react';
import { Button, InputGroup, FormControl } from 'react-bootstrap';
import client from '../utils/feathers';
import { CenteredRow } from '../styles';

const poll = client.service('poll');

const questionRef = createRef();

export const Ask = ({ pin, isLeader }) => {
  useEffect(() => {
    if (isLeader) {
      questionRef.current.focus();
    }
  });

  const handleQuestion = async () => {
    const { value: question } = questionRef.current;

    if (question !== '') {
      await poll.patch(pin, { operation: 'ask', question });
    }
  };

  const handleKey = event => {
    if (event.keyCode === 13) {
      return handleQuestion();
    }
  };

  return (
    isLeader && (
      <CenteredRow>
        <InputGroup style={{ width: '50%', maxWidth: '480px' }}>
          <FormControl
            placeholder="Question"
            aria-label="Poll Question"
            ref={questionRef}
            onKeyDown={handleKey}
          />
          <InputGroup.Append>
            <Button variant="outline-primary" onClick={handleQuestion}>
              Ask
            </Button>
          </InputGroup.Append>
        </InputGroup>
      </CenteredRow>
    )
  );
};
