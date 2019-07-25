import React from 'react';
import { Col, Card, Row } from 'react-bootstrap';
import { Pin, Members } from './';
import { CenteredRow } from '../styles';

const span6 = 374;
const span5 = 466;
const span4 = 622;

export const Info = ({ isMobile, width, members, leader, name, pin }) => {
  const xs = width < span6 ? 6 : width < span5 ? 5 : width < span4 ? 4 : 3;

  return isMobile ? (
    <Row style={{ marginTop: '-5vh', paddingTop: '10px', width: '100%' }}>
      <Col xs={xs} style={{ paddingLeft: '10px' }}>
        <Pin pin={pin} isMobile={isMobile} />
      </Col>
      <Col
        xs={{ span: xs, offset: 2 * (6 - xs) }}
        style={{ paddingRight: '10px' }}
      >
        <Card>
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
