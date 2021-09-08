import React from 'react';
import {AppProvider} from './Provider/AppConfig';
import {UIProvider} from './Provider/UIProvider';
import {Navigation} from './Navigation/Navigation';
import SplashScreen from 'react-native-splash-screen';
export const App = () => {
  return (
    <AppProvider>
      <UIProvider>
        <Navigation />
      </UIProvider>
    </AppProvider>
  );
};
