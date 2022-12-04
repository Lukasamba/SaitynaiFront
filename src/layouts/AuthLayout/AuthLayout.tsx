import React from 'react';
import { StyledAuthLayout } from './AuthLayout.style';
import { ReactFCWithChildren } from '../../react-app-env';

const AuthLayout: ReactFCWithChildren = ({ children }) => {
  return (
    <>
      <StyledAuthLayout>{children}</StyledAuthLayout>;
    </>
  );
};

export default AuthLayout;
