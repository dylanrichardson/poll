import React, { Component, createRef } from 'react';
import client from '../utils/feathers';

const poll = client.service('poll');

export const Poll = class extends Component {
  nameRef = createRef();

  render() {
    return <div>vote here</div>;
  }
};
