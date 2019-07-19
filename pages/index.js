import React, { Component, createRef } from 'react';
import Router from 'next/router';
import client from '../utils/feathers';

const poll = client.service('poll');

export default class extends Component {
  state = { error: null };

  pinRef = createRef();

  componentDidMount() {
    this.pinRef.current.focus();
  }

  createRoom = async () => {
    const { id } = await poll.create({});
    Router.push(`/${id}`);
  };

  handleJoin = async event => {
    event.preventDefault();

    const id = this.pinRef.current.value;
    try {
      await poll.get(id);
      Router.push(`/${id}`);
    } catch (err) {
      if (err.type === 'FeathersError') {
        this.setState({ error: err.message });
        return;
      }
      console.error(err);
    }
  };

  render() {
    return (
      <div>
        <button onClick={this.createRoom}>Create Poll</button>
        <br />
        <form onSubmit={this.handleJoin}>
          pin <input type="text" ref={this.pinRef} />
          <button>Join Poll</button>
          <br />
          {this.state.error}
        </form>
      </div>
    );
  }
}
