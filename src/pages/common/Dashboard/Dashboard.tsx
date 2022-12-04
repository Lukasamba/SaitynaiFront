import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { DataStorage } from '../../../services/dataStorage';
import { RouteList } from '../../../routeList';

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  useEffect(() => {
    if (!DataStorage.get('jwt')) {
      navigate(RouteList.AUTH.LOGIN.path);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div>Dashboard page</div>
    </>
  );
};

export default Dashboard;
