import React from 'react';
import { Button } from 'react-native';
import { useTheme } from '../../theme/ThemeProvider';
import { Title } from './SettingsScreen.styles';
import { CommonScreenContainer } from '../../components';

export const SettingsScreen = () => {
  const { toggleTheme } = useTheme();

  return (
    <CommonScreenContainer>
      <Title>Settings</Title>
      <Button title="Toggle Theme" onPress={toggleTheme} />
    </CommonScreenContainer>
  );
};
