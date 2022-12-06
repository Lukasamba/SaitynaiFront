import React, { useEffect, useState } from 'react';
import { StyledHallsPage } from './Halls.style';
import { Api } from '../../../api';
import { HallsListResponse } from '../../../api/types/halls';
import { Spinner } from '../../../components/Spinner';
import { Button, Table as ReactstrapTable } from 'reactstrap';
import { HallCreateModal } from './HallCreateModal';
import { ConfirmModal } from '../../../components/Modal/ConfirmModal';
import { HallEditModal } from './HallEditModal';

const Halls: React.FC = () => {
  const [render, setRender] = useState<number>(0);
  const toggleRender = () => setRender((prevState) => prevState + 1);

  const [isLoading, setLoading] = useState<boolean>(false);

  const [data, setData] = useState<HallsListResponse>([]);
  const [currentHallId, setCurrentHallId] = useState<number>(0);

  const [isCreateModalOpen, setCreateModalOpen] = useState<boolean>(false);
  const [isEditModalOpen, setEditModalOpen] = useState<boolean>(false);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState<boolean>(false);

  const toggleCreateModal = () => setCreateModalOpen(!isCreateModalOpen);
  const toggleEditModal = () => setEditModalOpen(!isEditModalOpen);
  const toggleDeleteModal = () => setDeleteModalOpen(!isDeleteModalOpen);

  const names = ['ID', 'Division ID', 'Name', 'Seats Count', 'Actions'];
  const renderTableHeader = () => {
    return names.map((value, index) => <th key={index}>{value}</th>);
  };

  const renderButtons = (id: number) => {
    return (
      <>
        <Button
          color={'primary'}
          onClick={() => {
            setCurrentHallId(id);
            toggleEditModal();
          }}
        >
          Edit
        </Button>
        <Button
          color={'danger'}
          onClick={() => {
            setCurrentHallId(id);
            toggleDeleteModal();
          }}
        >
          Delete
        </Button>
      </>
    );
  };

  const renderTableContent = () => {
    return data.map((value, index) => (
      <tr key={index}>
        {Object.values(value).map((v, i) => (
          <td key={i}>{v}</td>
        ))}
        <td>{renderButtons(value.id)}</td>
      </tr>
    ));
  };

  useEffect(() => {
    setLoading(true);
    (async () => {
      try {
        const response = await Api.halls.getList();
        setData(response);
        setLoading(false);
      } catch (e: any) {
        console.error('error halls list');
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [render]);
  return (
    <StyledHallsPage>
      {isLoading ? (
        <Spinner />
      ) : (
        <>
          <Button onClick={toggleCreateModal}>Add</Button>

          <ReactstrapTable hover>
            <thead>
              <tr>{renderTableHeader()}</tr>
            </thead>

            <tbody>{renderTableContent()}</tbody>
          </ReactstrapTable>
        </>
      )}

      <HallCreateModal
        isOpen={isCreateModalOpen}
        setOpen={setCreateModalOpen}
        toggle={toggleCreateModal}
        render={toggleRender}
      />

      <HallEditModal
        currentItemId={currentHallId}
        isOpen={isEditModalOpen}
        setOpen={setEditModalOpen}
        toggle={toggleEditModal}
        render={toggleRender}
      />

      <ConfirmModal
        item={'hall'}
        currentItemId={currentHallId}
        toggle={toggleDeleteModal}
        isOpen={isDeleteModalOpen}
        render={toggleRender}
      />
    </StyledHallsPage>
  );
};

export default Halls;
