import React, { useState } from 'react';
import {
  Collapse,
  Card,
  Container,
  Row,
  Col,
  ListGroup,
  OverlayTrigger,
  Tooltip
} from 'react-bootstrap';
import { MembersList } from './';
import { CenteredRow } from '../styles';

export const MembersSidebar = ({ leader, members, name }) => {
  const [open, setOpen] = useState(true);

  return (
    <CenteredRow>
      <Card style={{ minWidth: '140px' }}>
        <Card.Header
          onClick={() => setOpen(!open)}
          aria-controls="members"
          aria-expanded={open}
        >
          <Container>
            <Row>
              <Col style={{ padding: '0px' }}>Active</Col>
              <Col xs={1}>
                <i
                  className={`fas fa-chevron-circle-${
                    open ? 'up' : 'down'
                  } align-middle`}
                  style={{ fontSize: '20px' }}
                />
              </Col>
            </Row>
          </Container>
        </Card.Header>
        <Collapse in={open}>
          <MembersList members={members} leader={leader} name={name} />
        </Collapse>
      </Card>
    </CenteredRow>
  );
};
