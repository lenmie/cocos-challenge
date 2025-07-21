import styled from 'styled-components/native';
import { DefaultTheme } from 'styled-components/native';

export const CommonText = styled.Text`
  color: ${({ theme }: { theme: DefaultTheme }) => theme.text};
  font-size: 16px;
  font-weight: 500;
  text-align: center;
`;
