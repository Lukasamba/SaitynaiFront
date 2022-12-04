import React from 'react';
import { Button, Modal, ModalBody, ModalFooter, ModalHeader, ModalProps } from 'reactstrap';

interface Props extends ModalProps {
  item: string;
  onSubmit: () => void;
  toggle: () => void;
  isOpen: boolean;
}

const ConfirmModal: React.FC<Props> = ({ item, onSubmit, toggle, isOpen }) => {
  return (
    <Modal isOpen={isOpen} toggle={toggle}>
      <ModalHeader>Confirmation</ModalHeader>

      <ModalBody>Are you want to delete this {item}?</ModalBody>

      <ModalFooter>
        <Button color={'primary'} onClick={onSubmit}>
          Confirm
        </Button>

        <Button type={'button'} color={'danger'} onClick={toggle}>
          Cancel
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default ConfirmModal;
