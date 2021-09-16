import React from 'react';
import {AppProvider} from './Provider/AppConfig';
import {UIProvider} from './Provider/UIProvider';
import {Navigation} from './Navigation/Navigation';
import Firebase from '@react-native-firebase/app';
export const App = () => {
  Firebase.initializeApp(this);
  return (
    <AppProvider>
      <UIProvider>
        <Navigation />
      </UIProvider>
    </AppProvider>
  );
};
