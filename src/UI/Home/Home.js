/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Octicons from 'react-native-vector-icons/Octicons';
import DeviceInfo from 'react-native-device-info';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {ProfileScreen} from './ProfileScreen';
import {deviceToken} from '../../API/ApiCalls';
import Orientation from 'react-native-orientation';
import messaging from '@react-native-firebase/messaging';
export const Home = props => {
  const [profile, setProfile] = useState(true);
  const [notification, setNotification] = useState(false);
  const [calendar, setCalendar] = useState(false);
  const [catalog, setCatalog] = useState(false);
  const [random, setRandom] = useState(false);
  const [isPortrait, setIsPortrait] = useState();
  const [loginData, setLoginData] = useState(null);
  const [retailConfigData, setRetailConfigData] = useState(null);

  const AsyncData = async () => {
    try {
      const JsonLOGINDATA = await AsyncStorage.getItem('LOGIN_DATA');
      const LOGINDATA =
        JsonLOGINDATA != null ? JSON.parse(JsonLOGINDATA) : null;
      const JsonRETAILERCONFIGDATA = await AsyncStorage.getItem(
        'RETAILER_CONFIG',
      );
      const RETAILERCONFIGDATA =
        JsonRETAILERCONFIGDATA != null
          ? JSON.parse(JsonRETAILERCONFIGDATA)
          : null;
      if (LOGINDATA !== null && RETAILERCONFIGDATA !== null) {
        setLoginData(LOGINDATA);
        setRetailConfigData(RETAILERCONFIGDATA);
      }
      messaging()
        .getToken()
        .then(token => {
          devicetoken(token);
          console.log('tokens no ', token);
        });
    } catch (e) {
      console.log(e);
    }
  };
  //const Email = loginData.data.Email;
  //console.log('email of the universe', Email);
  const devicetoken = async deviceoftoken => {
    await AsyncStorage.setItem('DeviceToken', deviceoftoken);
    console.log('device token method');
    const token = await deviceToken(
      loginData.data.Email,
      deviceoftoken,
      deviceoftoken,
      'android',
      DeviceInfo.getReadableVersion(),
      loginData.data.RetailerId,
      loginData.data.RetailerUserId,
      loginData.agentSessionID,
      '',
    );
    console.log('token excuted', token);
  };

  useEffect(() => {
    AsyncData();
    Orientation.unlockAllOrientations();
    const initial = Orientation.getInitialOrientation();
    if (initial === 'PORTRAIT') {
      setIsPortrait(true);
    } else {
      setIsPortrait(false);
    }

    const _orientationDidChange = orientation => {
      if (orientation === 'LANDSCAPE') {
        setIsPortrait(false);
      } else {
        setIsPortrait(true);
      }
      // return orientation;
    };
    Orientation.addOrientationListener(_orientationDidChange);

    return () => Orientation.removeOrientationListener(_orientationDidChange);
  }, []);
  // console.log('LOGIN_DATA', loginData);
  //console.log('RETAILER_CONFIG', retailConfigData);

  const LogoutHandler = async () => {
    try {
      await AsyncStorage.removeItem('UserName');
      props.navigation.navigate('Login');
    } catch (e) {
      console.log('Error on logout===>', e);
    }
  };

  const profileHandler = () => {
    setProfile(true);
    setNotification(false);
    setCalendar(false);
    setCatalog(false);
    setRandom(false);
  };
  const notificationHandler = () => {
    setProfile(false);
    setNotification(true);
    setCalendar(false);
    setCatalog(false);
    setRandom(false);
  };

  const calendarHandler = () => {
    setProfile(false);
    setNotification(false);
    setCalendar(true);
    setCatalog(false);
    setRandom(false);
  };

  const catalogHandler = () => {
    setProfile(false);
    setNotification(false);
    setCalendar(false);
    setCatalog(true);
    setRandom(false);
  };

  const randomHandler = () => {
    setProfile(false);
    setNotification(false);
    setCalendar(false);
    setCatalog(false);
    setRandom(true);
  };

  const BottomTab = () => {
    return (
      <>
        <TouchableOpacity style={styles.iconContainer} onPress={profileHandler}>
          <FontAwesome
            name="user-circle"
            size={profile ? 30 : 24}
            color={profile ? 'white' : 'rgba(255, 255, 255, 0.5)'}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.iconContainer}
          onPress={notificationHandler}>
          <Ionicons
            name="notifications"
            size={notification ? 30 : 24}
            color={notification ? 'white' : 'rgba(255, 255, 255, 0.5)'}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.iconContainer}
          onPress={calendarHandler}>
          <FontAwesome
            name="calendar-o"
            size={calendar ? 30 : 24}
            color={calendar ? 'white' : 'rgba(255, 255, 255, 0.5)'}
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconContainer} onPress={catalogHandler}>
          <MaterialCommunityIcons
            name="format-page-break"
            size={catalog ? 30 : 24}
            color={catalog ? 'white' : 'rgba(255, 255, 255, 0.5)'}
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconContainer} onPress={randomHandler}>
          <Octicons
            name="book"
            size={random ? 30 : 24}
            color={random ? 'white' : 'rgba(255, 255, 255, 0.5)'}
          />
        </TouchableOpacity>
      </>
    );
  };
  return (
    <View style={styles.container}>
      {profile && (
        <ProfileScreen onPress={LogoutHandler} isPortrait={isPortrait} />
      )}

      {notification && (
        <View>
          <Text style={styles.screenText}>Notification screen</Text>
        </View>
      )}
      {calendar && (
        <View>
          <Text style={styles.screenText}>Calendar screen</Text>
        </View>
      )}
      {catalog && (
        <View>
          <Text style={styles.screenText}>Catalog screen</Text>
        </View>
      )}
      {random && (
        <View>
          <Text style={styles.screenText}>Random screen</Text>
        </View>
      )}
      <View style={isPortrait ? styles.BottomTabConatiner : styles.sideTab}>
        {BottomTab()}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  BottomTabConatiner: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: 70,
    backgroundColor: '#FB8B24',
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  sideTab: {
    position: 'absolute',
    height: '100%',
    width: 90,
    left: 0,
    backgroundColor: '#FB8B24',
    justifyContent: 'space-around',
    alignItems: 'center',
  },

  iconContainer: {
    height: 60,
    width: 60,
    alignItems: 'center',
    justifyContent: 'center',
  },
  screenText: {
    fontSize: 30,
  },
});
