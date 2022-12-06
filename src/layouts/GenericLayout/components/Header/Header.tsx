import React from 'react';
import { StyledHeader, StyledHeaderButton, StyledHeaderSection } from './Header.style';
import { useNavigate } from 'react-router-dom';
import { RouteList } from '../../../../routeList';
import { DataStorage } from '../../../../services/dataStorage';
import { useAppContext } from '../../../../AppContext';

const Header: React.FC = () => {
  const navigate = useNavigate();

  const appContext = useAppContext();

  const isLoggedIn = () => {
    return !!DataStorage.get('jwt');
  };

  const logout = () => {
    DataStorage.remove('jwt');
    appContext.setJwt(null);
    navigate(RouteList.AUTH.LOGIN.path);
  };

  const renderButton = (title: string, path: string) => {
    return <StyledHeaderButton onClick={() => navigate(path)}>{title}</StyledHeaderButton>;
  };

  return (
    <StyledHeader>
      <StyledHeaderSection>
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
