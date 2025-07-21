import React from 'react';
import { useTheme } from '../../theme/ThemeProvider';
import { Title } from './SettingsScreen.styles';
import { CommonScreenContainer } from '../../components';
import { CommonButton } from '../../components/CommonButton/CommonButton';

export const SettingsScreen = () => {
  const { toggleTheme } = useTheme();

  return (
    <CommonScreenContainer>
      <CommonButton title="Toggle Theme" onPress={toggleTheme} />
    </CommonScreenContainer>
  );
};
