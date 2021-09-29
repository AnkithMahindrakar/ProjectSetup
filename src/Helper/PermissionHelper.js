import {requestMultiple, PERMISSIONS} from 'react-native-permissions';
import {Platform} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const checkPermission = () => {
  try {
    requestMultiple(
      Platform.OS === 'ios'
        ? [PERMISSIONS.IOS.CAMERA, PERMISSIONS.IOS.MICROPHONE]
        : [PERMISSIONS.ANDROID.CAMERA, PERMISSIONS.ANDROID.RECORD_AUDIO],
    ).then(result => {
      console.log(
        '::::::::::::::::::::::',
        result[PERMISSIONS.ANDROID.RECORD_AUDIO],
        // setPermission(result[PERMISSIONS.ANDROID.RECORD_AUDIO]),
        // AsyncStorage.setItem(
        //   'Mic_Permission',
        //   JSON.stringify(result[PERMISSIONS.ANDROID.RECORD_AUDIO]),
        // ),
        // AsyncStorage.setItem(
        //   'Camera_Permission',
        //   JSON.stringify(result[PERMISSIONS.ANDROID.CAMERA]),
        // ),
      );
      return 'hello';
    });
  } catch (e) {
    console.log(e);
  }
};

export const checkPermission2 = async () => {
  const result = await requestMultiple(
    Platform.OS === 'ios'
      ? [PERMISSIONS.IOS.CAMERA, PERMISSIONS.IOS.MICROPHONE]
      : [PERMISSIONS.ANDROID.CAMERA, PERMISSIONS.ANDROID.RECORD_AUDIO],
  );
  console.log('check Permission 2', result[PERMISSIONS.ANDROID.RECORD_AUDIO]);
  return result[PERMISSIONS.ANDROID.RECORD_AUDIO];
};
