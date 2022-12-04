import React from 'react';
import { Button, Modal as ReactstrapModal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import { ReactFCWithChildren } from '../../react-app-env';

const Modal: ReactFCWithChildren = (props) => {
  return (
    <ReactstrapModal isOpen={props.isOpen} toggle={props.toggle}>
      <ModalHeader toggle={props.toggle}>{props.title}</ModalHeader>

      <ModalBody>{props.children}</ModalBody>

      <ModalFooter>
        <Button color={'primary'} onClick={props.onSubmit}>
          Confirm
        </Button>

        <Button type={'button'} color={'danger'} onClick={props.toggle}>
          Cancel
        </Button>
      </ModalFooter>
    </ReactstrapModal>
  );
};

export default Modal;
