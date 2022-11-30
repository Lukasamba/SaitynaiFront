import styled from 'styled-components';

export const StyledBody = styled.div`
  border: 1px solid ${({ theme }) => theme.colors.gray};
  border-radius: 0.25rem;
  margin: 1rem;
  padding: 1rem;
  width: calc(100% - 2rem);
`;
