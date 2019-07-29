import React from 'react';
import Router from 'next/router';
import { Col, Row, Button } from 'react-bootstrap';
import { Pin, MembersSidebar, MembersModal } from './';
import { CenteredRow } from '../styles';
import client from '../utils/feathers';

const span6 = 374;
const span5 = 466;
const span4 = 622;

const poll = client.service('poll');

const createPoll = async () => {
  const { id } = await poll.create({});
  Router.push(`/${id}`);
};

const NewPoll = ({ style = { width: '100%', height: '100%' } }) => {
  return (
    <Button style={style} variant="outline-primary" onClick={createPoll}>
      New Poll
    </Button>
  );
};

export const Info = ({ isMobile, width, members, leader, name, pin }) => {
  const xs = width < span6 ? 6 : width < span5 ? 5 : width < span4 ? 4 : 3;

  const marginLeft = `${xs === 3 ? 100 / 8 : 0}%`;

  return isMobile ? (
    xs < 5 ? (
      <Row style={{ marginTop: '-5vh', paddingTop: '10px', width: '100%' }}>
        <Col xs={xs} style={{ paddingLeft: '10px' }}>
          <Pin pin={pin} isMobile={isMobile} />
        </Col>
        <Col xs={xs} style={{ marginLeft }}>
          <NewPoll />
        </Col>
        <Col xs={xs} style={{ paddingRight: '10px', marginLeft }}>
          <MembersModal members={members} leader={leader} name={name} />
        </Col>
      </Row>
    ) : (
      <>
        <Row style={{ marginTop: '-5vh', paddingTop: '10px', width: '100%' }}>
          <Col xs={12}>
            <NewPoll />
          </Col>
        </Row>
        <Row style={{ paddingTop: '10px', width: '100%' }}>
          <Col xs={xs} style={{ paddingLeft: '10px' }}>
            <Pin pin={pin} />
          </Col>
          <Col
            xs={{ span: xs, offset: 2 * (6 - xs) }}
            style={{ paddingRight: '10px' }}
          >
            <MembersModal members={members} leader={leader} name={name} />
          </Col>
        </Row>
      </>
    )
  ) : (
    <Col xs={3} xl={2} style={{ zIndex: 1 }}>
      <CenteredRow style={{ marginBottom: '30px' }}>
        <NewPoll style={{ minWidth: '140px' }} />
      </CenteredRow>
      <CenteredRow style={{ marginBottom: '30px' }}>
        <Pin pin={pin} style={{ minWidth: '140px' }} />
      </CenteredRow>
      <CenteredRow>
        <MembersSidebar
          members={members}
          leader={leader}
          name={name}
          style={{ minWidth: '140px' }}
        />
      </CenteredRow>
    </Col>
  );
};
