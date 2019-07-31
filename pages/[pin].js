import React, { useState, useEffect } from 'react';
import Router from 'next/router';
import client from '../utils/feathers';
import { NameInput, Poll, LoadingPage } from '../components';

const poll = client.service('poll');

const PollPage = props => {
  const { pin } = props;

  const [state, setState] = useState({
    name: null,
    leader: null,
    members: [],
    question: null,
    answers: {},
    showResults: false
  });
  const [loading, setLoading] = useState(true);

  const mergeState = newState => {
    return setState(oldState => ({ ...oldState, ...newState }));
  };

  const validatePin = async () => {
    try {
      await poll.get(pin);
      setLoading(false);
    } catch (e) {
      Router.push('/');
    }
  };

  useEffect(() => {
    validatePin();

    poll.on('patched', mergeState);

    return () => poll.removeListener('patched');
  });

  const handleJoin = ({ name, leader }) => {
    mergeState({ name, leader });
  };

  return loading ? (
    <LoadingPage />
  ) : state.name ? (
    <Poll {...state} {...props} />
  ) : (
    <NameInput onJoin={handleJoin} {...props} />
  );
};

PollPage.getInitialProps = ({ query: { pin } }) => {
  return { pin };
};

export default PollPage;
