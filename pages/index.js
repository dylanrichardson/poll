import React, { Component, createRef } from 'react';
import Router from 'next/router';
import client from '../utils/feathers';

const room = client.service('room');

export default class extends Component {
  state = { error: null };

  joinRoomRef = createRef();

  createRoom = async () => {
    const { id } = await room.create({});
    Router.push(`/${id}`);
  };

  joinRoom = async () => {
    const id = this.joinRoomRef.current.value;
    try {
      await room.get(id);
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
        pin <input type="text" ref={this.joinRoomRef} />
        <button onClick={this.joinRoom}>Join Poll</button>
        <br />
        {this.state.error}
      </div>
    );
  }
}
