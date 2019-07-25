import React, { useState, useEffect, useRef } from 'react';
import { Card, Badge, Tooltip, Overlay } from 'react-bootstrap';
import Clipboard from 'clipboard';

export const Pin = ({ pin, isMobile = false }) => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const clipboard = new Clipboard('#pin');

    clipboard.on('success', () => {
      setShow(true);
      setTimeout(() => setShow(false), 2000);
    });
  });

  const pinRef = useRef(null);

  const nonMobileStyles = {};
  if (!isMobile) {
    nonMobileStyles.marginBottom = '30px';
  }

  return (
    <Card style={{ minWidth: '140px', ...nonMobileStyles }}>
      <Card.Header style={{ textAlign: 'center' }}>
        <span style={{ verticalAlign: 'text-top' }}>Pin </span>
        <Badge
          variant="primary"
          pill={true}
          style={{
            fontSize: '16px',
            verticalAlign: 'text-top',
            cursor: 'pointer'
          }}
          id="pin"
          data-clipboard-text={pin}
          ref={pinRef}
        >
          <span>{pin}</span>
        </Badge>
        <Overlay target={pinRef.current} show={show} placement="right">
          {props => (
            <Tooltip id="tooltip-right" {...props} show={props.show.toString()}>
              Copied!
            </Tooltip>
          )}
        </Overlay>
      </Card.Header>
    </Card>
  );
};
