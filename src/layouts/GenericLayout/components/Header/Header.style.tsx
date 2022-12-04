import styled from 'styled-components';
import { Button } from 'reactstrap';

export const StyledHeader = styled.div`
  align-items: center;
  background-color: ${({ theme }) => theme.colors.purple1};
  border-radius: 0.25rem;
  color: white;
  display: flex;
  height: 4rem;
  justify-content: space-between;
  margin: 1rem;
  padding: 1rem;
  width: calc(100% - 2rem);
`;

export const StyledHeaderSection = styled.div``;

export const StyledHeaderButton = styled(Button)`
  :not(:last-child) {
    margin-right: 1rem;
  }
`;
