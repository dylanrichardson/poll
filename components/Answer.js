import React, { Component, createRef } from 'react';
import { Spinner } from 'react-bootstrap';
import client from '../utils/feathers';

const poll = client.service('poll');

export const Answer = class extends Component {
  answerRef = createRef();

  handleAnswer = async event => {
    event.preventDefault();

    const { pin, name } = this.props;
    const { value: answer } = this.answerRef.current;

    if (answer !== '') {
      await poll.patch(pin, { operation: 'answer', name, answer });
    }
  };

  render() {
    const { question, isLeader } = this.props;

    return question ? (
      <form onSubmit={this.handleAnswer}>
        answer <input type="text" ref={this.answerRef} />
        <button>enter</button>
      </form>
    ) : (
      !isLeader && (
        <>
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
        </>
      )
    );
  }
};
