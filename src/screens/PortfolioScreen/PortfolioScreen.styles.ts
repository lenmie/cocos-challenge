import styled from 'styled-components/native';
import { DefaultTheme } from 'styled-components/native';

export const ItemContainer = styled.View`
  padding: 16px;
  border-bottom-width: 1px;
  border-bottom-color: ${({ theme }: { theme: DefaultTheme }) => theme.tertiary};
  background-color: ${({ theme }: { theme: DefaultTheme }) => theme.background};
`;

export const TickerText = styled.Text`
  color: ${({ theme }: { theme: DefaultTheme }) => theme.text};
`;

export const ItemSeparator = styled.View`
  height: 2px;
  background-color: ${({ theme }: { theme: DefaultTheme }) => theme.primary};
`;