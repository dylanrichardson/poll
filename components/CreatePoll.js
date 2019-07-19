import React, { Component, createRef } from 'react';
import client from '../utils/feathers';

const poll = client.service('poll');

export const CreatePoll = class extends Component {
  nameRef = createRef();

  render() {
    return <div>create question here</div>;
  }
};
