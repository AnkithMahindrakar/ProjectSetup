import React, {useState, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  View,
  StyleSheet,
  Alert,
  Image,
  Text,
  Keyboard,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
} from 'react-native';
import {Input} from '../common/Input';
import {Button} from '../common/Button';
import DeviceInfo from 'react-native-device-info';
import Orientation from 'react-native-orientation';
// import axios from 'axios';
import {login, retailerConfig} from '../../API/ApiCalls';

export const Login = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState();

  const [emailResult, setEmailresult] = useState(false);

  const emailcheck =
    /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;

  useEffect(() => {
    Orientation.lockToPortrait();
  });
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
    await AsyncStorage.setItem('UserName', 'PostLoginStack');
    navigation.replace('PostLoginStack');
  };
  const LoginHandler = async () => {
    try {
      const LoginResponseData = await login(email, mobile);
      console.log('LoginResponseData', LoginResponseData.status);
      if (LoginResponseData.status === 200) {
        const RetailerId = LoginResponseData.data.data.RetailerId;
        const RetailerUserId = LoginResponseData.data.data.RetailerUserId;
        const AgentSessionId = LoginResponseData.data.agentSessioinId;

        console.log('ID....', RetailerId, RetailerUserId, AgentSessionId);

        const retailerConfigData = await retailerConfig(
          RetailerId,
          RetailerUserId,
          AgentSessionId,
        );
        console.log('>>>>>>>>>>>>>>>>>>>>', retailerConfigData.data);
        if (retailerConfigData.status === 200) {
          emailResult
            ? mobile
              ? navigate()
              : Alert.alert('Error', 'Enter valid Password')
            : Alert.alert('Error', 'Enter valid Email ID ');
          console.log('Result status is 200 in retail config');
        } else {
          console.log('Error, result status is not 200 in retail config');
        }
      } else {
        console.log('Error, result status is not 200 in Login');
      }

      // console.log('Return RetailerConfig response', retailerConfigData);
    } catch (error) {
      console.log('Error from Login Screen--->', error);
      Alert.alert('Error', error.message);
    }
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
          // textInputProps={{
          //   keyboardType: 'number-pad',
          // }}
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
        onPress={LoginHandler}
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
        <TouchableOpacity
          style={styles.forgotContainer}
          onPress={() => {
            navigation.navigate('ForgotPasswordScreen');
          }}>
          <Text style={styles.forgotTxt}>Forgot Password?</Text>
        </TouchableOpacity>
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
    width: 330,
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
    width: 330,
    marginTop: 60,
  },
  versionContainer: {
    marginTop: 70,
  },
  versionText: {
    fontSize: 12,
    color: '#606060',
    textAlign: 'center',
  },
  forgotContainer: {
    // backgroundColor: 'red',
    marginTop: 15,
  },
  forgotTxt: {
    color: '#FB8B24',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
