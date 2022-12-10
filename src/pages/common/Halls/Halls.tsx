import React, { useEffect, useState } from 'react';
import { StyledHallsPage } from './Halls.style';
import { Api } from '../../../api';
import { HallsListResponse } from '../../../api/types/halls';
import { Spinner } from '../../../components/Spinner';
import { Button, Table as ReactstrapTable } from 'reactstrap';
import { HallCreateModal } from './HallCreateModal';
import { ConfirmModal } from '../../../components/Modal/ConfirmModal';
import { HallEditModal } from './HallEditModal';
import useRoles, { Roles } from '../../../helpers/helpers';

const Halls: React.FC = () => {
  const [render, setRender] = useState<number>(0);
  const toggleRender = () => setRender((prevState) => prevState + 1);

  const remoteRoles = useRoles();
  const isAdmin = () => {
    return remoteRoles.hasAny(Roles.Admin);
  };
  const isManager = () => {
    return remoteRoles.hasAny(Roles.Manager);
  };

  const [isLoading, setLoading] = useState<boolean>(false);

  const [data, setData] = useState<HallsListResponse>([]);
  const [currentHallId, setCurrentHallId] = useState<number>();

  const [isCreateModalOpen, setCreateModalOpen] = useState<boolean>(false);
  const [isEditModalOpen, setEditModalOpen] = useState<boolean>(false);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState<boolean>(false);

  const toggleCreateModal = () => setCreateModalOpen(!isCreateModalOpen);
  const toggleEditModal = () => setEditModalOpen(!isEditModalOpen);
  const toggleDeleteModal = () => setDeleteModalOpen(!isDeleteModalOpen);

  const names = ['ID', 'Division Address', 'Name', 'Seats Count', 'Actions'];
  const renderTableHeader = () => {
    return names.map((value, index) => <th key={index}>{value}</th>);
  };

  const renderButtons = (id: number) => {
    return (
      <>
        {isManager() && (
          <Button
            color={'primary'}
            onClick={() => {
              setCurrentHallId(id);
              toggleEditModal();
            }}
            disabled={!isManager()}
          >
            Edit
          </Button>
        )}

        {isAdmin() && (
          <Button
            color={'danger'}
            onClick={() => {
              setCurrentHallId(id);
              toggleDeleteModal();
            }}
            disabled={!isAdmin()}
          >
            Delete
          </Button>
        )}
      </>
    );
  };

  const renderTableContent = () => {
    return data.map((value, index) => (
      <tr key={index}>
        {Object.values(value).map((v, i) => i != 0 && <td key={i}>{v}</td>)}
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
        toggleRender();
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
          {isManager() && (
            <Button onClick={toggleCreateModal} disabled={!isManager()}>
              Add
            </Button>
          )}

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

      {currentHallId && (
        <HallEditModal
          currentItemId={currentHallId}
          isOpen={isEditModalOpen}
          setOpen={setEditModalOpen}
          toggle={toggleEditModal}
          render={toggleRender}
        />
      )}

      {currentHallId && (
        <ConfirmModal
          item={'hall'}
          currentItemId={currentHallId}
          toggle={toggleDeleteModal}
          isOpen={isDeleteModalOpen}
          render={toggleRender}
        />
      )}
    </StyledHallsPage>
  );
};

export default Halls;
