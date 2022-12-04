import React from 'react';
import { StyledHeader, StyledHeaderButton } from './Header.style';
import { useNavigate } from 'react-router-dom';
import { RouteList } from '../../../../routeList';
import { DataStorage } from '../../../../services/dataStorage';

const Header: React.FC = () => {
  const navigate = useNavigate();

  const isLoggedIn = () => {
    return !!DataStorage.get('jwt');
  };

  const logout = () => {
    DataStorage.remove('jwt');
    navigate(RouteList.AUTH.LOGIN.path);
  };

  return (
    <StyledHeader>
      <StyledHeaderButton onClick={() => navigate(RouteList.DASHBOARD.path)}>
        Home
      </StyledHeaderButton>

      {isLoggedIn() ? (
        <StyledHeaderButton onClick={() => logout()}>Logout</StyledHeaderButton>
      ) : (
        <StyledHeaderButton onClick={() => navigate(RouteList.AUTH.LOGIN.path)}>
          Login
        </StyledHeaderButton>
      )}
    </StyledHeader>
  );
};

export default Header;
