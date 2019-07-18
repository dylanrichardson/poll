import React, { Component, createRef } from 'react';
import client from '../utils/feathers';

const user = client.service('user');

export const CreateUser = class extends Component {
  nameRef = createRef();

  createUser = () => {
    user.create({ name: this.nameRef.current.value });
  };

  render() {
    return (
      <div>
        voting app
        <br />
        name: <input type="text" ref={this.nameRef} />
        <button onClick={this.createUser}>create user</button>
      </div>
    );
  }
};
