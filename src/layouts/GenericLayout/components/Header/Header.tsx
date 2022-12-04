import React from 'react';
import { StyledHeader, StyledHeaderButton, StyledHeaderSection } from './Header.style';
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

  const renderButton = (title: string, path: string) => {
    return <StyledHeaderButton onClick={() => navigate(path)}>{title}</StyledHeaderButton>;
  };

  return (
    <StyledHeader>
      <StyledHeaderSection>
        {renderButton('Home', RouteList.DASHBOARD.path)}
        {renderButton('Movies', RouteList.MOVIES.path)}
        {renderButton('Halls', RouteList.HALLS.path)}
        {renderButton('Divisions', RouteList.DIVISIONS.path)}
      </StyledHeaderSection>

      <StyledHeaderSection>
        {isLoggedIn() ? (
          <StyledHeaderButton onClick={logout}>Logout</StyledHeaderButton>
        ) : (
          renderButton('Login', RouteList.AUTH.LOGIN.path)
        )}
      </StyledHeaderSection>
    </StyledHeader>
  );
};

export default Header;
