import React from 'react';
import {AppProvider} from './Provider/AppConfig';
import {UIProvider} from './Provider/UIProvider';
import {Navigation} from './Navigation/Navigation';
import Firebase from '@react-native-firebase/app';
export const App = () => {
  // if (firebase.apps.length === 0) {
  //   Firebase.initializeApp();
  // }
  console.log(Firebase.apps.length);
  if (Firebase.apps.length === 0) {
    Firebase.initializeApp();
  }

  return (
    <AppProvider>
      <UIProvider>
        <Navigation />
      </UIProvider>
    </AppProvider>
  );
};
