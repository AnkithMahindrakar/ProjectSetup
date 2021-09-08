import React, {useEffect} from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';
import DeviceInfo from 'react-native-device-info';
import SplashScreen from 'react-native-splash-screen';

export const LandingScreen = ({navigation}) => {
  SplashScreen.hide();
  useEffect(() => {
    setTimeout(() => {
      navigation.navigate('Login');
    }, 1000);
  });

  return (
    <View style={styles.gridItem}>
      <Image source={require('../../assets/Group.png')} />

      <Text style={styles.versionText}>
        {'\u00A9'}2020 popcornapps, All rights reserved {'\n'}
        {'                         '}
        Version {DeviceInfo.getReadableVersion()}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  gridItem: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },

  versionText: {
    fontSize: 15,
    position: 'absolute',
    bottom: 10,
    alignItems: 'center',
    color: '#606060',
  },
});
