import React from 'react';
import { Spinner } from 'react-bootstrap';
import { CenteredContainer, CenteredRow } from '../styles';

export const LoadingApp = () => (
  <CenteredContainer>
    <CenteredRow>
      <Spinner animation="border" variant="primary" />
    </CenteredRow>
  </CenteredContainer>
);
