import React from 'react';
import { ReactFCWithChildren } from '../../react-app-env';

const GenericLayout: ReactFCWithChildren = ({ children }) => {
  return (
    <>
      <div>Header</div>
      <div>
        Body
        <div>{children}</div>
      </div>
      <div>Footer</div>
    </>
  );
};

export default GenericLayout;
