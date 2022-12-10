import React from 'react';
import { Button, Modal, ModalBody, ModalFooter, ModalHeader, ModalProps } from 'reactstrap';
import { Api } from '../../../../api';

interface Props extends ModalProps {
  currentMovieId: number;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const MovieReserveModal: React.FC<Props> = ({ isOpen, toggle, currentMovieId, setOpen }) => {
  const handleReserve = () => {
    (async () => {
      await Api.movies.reserve(currentMovieId);
      setOpen(false);
    })();
  };

  return (
    <Modal isOpen={isOpen} toggle={toggle}>
      <ModalHeader>Confirmation</ModalHeader>

      <ModalBody>Are you want to reserve this movie?</ModalBody>

      <ModalFooter>
        <Button color={'primary'} onClick={handleReserve}>
          Confirm
        </Button>

        <Button type={'button'} color={'danger'} onClick={() => setOpen(false)}>
          Cancel
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default MovieReserveModal;
