import { useNavigate } from 'react-router-dom';
import { DataStorage } from '../services/dataStorage';
import { RouteList } from '../routeList';

const Authorize = () => {
  const navigate = useNavigate();
  if (!DataStorage.get('jwt')) {
    navigate(RouteList.AUTH.LOGIN.path);
  }
};

export { Authorize };
