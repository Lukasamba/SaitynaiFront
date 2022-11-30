import React from 'react';
import { ReactFCWithChildren } from '../../react-app-env';
import { Header } from './components/Header';
import { Body } from './components/Body';
import { Footer } from './components/Footer';
import { StyledGenericLayout } from './GenericLayout.style';

const GenericLayout: ReactFCWithChildren = ({ children }) => {
  return (
    <>
      <StyledGenericLayout>
        <Header />
        <Body>{children}</Body>
        <Footer />
      </StyledGenericLayout>
    </>
  );
};

export default GenericLayout;
