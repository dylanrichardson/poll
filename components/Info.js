import React from 'react';
import { Col, Card, Row } from 'react-bootstrap';
import { Pin, Members } from './';
import { CenteredRow } from '../styles';

export const Info = ({ isMobile, members, leader, name, pin }) => {
  return isMobile ? (
    <Row style={{ marginTop: '-5vh', paddingTop: '10px', width: '100%' }}>
      <Col xs={6} style={{ paddingLeft: '10px' }}>
        <Pin pin={pin} isMobile={isMobile} />
      </Col>
      <Col xs={6} style={{ paddingRight: '10px' }}>
        <Card style={{ minWidth: '140px' }}>
          <Card.Header style={{ textAlign: 'center' }}>
            <span style={{ verticalAlign: 'text-top' }}>
              {members.length} Active
            </span>
          </Card.Header>
        </Card>
      </Col>
    </Row>
  ) : (
    <Col xs={3} xl={2} style={{ zIndex: 1 }}>
      <CenteredRow>
        <Pin pin={pin} />
      </CenteredRow>
      <Members members={members} leader={leader} name={name} />
    </Col>
  );
};
