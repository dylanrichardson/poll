import React, { Component } from 'react';
import Router from 'next/router';
import client from '../utils/feathers';
import { JoinPoll, CreatePoll, Poll, MemberList } from '../components';

const poll = client.service('poll');

const validatePin = async pin => {
  try {
    await poll.get(pin);
    return {};
  } catch (err) {
    Router.push('/');
  }
};

export default class extends Component {
  state = {
    name: null,
    leader: null,
    isLeader: false,
    members: []
  };

  static async getInitialProps({ req, query: { pin } }) {
    if (!req) {
      await validatePin(pin);
    }
    return { pin };
  }

  async componentDidMount() {
    await validatePin(this.props.pin);

    poll.on('patched', ({ leader, members }) => {
      this.setState({ leader, members, isLeader: leader === this.state.name });
    });
  }

  handleJoin = ({ name, leader }) => {
    this.setState({ name, leader, isLeader: leader === this.state.name });
  };

  render() {
    const { name, isLeader, members, leader } = this.state;
    const { pin } = this.props;

    return (
      <>
        {name ? (
          <>
            <MemberList members={members} leader={leader} />
            {isLeader && <CreatePoll pin={pin} />}
            <Poll pin={pin} />
          </>
        ) : (
          <JoinPoll onJoin={this.handleJoin} pin={pin} />
        )}
      </>
    );
  }
}
