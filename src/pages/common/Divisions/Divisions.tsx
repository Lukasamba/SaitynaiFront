import React, { useEffect, useState } from 'react';
import { StyledDivisionsPage } from './Divisions.style';
import { Api } from '../../../api';
import { DivisionsListResponse } from '../../../api/types/divisions';
import { Spinner } from '../../../components/Spinner';
import { Button, Table as ReactstrapTable } from 'reactstrap';
import { ConfirmModal } from '../../../components/Modal/ConfirmModal';
import { DivisionCreateModal } from './DivisionCreateModal';
import { DivisionEditModal } from './DivisionEditModal';
import useRoles, { Roles } from '../../../helpers/helpers';

const Divisions: React.FC = () => {
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

  const [data, setData] = useState<DivisionsListResponse>([]);
  const [currentDivisionId, setCurrentDivisionId] = useState<number>();

  const [isCreateModalOpen, setCreateModalOpen] = useState<boolean>(false);
  const [isEditModalOpen, setEditModalOpen] = useState<boolean>(false);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState<boolean>(false);

  const toggleCreateModal = () => setCreateModalOpen(!isCreateModalOpen);
  const toggleEditModal = () => setEditModalOpen(!isEditModalOpen);
  const toggleDeleteModal = () => setDeleteModalOpen(!isDeleteModalOpen);

  const names = ['ID', 'Address', 'Halls Count', 'Actions'];
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
              setCurrentDivisionId(id);
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
              setCurrentDivisionId(id);
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
        const response = await Api.divisions.getList();
        setData(response);
        setLoading(false);
      } catch (e: any) {
        console.error('error divisions list');
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [render]);
  return (
    <StyledDivisionsPage>
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

      <DivisionCreateModal
        isOpen={isCreateModalOpen}
        setOpen={setCreateModalOpen}
        toggle={toggleCreateModal}
        render={toggleRender}
      />

      {currentDivisionId && (
        <DivisionEditModal
          currentItemId={currentDivisionId}
          isOpen={isEditModalOpen}
          setOpen={setEditModalOpen}
          toggle={toggleEditModal}
          render={toggleRender}
        />
      )}

      {currentDivisionId && (
        <ConfirmModal
          item={'division'}
          currentItemId={currentDivisionId}
          toggle={toggleDeleteModal}
          isOpen={isDeleteModalOpen}
          render={toggleRender}
        />
      )}
    </StyledDivisionsPage>
  );
};

export default Divisions;
