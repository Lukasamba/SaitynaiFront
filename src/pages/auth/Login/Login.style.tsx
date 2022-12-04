import styled from 'styled-components';
import { Button, Label } from 'reactstrap';

export const StyledLoginPage = styled.div`
  background-color: ${({ theme }) => theme.colors.white};
  border-radius: 0.25rem;
  padding: 1rem;
`;

export const StyledInputBlock = styled.div`
  margin-bottom: 1rem;
`;

export const StyledLabel = styled(Label)``;

export const StyledLoginButton = styled(Button)``;
