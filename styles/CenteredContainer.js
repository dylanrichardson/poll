import styled from 'styled-components';
import { Container } from 'react-bootstrap';

export const CenteredContainer = styled(Container)`
  height: ${({ height }) => height || '100%'};
  align-items: center;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  ${({ verticalPadding }) =>
    verticalPadding && `padding: ${verticalPadding} 0%;`}
`;
