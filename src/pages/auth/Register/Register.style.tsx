import styled from 'styled-components';
import { Button, Label } from 'reactstrap';

export const StyledRegisterPage = styled.div`
  background-color: ${({ theme }) => theme.colors.white};
  border-radius: 0.25rem;
  padding: 1rem;
`;

export const StyledRegisterBlock = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
`;

export const StyledInputBlock = styled.div`
  margin-bottom: 1rem;
`;

export const StyledLabel = styled(Label)``;

export const StyledRegisterButton = styled(Button)``;

export const StyledRegisterSuggestionBlock = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-top: 0.5rem;
`;

export const StyledRegisterSuggestionText = styled.div``;

export const StyledRegisterSuggestionButton = styled.div``;
