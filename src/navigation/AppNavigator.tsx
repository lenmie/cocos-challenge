import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import {
  InstrumentsScreen,
  OrdersScreen,
  PortfolioScreen,
  SettingsScreen,
} from '../screens';
import { useTheme } from '../theme/ThemeProvider';

const Tab = createBottomTabNavigator();

const AppNavigator = () => {
  const { theme: currentTheme } = useTheme();

  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          tabBarStyle: {
            backgroundColor: currentTheme.background,
          },
          tabBarActiveTintColor: currentTheme.primary,
          tabBarInactiveTintColor: currentTheme.text,
          headerStyle: {
            backgroundColor: currentTheme.background,
          },
          headerTitleStyle: {
            color: currentTheme.text,
          },
        }}
      >
        <Tab.Screen name="Instruments" component={InstrumentsScreen} />
        <Tab.Screen name="Portfolio" component={PortfolioScreen} />
        <Tab.Screen name="Orders" component={OrdersScreen} />
        <Tab.Screen name="Settings" component={SettingsScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
