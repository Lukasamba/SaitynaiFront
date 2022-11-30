import styled from 'styled-components';

export const StyledFooter = styled.div`
  align-items: center;
  background-color: ${({ theme }) => theme.colors.purple1};
  border-radius: 0.25rem;
  color: white;
  display: flex;
  height: 2rem;
  margin: 1rem;
  padding: 1rem;
  width: calc(100% - 2rem);
`;
