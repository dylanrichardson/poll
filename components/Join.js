import React, { Component, createRef } from 'react';
import client from '../utils/feathers';
import Router from 'next/router';

const poll = client.service('poll');

export const Join = class extends Component {
  state = {
    error: null
  };

  nameRef = createRef();

  componentDidMount() {
    this.nameRef.current.focus();
  }

  handleName = async event => {
    event.preventDefault();

    const name = this.nameRef.current.value;

    if (name !== '') {
      try {
        const { leader } = await poll.patch(this.props.pin, {
          operation: 'join',
          name
        });

        this.props.onJoin({ name, leader });
      } catch (err) {
        if (err.type === 'FeathersError') {
          if (err.code === 404) {
            return Router.push('/');
          }

          return this.setState({ error: err.message });
        }

        console.error(err);
      }
    }
  };

  render() {
    return (
      <form onSubmit={this.handleName}>
        name <input type="text" ref={this.nameRef} />
        <button>enter</button>
        <br />
        {this.state.error}
      </form>
    );
  }
};
