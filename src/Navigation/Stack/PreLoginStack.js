import {createNativeStackNavigator} from '@react-navigation/native-stack';
import * as React from 'react';
// import {Home} from '../../UI/Home/Home';

import {Login} from '../../UI/Login/Login';
import {LandingScreen} from '../../UI/LandingScreen';

const Stack = createNativeStackNavigator();

export const PreLoginStackRoutes = () => {
  return (
    <Stack.Navigator
      initialRouteName={'landingScreen'}
      screenOptions={{headerShown: false}}>
      <Stack.Screen name={'Login'} component={Login} />
      <Stack.Screen name={'landingScreen'} component={LandingScreen} />
    </Stack.Navigator>
  );
};
