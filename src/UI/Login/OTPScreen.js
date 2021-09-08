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
} from 'react-native';
import {Button} from '../common/Button';
import DeviceInfo from 'react-native-device-info';
import OTPInputView from '@twotalltotems/react-native-otp-input';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export const OTPScreen = props => {
  console.log(windowHeight, windowWidth);
  const [code, setCode] = useState();

  console.log(code);
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <View style={styles.logoContainer}>
          <Image source={require('../../Resources/Images/Logo.png')} />
        </View>
        <View style={styles.inputContainer}>
          <View style={styles.textContainer}>
            <Text style={styles.textstyle}>
              Enter 4 digit code sent to you at ******4575
            </Text>
          </View>
          <View style={styles.otpConatiner}>
            <OTPInputView
              pinCount={4}
              autoFocusOnLoad
              code={code}
              onCodeChanged={e => setCode(e)}
              onCodeFilled={value => {
                console.log(`Code is ${value}, you are good to go!`);
              }}
              codeInputFieldStyle={styles.underlineStyleBase}
              codeInputHighlightStyle={styles.underlineStyleHighLighted}
            />
          </View>
          <Button
            mainContainerStyle={{
              ...styles.btnContainer,
              ...{
                backgroundColor:
                  code && code.toString().length === 4 ? '#FB8B24' : '#ABB4BD',
              },
            }}
            title="Login"
            onPress={() =>
              code && code.toString().length === 4
                ? console.log('navigated')
                : Alert.alert('Error', 'Please enter all 4 digits')
            }
          />
        </View>
        <Text style={styles.versionText}>
          Version {DeviceInfo.getReadableVersion()}
        </Text>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  inputContainer: {
    backgroundColor: 'white',

    width: windowWidth * 0.8,
    bottom: 20,
  },
  inputMainContainer: {
    marginVertical: 20,
  },
  logoContainer: {
    height: windowHeight * 0.25,
    // backgroundColor: 'yellow',
    width: windowWidth * 0.4,
    bottom: 20,
    alignItems: 'center',
  },
  btnContainer: {
    width: windowWidth * 0.8,
    marginTop: 60,
  },
  versionText: {
    fontSize: 12,
    top: 80,
    color: '#606060',
  },
  textContainer: {
    // backgroundColor: 'yellow',
    height: 70,
    marginVertical: 16,
    // flexDirection: 'row',
  },
  textstyle: {
    fontSize: 22,
    color: '#606060',
  },
  otpConatiner: {
    height: 60,
  },
  underlineStyleBase: {
    width: 40,
    height: 55,
    borderWidth: 0,
    borderBottomWidth: 1,
    borderColor: '#ABB4BD',
  },

  underlineStyleHighLighted: {
    borderColor: '#FB8B24',
  },
});
