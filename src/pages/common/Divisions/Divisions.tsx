import React, { useEffect, useState } from 'react';
import { StyledDivisionsPage } from './Divisions.style';
import { Api } from '../../../api';
import { DivisionsListResponse } from '../../../api/types/divisions';
import { Spinner } from '../../../components/Spinner';
import Table from '../../../components/Table/Table';

const Divisions: React.FC = () => {
  const names = ['ID', 'Address', 'Halls Count', 'Actions'];
  const [data, setData] = useState<DivisionsListResponse[]>([]);
  const [isLoading, setLoading] = useState<boolean>(false);

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
  }, []);
  return (
    <StyledDivisionsPage>
      {isLoading ? <Spinner /> : <Table names={names} data={data} type={'division'} />}
    </StyledDivisionsPage>
  );
};

export default Divisions;
