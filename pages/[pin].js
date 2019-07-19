import React, { Component, createRef } from 'react';
import Router from 'next/router';
import client from '../utils/feathers';

const room = client.service('room');

const validatePin = async pin => {
  try {
    await room.get(pin);
    return {};
  } catch (err) {
    Router.push('/');
  }
};

export default class extends Component {
  state = {
    name: null
  };

  nameRef = createRef();

  static async getInitialProps({ req, query: { pin } }) {
    if (!req) {
      await validatePin(pin);
    }
    return { pin };
  }
  async componentDidMount() {
    await validatePin(this.props.pin);
  }

  handleName = () => {
    const name = this.nameRef.current.value;
    if (name) {
      this.setState({ name });

      room.patch(this.props.pin, { operation: 'join', name });
    }
  };

  render() {
    return this.state.name ? (
      <div>vote here</div>
    ) : (
      <div>
        name <input type="text" ref={this.nameRef} />
        <button onClick={this.handleName}>enter</button>
      </div>
    );
  }
}
