import {createNativeStackNavigator} from '@react-navigation/native-stack';
import * as React from 'react';
// import {Home} from '../../UI/Home/Home';

import {Login} from '../../UI/Login/Login';
import {OTPScreen} from '../../UI/Login/OTPScreen';

const Stack = createNativeStackNavigator();

export const PreLoginStackRoutes = () => {
  return (
    <Stack.Navigator
      initialRouteName={'Login'}
      screenOptions={{headerShown: false}}>
      <Stack.Screen name={'Login'} component={Login} />
      <Stack.Screen name={'OTPScreen'} component={OTPScreen} />
    </Stack.Navigator>
  );
};
