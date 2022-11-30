import React from 'react';
import { StyledHeader, StyledHeaderButton } from './Header.style';

const Header: React.FC = () => {
  return (
    <StyledHeader>
      <StyledHeaderButton>Home</StyledHeaderButton>
    </StyledHeader>
  );
};

export default Header;
