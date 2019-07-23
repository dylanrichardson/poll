import React, { Component, createRef } from 'react';
import Router from 'next/router';
import { Button, InputGroup, FormControl, Alert } from 'react-bootstrap';
import client from '../utils/feathers';
import { CenteredRow } from '../styles';

const poll = client.service('poll');

export const JoinPoll = class extends Component {
  state = { error: null, showPinInput: false };

  pinRef = createRef();

  componentDidUpdate() {
    if (this.state.showPinInput) {
      this.pinRef.current.focus();
    }
  }

  joinPoll = () => {
    this.setState({ showPinInput: true });
  };

  handleJoin = async () => {
    const id = this.pinRef.current.value;

    if (id !== '') {
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
    }
  };

  handlePin = event => {
    if (event.keyCode === 13) {
      return this.handleJoin();
    }

    if (event.keyCode === 27) {
      return this.handleCancel();
    }
  };

  handleCancel = () => {
    this.setState({ showPinInput: false, error: null });
  };

  render() {
    const { error, showPinInput } = this.state;

    return showPinInput ? (
      <>
        <CenteredRow>
          <InputGroup style={{ width: '40%', maxWidth: '188px' }}>
            <FormControl
              placeholder="Pin"
              aria-label="Poll Pin"
              ref={this.pinRef}
              onKeyDown={this.handlePin}
            />
            <InputGroup.Append style={{ marginRight: '-5px' }}>
              <Button variant="outline-primary" onClick={this.handleJoin}>
                Join
              </Button>
              <Button
                onClick={this.handleCancel}
                variant="outline-primary"
                style={{ width: '50%', paddingLeft: '5px' }}
              >
                Cancel
              </Button>
            </InputGroup.Append>
          </InputGroup>
        </CenteredRow>
        {error && (
          <CenteredRow className="mt-3">
            <Alert
              variant="danger"
              onClose={() => this.setState({ error: null })}
              dismissible
            >
              {error}
            </Alert>
          </CenteredRow>
        )}
      </>
    ) : (
      <Button
        style={{ width: '35%', minWidth: '100px', maxWidth: '188px' }}
        onClick={this.joinPoll}
      >
        Join Poll
      </Button>
    );
  }
};
