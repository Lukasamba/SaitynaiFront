import React, { useEffect, useState } from 'react';
import { StyledMoviesPage } from './Movies.style';
import { Api } from '../../../api';
import { MoviesListResponse } from '../../../api/types/movies';
import { Spinner } from '../../../components/Spinner';
import { Button, Table as ReactstrapTable } from 'reactstrap';
import { MovieCreateModal } from './MovieCreateModal';
import { ConfirmModal } from '../../../components/Modal/ConfirmModal';
import { MovieEditModal } from './MovieEditModal';

const Movies: React.FC = () => {
  const [render, setRender] = useState<number>(0);
  const toggleRender = () => setRender((prevState) => prevState + 1);

  const [isLoading, setLoading] = useState<boolean>(false);

  const [data, setData] = useState<MoviesListResponse>([]);
  const [currentMovieId, setCurrentMovieId] = useState<number>();

  const [isCreateModalOpen, setCreateModalOpen] = useState<boolean>(false);
  const [isEditModalOpen, setEditModalOpen] = useState<boolean>(false);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState<boolean>(false);

  const toggleCreateModal = () => setCreateModalOpen(!isCreateModalOpen);
  const toggleEditModal = () => setEditModalOpen(!isEditModalOpen);
  const toggleDeleteModal = () => setDeleteModalOpen(!isDeleteModalOpen);

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

  const names = ['ID', 'Name', 'Genre', 'Length', 'Image URL', 'Actions'];
  const renderTableHeader = () => {
    return names.map((value, index) => <th key={index}>{value}</th>);
  };

  const renderButtons = (id: number) => {
    return (
      <>
        <Button
          color={'primary'}
          onClick={() => {
            setCurrentMovieId(id);
            toggleEditModal();
          }}
        >
          Edit
        </Button>
        <Button
          color={'danger'}
          onClick={() => {
            setCurrentMovieId(id);
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

  return (
    <StyledMoviesPage>
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
    </StyledMoviesPage>
  );
};

export default Movies;
