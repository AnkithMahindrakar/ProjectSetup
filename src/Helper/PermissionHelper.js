import {requestMultiple, PERMISSIONS} from 'react-native-permissions';
import {Platform} from 'react-native';
// import AsyncStorage from '@react-native-async-storage/async-storage';

export const checkPermission = async () => {
  const result = await requestMultiple(
    Platform.OS === 'ios'
      ? [PERMISSIONS.IOS.CAMERA, PERMISSIONS.IOS.MICROPHONE]
      : [PERMISSIONS.ANDROID.CAMERA, PERMISSIONS.ANDROID.RECORD_AUDIO],
  );
  console.log(
    'check Permission 2',
    result[PERMISSIONS.ANDROID.RECORD_AUDIO],
    result[PERMISSIONS.ANDROID.CAMERA],
  );
  if (
    result[PERMISSIONS.ANDROID.RECORD_AUDIO] === 'granted' &&
    result[PERMISSIONS.ANDROID.CAMERA] === 'granted'
  ) {
    console.log('isGRanted');
    return result[PERMISSIONS.ANDROID.RECORD_AUDIO];
    // return 'granted';
  }
};
