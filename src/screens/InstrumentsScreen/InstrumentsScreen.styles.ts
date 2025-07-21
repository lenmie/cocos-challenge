import styled from 'styled-components/native';
import { DefaultTheme } from 'styled-components/native';

export const ItemSeparator = styled.View`
  height: 2px;
  background-color: ${({ theme }: { theme: DefaultTheme }) => theme.primary};
`;
