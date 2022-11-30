import React from 'react';
import { StyledBody } from './Body.style';
import { ReactFCWithChildren } from '../../../../react-app-env';

const Body: ReactFCWithChildren = ({ children }) => {
  return <StyledBody>{children}</StyledBody>;
};

export default Body;
