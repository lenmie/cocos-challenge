import React from 'react';
import { Provider } from 'react-redux';
import { store } from './store/store';
import AppNavigator from './navigation/AppNavigator';
import Reactotron from 'reactotron-react-native';

Reactotron.configure() 
  .useReactNative() 
  .connect(); 

const App = () => (
  <Provider store={store}>
    <AppNavigator />
  </Provider>
);

export default App;