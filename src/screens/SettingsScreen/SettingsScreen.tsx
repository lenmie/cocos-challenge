import React from 'react';
import { Button } from 'react-native';
import { useTheme } from '../../theme/ThemeProvider';
import { Container, Title } from './SettingsScreen.styles';

export const SettingsScreen = () => {
  const { toggleTheme } = useTheme();

  return (
    <Container>
      <Title>Settings</Title>
      <Button title="Toggle Theme" onPress={toggleTheme} />
    </Container>
  );
};
