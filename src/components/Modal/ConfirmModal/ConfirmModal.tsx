import React from 'react';
import { Button, Modal, ModalBody, ModalFooter, ModalHeader, ModalProps } from 'reactstrap';
import { Api } from '../../../api';

interface Props extends ModalProps {
  item: 'movie' | 'hall' | 'division';
  currentItemId: number;
  isOpen: boolean;
  toggle: () => void;
  render: () => void;
}

const ConfirmModal: React.FC<Props> = ({ item, currentItemId, isOpen, toggle, render }) => {
  const handleDelete = async (id: number) => {
    try {
      switch (item) {
        case 'movie': {
          await Api.movies.delete(id);
          break;
        }
        case 'hall': {
          await Api.halls.delete(id);
          break;
        }
        case 'division': {
          await Api.divisions.delete(id);
          break;
        }
      }
    } finally {
      toggle();
      render();
    }
  };
  return (
    <Modal isOpen={isOpen} toggle={toggle}>
      <ModalHeader>Confirmation</ModalHeader>

      <ModalBody>Are you want to delete this {item}?</ModalBody>

      <ModalFooter>
        <Button color={'primary'} onClick={() => handleDelete(currentItemId)}>
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
