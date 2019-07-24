import React from 'react';
import { CenteredContainer } from './CenteredContainer';

export const PageContainer = ({ children }) => {
  return (
    <CenteredContainer fluid={true} height="100vh" verticalPadding="25vh">
      {children}
    </CenteredContainer>
  );
};
