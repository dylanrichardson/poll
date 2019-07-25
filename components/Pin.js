import React, { useState, useEffect, useRef } from 'react';
import { Card, Badge, Tooltip, Overlay } from 'react-bootstrap';
import Clipboard from 'clipboard';
import { CenteredRow } from '../styles';

export const Pin = ({ pin }) => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const clipboard = new Clipboard('#pin');

    clipboard.on('success', () => {
      setShow(true);
      setTimeout(() => setShow(false), 2000);
    });
  });

  const pinRef = useRef(null);

  return (
    <CenteredRow>
      <Card style={{ minWidth: '140px', marginBottom: '30px' }}>
        <Card.Header style={{ textAlign: 'center' }}>
          Pin{' '}
          <Badge
            variant="primary"
            pill={true}
            style={{
              fontSize: '16px',
              verticalAlign: 'bottom',
              cursor: 'pointer'
            }}
            id="pin"
            data-clipboard-text={pin}
            ref={pinRef}
          >
            <span style={{ verticalAlign: 'middle' }}>{pin}</span>
          </Badge>
          <Overlay target={pinRef.current} show={show} placement="right">
            {props => (
              <Tooltip
                id="tooltip-right"
                {...props}
                show={props.show.toString()}
              >
                Copied!
              </Tooltip>
            )}
          </Overlay>
        </Card.Header>
      </Card>
    </CenteredRow>
  );
};
