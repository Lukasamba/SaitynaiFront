import React from 'react';
import { Dropdown as ReactstrapDropdown, DropdownMenu } from 'reactstrap';
import { ReactFCWithChildren } from '../../react-app-env';

const Dropdown: ReactFCWithChildren = (props) => {
  return (
    <ReactstrapDropdown isOpen={props.isOpen} toggle={props.toggle}>
      {props.title}
      <DropdownMenu>{props.children}</DropdownMenu>
    </ReactstrapDropdown>
  );
};

export default Dropdown;
