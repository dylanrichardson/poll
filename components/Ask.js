import React, { Component, createRef } from 'react';
import { Button, InputGroup, FormControl } from 'react-bootstrap';
import client from '../utils/feathers';
import { CenteredRow } from '../styles';

const poll = client.service('poll');

const questionRef = createRef();

export const Ask = class extends Component {
  componentDidMount() {
    if (this.props.isLeader) {
      questionRef.current.focus();
    }
  }

  handleQuestion = async () => {
    const { pin } = this.props;
    const { value: question } = questionRef.current;

    if (question !== '') {
      await poll.patch(pin, { operation: 'ask', question });
    }
  };

  handleKey = event => {
    if (event.keyCode === 13) {
      return this.handleQuestion();
    }
  };

  render() {
    return (
      this.props.isLeader && (
        <CenteredRow>
          <InputGroup style={{ width: '50%', maxWidth: '480px' }}>
            <FormControl
              placeholder="Question"
              aria-label="Poll Question"
              ref={questionRef}
              onKeyDown={this.handleKey}
            />
            <InputGroup.Append>
              <Button variant="outline-primary" onClick={this.handleQuestion}>
                Ask
              </Button>
            </InputGroup.Append>
          </InputGroup>
        </CenteredRow>
      )
    );
  }
};
