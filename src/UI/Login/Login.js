import React, {useState} from 'react';
import {Text, View} from 'react-native';
import DeviceInfo from 'react-native-device-info';
import {useAppData} from '../../Provider/AppConfig';
import {Button} from '../common/Button';
import {Header} from '../common/Header';
import {Input} from '../common/Input';
import {loginStyles} from './Login.styles';

export const Login = props => {
  const appData = useAppData();
  // const uiElements = useUIElements();
  const {strings} = appData;
  const styles = loginStyles(appData);

  // const [KeyboardVisible, setKeyboardVisible] = useState(false);
  const [email, setEmail] = useState('');

  const renderForm = () => {
    return (
      <View style={styles.formContainer}>
        <Input
          label={'EmailId'}
          inputType={'text'}
          value={email}
          onUpdate={value => {
            setEmail(value);
          }}
          textInputProps={{
            keyboardType: 'email-address',
          }}
          mainContainerStyle={styles.inputMainContainer}
        />
        <Button
          title={'Login'}
          // onPress={() => {
          //   LoginAPI(
          //     {},
          //     data => {
          //       props.navigation.reset({
          //         index: 1,
          //         routes: [{name: 'Home'}],
          //       });
          //     },
          //     error => {
          //       console.log(error);
          //     },
          //   );
          //   // navigate('Home');
          // }}
          // onPress={}
        />
      </View>
    );
  };

  return (
    <View style={styles.mainContainer}>
      <Header
        title={'Login'}
        onBackpress={() => {
          props.navigation.pop();
        }}
      />
      {renderForm()}
      <Text style={styles.versionText}>
        {strings.version.replace('{0}', DeviceInfo.getReadableVersion())}
      </Text>
    </View>
  );
};
