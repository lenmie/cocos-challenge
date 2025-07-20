import React from 'react';
import { View, Text, Button } from 'react-native';
import { useTheme } from '../../theme/ThemeProvider';
import styled from 'styled-components/native';
import { Theme } from '../../theme/theme';

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }: { theme: Theme }) => theme.background};
`;

const Title = styled.Text`
  color: ${({ theme }: { theme: Theme }) => theme.text};
  font-size: 20px;
  margin-bottom: 20px;
`;

export const SettingsScreen = () => {
  const { toggleTheme } = useTheme();

  return (
    <Container>
      <Title>Settings</Title>
      <Button title="Toggle Theme" onPress={toggleTheme} />
    </Container>
  );
};
