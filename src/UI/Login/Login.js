import React, {useState, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  View,
  StyleSheet,
  Dimensions,
  Alert,
  Image,
  Text,
  Keyboard,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  useRef,
  Platform,
} from 'react-native';
import {Input} from '../common/Input';
import {Button} from '../common/Button';
import DeviceInfo from 'react-native-device-info';
import NetInfo from '@react-native-community/netinfo';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export const Login = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState();
  const [internet, setinternet] = useState(false);
  const [emailResult, setEmailresult] = useState(false);
  const emailcheck =
    /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;

  useEffect(() => {
    try {
      NetInfo.addEventListener(state => {
        if (state.isConnected === true && state.isInternetReachable === true) {
          setinternet(true);
        } else {
          setinternet(false);
        }
      });
      AsyncStorage.getItem('UserName').then(value => {
        if (value != null) {
          navigation.replace(value);
        }
      });
    } catch (error) {
      console.log(error);
    }
  }, [navigation]);
  const emailHandler = value => {
    const condition = emailcheck.test(String(value));

    if (value === '') {
      setEmail(value);
    } else if (condition === false) {
      setEmail(value);
      setEmailresult(false);
    } else if (condition === true) {
      setEmail(value);
      setEmailresult(true);
    }
  };

  const mobileHandler = value => {
    setMobile(value);
  };
  const navigate = async () => {
    await AsyncStorage.setItem('UserName', 'Home');
    navigation.replace('Home');
  };
  const pressHandler = () => {
    internet
      ? emailResult
        ? mobile && mobile.length === 10
          ? navigate()
          : Alert.alert('Error', 'Enter valid Mobile number')
        : Alert.alert('Error', 'Enter valid Email ID ')
      : Alert.alert('Please check your internet connectivity');
  };

  const Logo = () => {
    return (
      <View style={styles.logoContainer}>
        <Image source={require('../../Resources/Images/Logo.png')} />
      </View>
    );
  };
  const Inputs = () => {
    return (
      <>
        <Input
          label={'Email'}
          inputType={'text'}
          value={email}
          onUpdate={emailHandler}
          textInputProps={{
            keyboardType: 'email-address',
          }}
          mainContainerStyle={styles.inputMainContainer}
        />
        <Input
          label={'Mobile Number'}
          inputType={'text'}
          value={mobile}
          onUpdate={mobileHandler}
          textInputProps={{
            keyboardType: 'number-pad',
          }}
          mainContainerStyle={styles.inputMainContainer}
        />
      </>
    );
  };
  const LoginButton = () => {
    return (
      <Button
        mainContainerStyle={{
          ...styles.btnContainer,
          ...{
            backgroundColor: email && mobile ? '#FB8B24' : '#ABB4BD',
          },
        }}
        title="Login"
        onPress={pressHandler}
        isDisabled={!email || !mobile}
      />
    );
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        {/* <Logo /> */}
        {Logo()}
        <View style={styles.inputContainer}>
          {/* <Inputs /> */}
          {/* <LoginButton /> */}
          {Inputs()}
          {LoginButton()}
        </View>
        <View style={styles.versionContainer}>
          <Text style={styles.versionText}>
            {'\u00A9'}2020 popcornapps, All rights reserved{'\n'} Version{' '}
            {DeviceInfo.getReadableVersion()}
          </Text>
        </View>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'white',
    justifyContent: 'center',
  },
  inputContainer: {
    backgroundColor: 'white',
    width: windowWidth * 0.8,
    marginTop: 40,
  },
  inputMainContainer: {
    marginVertical: 20,
  },
  logoContainer: {
    alignItems: 'center',
    marginTop: 90,
  },
  btnContainer: {
    width: windowWidth * 0.8,
    marginTop: 60,
  },
  versionContainer: {
    marginTop: 100,
  },
  versionText: {
    fontSize: 12,
    color: '#606060',
    textAlign: 'center',
  },
});
