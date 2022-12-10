import React, { useState } from 'react';
import {
  StyledHeader,
  StyledHeaderButton,
  StyledHeaderSection,
  StyledLogoButton,
} from './Header.style';
import { useNavigate } from 'react-router-dom';
import { RouteList } from '../../../../routeList';
import { DataStorage } from '../../../../services/dataStorage';
import { useAppContext } from '../../../../AppContext';
import { Api } from '../../../../api';
import iconLogo from '../../../../assets/icons/logo.svg';
import useWindowsSize, { BOOTSTRAP_MD_CONTAINER_WIDTH } from '../../../../helpers/useWindowsSize';
import Dropdown from '../../../../components/Dropdown/Dropdown';
import { DropdownItem, DropdownToggle } from 'reactstrap';
import iconBurger from '../../../../assets/icons/list.svg';

const Header: React.FC = () => {
  const navigate = useNavigate();

  const windowsSize = useWindowsSize();
  const isTablet = () => {
    return windowsSize.width && windowsSize.width < BOOTSTRAP_MD_CONTAINER_WIDTH;
  };

  const [isDropdownOpen, setDropdownOpen] = useState<boolean>(false);
  const toggleDropdown = () => setDropdownOpen(!isDropdownOpen);

  const appContext = useAppContext();

  const isLoggedIn = () => {
    return !!DataStorage.get('jwt');
  };

  const logout = async () => {
    try {
      await Api.user.auth.logout();
    } finally {
      DataStorage.remove('jwt');
      appContext.setJwt(null);
      navigate(RouteList.AUTH.LOGIN.path);
    }
  };

  const renderButton = (title: string, path: string) => {
    return <StyledHeaderButton onClick={() => navigate(path)}>{title}</StyledHeaderButton>;
  };

  return (
    <StyledHeader>
      <StyledHeaderSection>
        {!isTablet() ? (
          <>
            <StyledLogoButton>
              <img src={iconLogo} width={24} alt={''} />
            </StyledLogoButton>

            {renderButton('Movies', RouteList.MOVIES.path)}
            {renderButton('Halls', RouteList.HALLS.path)}
            {renderButton('Divisions', RouteList.DIVISIONS.path)}
          </>
        ) : (
          <Dropdown
            isOpen={isDropdownOpen}
            toggle={toggleDropdown}
            title={
              <DropdownToggle style={{ backgroundColor: 'transparent', border: 'none' }}>
                <img src={iconBurger} alt={''} />
              </DropdownToggle>
            }
          >
            <DropdownItem onClick={() => navigate(RouteList.MOVIES.path)}>Movies</DropdownItem>
            <DropdownItem onClick={() => navigate(RouteList.HALLS.path)}>Halls</DropdownItem>
            <DropdownItem onClick={() => navigate(RouteList.DIVISIONS.path)}>
              Divisions
            </DropdownItem>
          </Dropdown>
        )}
      </StyledHeaderSection>

      {isTablet() && (
        <StyledLogoButton>
          <img src={iconLogo} width={24} alt={''} />
        </StyledLogoButton>
      )}

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
