import React, { useEffect } from 'react';
import { Button } from 'reactstrap';
import { useNavigate } from 'react-router-dom';
import { DataStorage } from '../../../services/dataStorage';
import { RouteList } from '../../../routeList';

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  useEffect(() => {
    if (!DataStorage.get('jwt')) {
      navigate(RouteList.AUTH.LOGIN.path);
    }
  }, []);

  return (
    <>
      <div>Dashboard page</div>
      <Button>Button</Button>
    </>
  );
};

export default Dashboard;
