import React, { useEffect, useRef } from 'react';
import { Button, InputGroup, FormControl } from 'react-bootstrap';
import client from '../utils/feathers';
import { CenteredRow } from '../styles';

const poll = client.service('poll');

export const Ask = ({ pin, isLeader, isMobile }) => {
  const questionRef = useRef(null);

  useEffect(() => {
    if (isLeader && !isMobile) {
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

  const width = isMobile ? '80%' : '50%';

  return (
    isLeader && (
      <CenteredRow>
        <InputGroup style={{ width, maxWidth: '480px' }}>
          <FormControl
            placeholder="Question"
            aria-label="Poll Question"
            ref={questionRef}
            onKeyDown={handleKey}
          />
          <InputGroup.Append>
            <Button
              variant="outline-primary"
              onClick={handleQuestion}
              style={{ width: '80px' }}
            >
              Ask
            </Button>
          </InputGroup.Append>
        </InputGroup>
      </CenteredRow>
    )
  );
};
