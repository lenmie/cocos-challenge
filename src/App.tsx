import React from 'react';
import { Provider } from 'react-redux';
import { store } from './store/store';
import AppNavigator from './navigation/AppNavigator';
import Reactotron from 'reactotron-react-native';
import { ThemeProvider } from './theme/ThemeProvider';

Reactotron.configure({})
  .useReactNative()
  .connect(); 

const App = () => (
  <Provider store={store}>
    <ThemeProvider>
      <AppNavigator />
    </ThemeProvider>
  </Provider>
);

export default App;