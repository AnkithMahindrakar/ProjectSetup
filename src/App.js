import React, {useEffect} from 'react';
import OneSignal from 'react-native-onesignal';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {AppProvider} from './Provider/AppConfig';
import {UIProvider} from './Provider/UIProvider';
import {Navigation} from './Navigation/Navigation';
import Firebase from '@react-native-firebase/app';
export const App = () => {
  const onesignal = async () => {
    OneSignal.setLogLevel(2, 3);

    OneSignal.setAppId('4b6816e6-57aa-4765-8898-a83164203baa');
    const oneSignalPlayerID = (await OneSignal.getDeviceState()).userId;
    await AsyncStorage.setItem('oneSignalPlayerID', oneSignalPlayerID);
    console.log('onesignalplayerId', oneSignalPlayerID);
  };
  useEffect(() => {
    console.log(Firebase.apps.length);
    //check whether firebase is initilized or not
    if (Firebase.apps.length === 0) {
      Firebase.initializeApp();
    }
    onesignal();
  });

  return (
    <AppProvider>
      <UIProvider>
        <Navigation />
      </UIProvider>
    </AppProvider>
  );
};
