import {createStackNavigator} from '@react-navigation/stack';
import * as React from 'react';
import {Home} from '../../UI/Home/Home';

const Stack = createStackNavigator();

export const PostLoginStackRoutes = () => {
  return (
    <Stack.Navigator
      initialRouteName={'Home'}
      screenOptions={{headerShown: false}}>
      <Stack.Screen name={'Home'} component={Home} />
    </Stack.Navigator>
  );
};
