import React, { Component, createRef } from 'react';
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
    return (
      <form onSubmit={this.handleAnswer}>
        answer <input type="text" ref={this.answerRef} />
        <button>enter</button>
      </form>
    );
  }
};
