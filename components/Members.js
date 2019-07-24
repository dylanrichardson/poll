import React, { useState } from 'react';
import {
  ListGroup,
  Collapse,
  Card,
  Container,
  Row,
  Col,
  OverlayTrigger,
  Tooltip
} from 'react-bootstrap';
import { CenteredRow } from '../styles';

export const Members = ({ leader, members, name }) => {
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
              <Col style={{ padding: '0px' }}>Members</Col>
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
          <ListGroup variant="flush" id="members">
            {members.map(member => (
              <ListGroup.Item key={member} active={member === name}>
                <Container>
                  <Row>
                    <Col style={{ padding: '0px' }}>{member}</Col>
                    {member === leader && (
                      <Col xs={1}>
                        <OverlayTrigger
                          placement="right"
                          overlay={<Tooltip>Poll Leader</Tooltip>}
                        >
                          <i
                            className="fas fa-crown align-middle"
                            style={{ fontSize: '16px' }}
                          />
                        </OverlayTrigger>
                      </Col>
                    )}
                  </Row>
                </Container>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Collapse>
      </Card>
    </CenteredRow>
  );
};
