import React from 'react';
import { Spinner as ReactstrapSpinner } from 'reactstrap';
import { StyledSpinnerWrapper } from './Spinner.style';

const Spinner: React.FC = () => {
  return (
    <StyledSpinnerWrapper>
      <ReactstrapSpinner />
    </StyledSpinnerWrapper>
  );
};

export default Spinner;
