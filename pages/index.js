import React, { Component } from 'react';
import Router from 'next/router';
import { Button } from 'react-bootstrap';
import client from '../utils/feathers';
import { CenteredRow, PageContainer } from '../styles';
import { JoinPoll } from '../components';

const poll = client.service('poll');

export default class extends Component {
  createPoll = async () => {
    const { id } = await poll.create({});
    Router.push(`/${id}`);
  };

  render() {
    return (
      <PageContainer>
        <CenteredRow>
          <Button
            style={{ width: '35%', minWidth: '100px', maxWidth: '188px' }}
            onClick={this.createPoll}
          >
            Create Poll
          </Button>
        </CenteredRow>
        <CenteredRow>
          <JoinPoll />
        </CenteredRow>
      </PageContainer>
    );
  }
}
