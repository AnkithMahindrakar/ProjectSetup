import {createNativeStackNavigator} from '@react-navigation/native-stack';
import * as React from 'react';
// import {Home} from '../../UI/Home/Home';

import {Login} from '../../UI/Login/Login';
import {OTPScreen} from '../../UI/Login/OTPScreen';
import {LandingScreen} from '../../UI/LandingScreen';
const Stack = createNativeStackNavigator();

export const PreLoginStackRoutes = () => {
  return (
    <Stack.Navigator
      initialRouteName={'Landing'}
      screenOptions={{headerShown: false}}>
      <Stack.Screen name={'Landing'} component={LandingScreen} />
      <Stack.Screen name={'Login'} component={Login} />
      <Stack.Screen name={'OTPScreen'} component={OTPScreen} />
    </Stack.Navigator>
  );
};
