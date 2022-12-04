import React, { useEffect, useState } from 'react';
import { StyledMoviesPage } from './Movies.style';
import { useNavigate } from 'react-router-dom';
import { DataStorage } from '../../../services/dataStorage';
import { RouteList } from '../../../routeList';
import { Api } from '../../../api';
import Table from '../../../components/Table/Table';
import { MoviesListResponse } from '../../../api/types/movies';
import { Spinner } from '../../../components/Spinner';

const Movies: React.FC = () => {
  const navigate = useNavigate();

  const authorize = () => {
    if (!DataStorage.get('jwt')) {
      navigate(RouteList.AUTH.LOGIN.path);
    }
  };

  const names = ['ID', 'Name', 'Genre', 'Length', 'Image URL', 'Actions'];
  const [data, setData] = useState<MoviesListResponse[]>([]);
  const [isLoading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    authorize();
    setLoading(true);
    (async () => {
      try {
        const response = await Api.movies.getList();
        setData(response);
        setLoading(false);
      } catch (e: any) {
        e.response.status == 500 && navigate(RouteList.AUTH.LOGIN.path);
        // console.error('error movies list');
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <StyledMoviesPage>
      {isLoading ? <Spinner /> : <Table names={names} data={data} />}
    </StyledMoviesPage>
  );
};

export default Movies;
