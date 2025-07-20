import styled from 'styled-components/native';
import { DefaultTheme } from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }: { theme: DefaultTheme }) => theme.background};
`;

export const Title = styled.Text`
  color: ${({ theme }: { theme: DefaultTheme }) => theme.text};
  font-size: 20px;
  margin-bottom: 20px;
`;
