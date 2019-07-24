import React, { Component, createRef } from 'react';
import Router from 'next/router';
import { Button, InputGroup, FormControl, Alert } from 'react-bootstrap';
import client from '../utils/feathers';
import { CenteredRow, PageContainer } from '../styles';

const poll = client.service('poll');

const nameRef = createRef();

export const NameInput = class extends Component {
  state = {
    error: null
  };

  componentDidMount() {
    nameRef.current.focus();

    poll.patch(this.props.pin, { operation: 'startJoin' });
  }

  handleJoin = async () => {
    const { pin, onJoin } = this.props;
    const name = nameRef.current.value;

    if (name !== '') {
      try {
        const { leader } = await poll.patch(pin, {
          operation: 'join',
          name
        });

        onJoin({ name, leader });
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

  handleName = event => {
    if (event.keyCode === 13) {
      return this.handleJoin();
    }
  };

  render() {
    const { error } = this.state;

    return (
      <PageContainer>
        <CenteredRow>
          <InputGroup style={{ width: '60%', maxWidth: '324px' }}>
            <FormControl
              placeholder="Your name"
              aria-label="Your Name"
              ref={nameRef}
              onKeyDown={this.handleName}
            />
            <InputGroup.Append>
              <Button variant="outline-primary" onClick={this.handleJoin}>
                Enter
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
      </PageContainer>
    );
  }
};
