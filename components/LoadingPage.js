import React from 'react';
import { Spinner } from 'react-bootstrap';
import { CenteredContainer, CenteredRow } from '../styles';

export const LoadingPage = () => (
  <CenteredContainer>
    <CenteredRow>
      <Spinner animation="border" variant="primary" />
    </CenteredRow>
  </CenteredContainer>
);
