import React, { Component } from 'react';
import Router from 'next/router';
import client from '../utils/feathers';
import { NameInput, Poll } from '../components';

const poll = client.service('poll');

const validatePin = async pin => {
  try {
    await poll.get(pin);
  } catch (err) {
    Router.push('/');
  }
};

export default class extends Component {
  constructor(props) {
    super(props);

    this.state = {
      pin: props.pin,
      name: null,
      leader: null,
      members: [],
      question: null,
      answers: {},
      showResults: false
    };
  }

  static async getInitialProps({ req, query: { pin } }) {
    if (!req) {
      await validatePin(pin);
    }

    return { pin };
  }

  async componentDidMount() {
    await validatePin(this.state.pin);

    poll.on('patched', this.setState.bind(this));
  }

  handleJoin = ({ name, leader }) => {
    this.setState({ name, leader });
  };

  render() {
    const { name, pin } = this.state;

    return (
      <>
        {name ? (
          <Poll {...this.state} />
        ) : (
          <NameInput onJoin={this.handleJoin} pin={pin} />
        )}
      </>
    );
  }
}
