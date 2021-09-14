import {createNativeStackNavigator} from '@react-navigation/native-stack';
import * as React from 'react';
import {Home} from '../../UI/Home/Home';

const Stack = createNativeStackNavigator();

export const PostLoginStackRoutes = () => {
  return (
    <Stack.Navigator
      initialRouteName={'Home'}
      screenOptions={{headerShown: false}}>
      <Stack.Screen name={'Home'} component={Home} />
    </Stack.Navigator>
  );
};
