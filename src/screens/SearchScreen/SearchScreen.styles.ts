import styled from 'styled-components/native';
import { DefaultTheme } from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  padding: 16px;
  background-color: ${({ theme }: { theme: DefaultTheme }) => theme.background};
`;

export const Input = styled.TextInput`
  height: 40px;
  border-color: ${({ theme }: { theme: DefaultTheme }) => theme.tertiary};
  border-width: 1px;
  margin-bottom: 16px;
  padding-horizontal: 8px;
  color: ${({ theme }: { theme: DefaultTheme }) => theme.text};
`;

export const ItemContainer = styled.View`
  padding: 16px;
  border-bottom-width: 1px;
  border-bottom-color: ${({ theme }: { theme: DefaultTheme }) => theme.tertiary};
`;

export const ModalContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: 20px;
  background-color: ${({ theme }: { theme: DefaultTheme }) => theme.background};
`;

export const ModalTitle = styled.Text`
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 20px;
  color: ${({ theme }: { theme: DefaultTheme }) => theme.text};
`;

export const SearchText = styled.Text`
  color: ${({ theme }: { theme: DefaultTheme }) => theme.text};
`;