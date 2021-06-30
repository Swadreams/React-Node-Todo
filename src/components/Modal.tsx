import React from 'react';
import { Button } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';

interface IProps {
  heading?: string;
  show: boolean;
  handleClose: (update?: boolean) => void;
  children?: any;
}

const RModal = (props: IProps) => {
  const show = props.show;
  const handleClose = props.handleClose;

  return (
    <>
      <Modal show={show} onHide={handleClose} animation={false}>
        {props.heading && (
          <Modal.Header closeButton>
            <Modal.Title>{props.heading}</Modal.Title>
          </Modal.Header>
        )}
        <Modal.Body>{props.children}</Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={() => handleClose()}>
            Close
          </Button>
          <Button variant='primary' onClick={() => handleClose(true)}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default RModal;
