/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect} from 'react';
import {View, Text, SafeAreaView} from 'react-native';
import {useAppData} from '../Provider/AppConfig';
import {Button} from './common/Button';
import DeviceInfo from 'react-native-device-info';
import {landingScreenStyles} from './LandingScreen.styles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useUIElements} from '../Provider/UIProvider';

export const LandingScreen = props => {
  const appData = useAppData();
  const {setShowLoading} = useUIElements();

  const {strings} = appData;
  const styles = landingScreenStyles(appData);

  useEffect(() => {
    setShowLoading(true);
    AsyncStorage.getItem('login')
      .then(data => {
        if (data) {
          props.navigation.reset({
            index: 1,
            routes: [{name: 'Home'}],
          });
        }
      })
      .catch(error => {})
      .finally(() => {
        setShowLoading(false);
      });
  }, []);

  return (
    <View style={styles.mainContainer}>
      <SafeAreaView style={styles.subContainer}>
        <Button
          title={'Go to Login'}
          onPress={() => {
            props.navigation.navigate('Login');
          }}
        />
        <Text style={styles.versionText}>
          {strings.version.replace('{0}', DeviceInfo.getReadableVersion())}
        </Text>
      </SafeAreaView>
    </View>
  );
};
