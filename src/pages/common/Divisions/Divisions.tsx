import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { DataStorage } from '../../../services/dataStorage';
import { RouteList } from '../../../routeList';
import { StyledDivisionsPage } from './Divisions.style';
import { Api } from '../../../api';
import { DivisionsListResponse } from '../../../api/types/divisions';
import { Spinner } from '../../../components/Spinner';
import Table from '../../../components/Table/Table';

const Divisions: React.FC = () => {
  const navigate = useNavigate();

  const authorize = () => {
    if (!DataStorage.get('jwt')) {
      navigate(RouteList.AUTH.LOGIN.path);
    }
  };

  const names = ['ID', 'Address', 'Halls Count', 'Actions'];
  const [data, setData] = useState<DivisionsListResponse[]>([]);
  const [isLoading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    authorize();
    setLoading(true);
    (async () => {
      try {
        const response = await Api.divisions.getList();
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
    <StyledDivisionsPage>
      {isLoading ? <Spinner /> : <Table names={names} data={data} type={'division'} />}
    </StyledDivisionsPage>
  );
};

export default Divisions;
