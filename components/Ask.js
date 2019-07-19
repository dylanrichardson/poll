import React, { Component, createRef } from 'react';
import client from '../utils/feathers';

const poll = client.service('poll');

export const Ask = class extends Component {
  questionRef = createRef();

  componentDidMount() {
    this.questionRef.current.focus();
  }

  handleQuestion = async event => {
    event.preventDefault();

    const { pin } = this.props;
    const { value: question } = this.questionRef.current;

    if (question !== '') {
      await poll.patch(pin, { operation: 'ask', question });
    }
  };

  render() {
    return (
      <form onSubmit={this.handleQuestion}>
        question <input type="text" ref={this.questionRef} />
        <button>ask</button>
      </form>
    );
  }
};
