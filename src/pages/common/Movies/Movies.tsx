import React, { useEffect, useState } from 'react';
import { StyledMoviesPage } from './Movies.style';
import { Api } from '../../../api';
import Table from '../../../components/Table/Table';
import { MoviesListResponse } from '../../../api/types/movies';
import { Spinner } from '../../../components/Spinner';
import { Button } from 'reactstrap';
import { MovieCreateModal } from './MovieCreateModal';

const Movies: React.FC = () => {
  const names = ['ID', 'Name', 'Genre', 'Length', 'Image URL', 'Actions'];

  const [data, setData] = useState<MoviesListResponse[]>([]);
  const [isLoading, setLoading] = useState<boolean>(false);

  const [isCreateModalOpen, setCreateModalOpen] = useState<boolean>(false);

  const toggleCreateModal = () => setCreateModalOpen(!isCreateModalOpen);

  useEffect(() => {
    setLoading(true);
    (async () => {
      try {
        const response = await Api.movies.getList();
        setData(response);
        setLoading(false);
      } catch (e: any) {
        console.error('movies fetch failed');
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <StyledMoviesPage>
      {isLoading ? (
        <Spinner />
      ) : (
        <>
          <Button onClick={toggleCreateModal}>Add</Button>
          <Table names={names} data={data} type={'movie'} />
        </>
      )}
      <MovieCreateModal
        isOpen={isCreateModalOpen}
        setOpen={setCreateModalOpen}
        toggle={toggleCreateModal}
      />
    </StyledMoviesPage>
  );
};

export default Movies;
