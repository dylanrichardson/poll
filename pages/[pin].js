import React, { Component } from 'react';
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
  static async getInitialProps({ req, query: { pin } }) {
    if (!req) {
      await validatePin(pin);
    }
    return { pin };
  }
  async componentDidMount() {
    await validatePin(this.props.pin);
  }

  render() {
    return <div>vote here</div>;
  }
}
