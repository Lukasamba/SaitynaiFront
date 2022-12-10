import React, { useEffect, useState } from 'react';
import { StyledMoviesPage } from './Movies.style';
import { Api } from '../../../api';
import { MoviesListResponse } from '../../../api/types/movies';
import { Spinner } from '../../../components/Spinner';
import { Button, Table as ReactstrapTable } from 'reactstrap';
import { MovieCreateModal } from './MovieCreateModal';
import { ConfirmModal } from '../../../components/Modal/ConfirmModal';
import { MovieEditModal } from './MovieEditModal';
import useRoles, { Roles } from '../../../helpers/helpers';
import { MovieReserveModal } from './MovieReserveModal';

const Movies: React.FC = () => {
  const [render, setRender] = useState<number>(0);
  const toggleRender = () => setRender((prevState) => prevState + 1);

  const remoteRoles = useRoles();
  const isAdmin = () => {
    return remoteRoles.hasAny(Roles.Admin);
  };
  const isManager = () => {
    return remoteRoles.hasAny(Roles.Manager);
  };
  const isUser = () => {
    return remoteRoles.hasAny(Roles.User);
  };

  const [isLoading, setLoading] = useState<boolean>(false);

  const [data, setData] = useState<MoviesListResponse>([]);
  const [currentMovieId, setCurrentMovieId] = useState<number>();

  const [isCreateModalOpen, setCreateModalOpen] = useState<boolean>(false);
  const [isEditModalOpen, setEditModalOpen] = useState<boolean>(false);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState<boolean>(false);
  const [isReserveModalOpen, setReserveModalOpen] = useState<boolean>(false);

  const toggleCreateModal = () => setCreateModalOpen(!isCreateModalOpen);
  const toggleEditModal = () => setEditModalOpen(!isEditModalOpen);
  const toggleDeleteModal = () => setDeleteModalOpen(!isDeleteModalOpen);
  const toggleReserveModal = () => setReserveModalOpen(!isReserveModalOpen);

  useEffect(() => {
    setLoading(true);
    (async () => {
      try {
        const response = await Api.movies.getList();
        setData(response);
        setLoading(false);
      } catch (e: any) {
        toggleRender();
        console.error('movies fetch failed');
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [render]);

  const names = isUser()
    ? ['ID', 'Name', 'Genre', 'Length', 'Image URL', 'Actions']
    : ['ID', 'Name', 'Genre', 'Length', 'Image URL'];
  const renderTableHeader = () => {
    return names.map((value, index) => <th key={index}>{value}</th>);
  };

  const renderButtons = (id: number) => {
    return (
      <>
        {isUser() && (
          <Button
            onClick={() => {
              setCurrentMovieId(id);
              toggleReserveModal();
            }}
            disabled={!isUser()}
          >
            Reserve
          </Button>
        )}

        {isManager() && (
          <Button
            color={'primary'}
            onClick={() => {
              setCurrentMovieId(id);
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
              setCurrentMovieId(id);
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

  return (
    <StyledMoviesPage>
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

      <MovieCreateModal
        isOpen={isCreateModalOpen}
        setOpen={setCreateModalOpen}
        toggle={toggleCreateModal}
        render={toggleRender}
      />

      {currentMovieId && (
        <MovieEditModal
          currentItemId={currentMovieId}
          isOpen={isEditModalOpen}
          setOpen={setEditModalOpen}
          toggle={toggleEditModal}
          render={toggleRender}
        />
      )}

      {currentMovieId && (
        <ConfirmModal
          item={'movie'}
          currentItemId={currentMovieId}
          toggle={toggleDeleteModal}
          isOpen={isDeleteModalOpen}
          render={toggleRender}
        />
      )}

      {currentMovieId && (
        <MovieReserveModal
          currentMovieId={currentMovieId}
          isOpen={isReserveModalOpen}
          setOpen={setReserveModalOpen}
          toggle={toggleReserveModal}
        />
      )}
    </StyledMoviesPage>
  );
};

export default Movies;
