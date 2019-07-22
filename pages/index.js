import React, { Component, createRef } from 'react';
import Router from 'next/router';
import { Button } from 'react-bootstrap';
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
        <Button onClick={this.createRoom}>Create Poll</Button>
        <br />
        <form onSubmit={this.handleJoin}>
          pin <input type="text" ref={this.pinRef} />
          <Button>Join Poll</Button>
          <br />
          {this.state.error}
        </form>
      </div>
    );
  }
}
