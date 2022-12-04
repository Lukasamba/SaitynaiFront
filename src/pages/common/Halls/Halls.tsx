import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { DataStorage } from '../../../services/dataStorage';
import { RouteList } from '../../../routeList';
import { StyledHallsPage } from './Halls.style';
import { Api } from '../../../api';
import { HallsListResponse } from '../../../api/types/halls';
import { Spinner } from '../../../components/Spinner';
import Table from '../../../components/Table/Table';

const Halls: React.FC = () => {
  const navigate = useNavigate();

  const authorize = () => {
    if (!DataStorage.get('jwt')) {
      navigate(RouteList.AUTH.LOGIN.path);
    }
  };

  const names = ['ID', 'Division ID', 'Name', 'Seats Count', 'Actions'];
  const [data, setData] = useState<HallsListResponse[]>([]);
  const [isLoading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    authorize();
    setLoading(true);
    (async () => {
      try {
        const response = await Api.halls.getList();
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
    <StyledHallsPage>
      {isLoading ? <Spinner /> : <Table names={names} data={data} type={'hall'} />}
    </StyledHallsPage>
  );
};

export default Halls;
