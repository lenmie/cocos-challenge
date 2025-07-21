import styled from 'styled-components/native';
import { DefaultTheme } from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }: { theme: DefaultTheme }) => theme.background};
  padding: 16px;
  justify-content: center;
`;
