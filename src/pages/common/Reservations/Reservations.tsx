import React, { useEffect, useState } from 'react';
import { Api } from '../../../api';
import useRoles, { Roles } from '../../../helpers/helpers';
import { ReservationsListResponse } from '../../../api/types/movies';
import { Spinner } from '../../../components/Spinner';
import { Table as ReactstrapTable } from 'reactstrap';

const Reservations: React.FC = () => {
  const [render, setRender] = useState<number>(0);
  const toggleRender = () => setRender((prevState) => prevState + 1);

  const remoteRoles = useRoles();
  const isManager = () => {
    return remoteRoles.hasAny(Roles.Manager);
  };

  const [isLoading, setLoading] = useState<boolean>(false);

  const [data, setData] = useState<ReservationsListResponse>([]);

  useEffect(() => {
    setLoading(true);
    (async () => {
      try {
        const response = await Api.movies.getReservationsList();
        setData(response);
        setLoading(false);
      } catch (e: any) {
        toggleRender();
        console.error('movies fetch failed');
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [render]);

  const names = isManager()
    ? ['User ID', 'Name', 'Reservation Date']
    : ['Name', 'Reservation Date'];
  const renderTableHeader = () => {
    return names.map((value, index) => <th key={index}>{value}</th>);
  };

  const renderTableContent = () => {
    return data.map((value, index) => (
      <tr key={index}>{Object.values(value).map((v, i) => v && <td key={i}>{v}</td>)}</tr>
    ));
  };

  return (
    <div>
      {isLoading ? (
        <Spinner />
      ) : (
        <ReactstrapTable hover>
          <thead>
            <tr>{renderTableHeader()}</tr>
          </thead>

          <tbody>{renderTableContent()}</tbody>
        </ReactstrapTable>
      )}
    </div>
  );
};

export default Reservations;
