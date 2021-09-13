import React, {useState} from 'react';
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
  Platform,
} from 'react-native';
import {Input} from '../common/Input';
import {Button} from '../common/Button';
import DeviceInfo from 'react-native-device-info';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export const Login = props => {
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState();
  const [emailResult, setEmailresult] = useState(false);
  const emailcheck =
    /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;

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

  const pressHandler = () => {
    emailResult
      ? mobile && mobile.length === 10
        ? props.navigation.navigate('Home')
        : Alert.alert('Error', 'Enter valid Mobile number')
      : Alert.alert('Error', 'Enter valid Email ID ');
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
