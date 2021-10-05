/* eslint-disable react-hooks/exhaustive-deps */
// import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Switch,
  ToastAndroid,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {checkPermission} from '../../Helper/PermissionHelper';
import {updateAgentStatus} from '../../API/ApiCalls';

export const ProfileScreen = props => {
  const [isAvailable, setIsAvailable] = useState(true);
  const [permission, setPermission] = useState();
  const showToast = () => {
    ToastAndroid.show(
      'Please allow all the permisions required',
      ToastAndroid.SHORT,
    );
  };
  const UpdateAgentStatusApi = async () => {
    try {
      const JsonLOGINDATA = await AsyncStorage.getItem('LOGIN_DATA');
      const asyncLoginData =
        JsonLOGINDATA != null ? JSON.parse(JsonLOGINDATA) : null;

      await updateAgentStatus(
        asyncLoginData.data.RetailerId,
        asyncLoginData.data.RetailerUserId,
        asyncLoginData.agentSessionID,
        isAvailable ? 'Available' : 'NotAvailable',
      );
    } catch (e) {
      console.log(e);
    }
  };

  const AsyncFunction = async () => {
    const PermissionResult = await checkPermission();
    console.log('Permission in useEffect', PermissionResult);
    setPermission(PermissionResult);
    return PermissionResult;
  };

  const ExtraFunction = async () => {
    const permissionResult = await AsyncFunction();
    console.log('permissionResult', permissionResult);
    if (permissionResult === 'granted') {
      await UpdateAgentStatusApi();
    }
  };
  useEffect(() => {
    ExtraFunction();
  }, [isAvailable]);

  const toggleSwitch = () => {
    setIsAvailable(!isAvailable);
  };

  return (
    <View style={props.isPortrait ? styles.mainitem : styles.mainItemLandScape}>
      {permission === 'granted' ? null : (
        <TouchableOpacity
          style={styles.permissionContainer}
          onPress={ExtraFunction}>
          <Text style={styles.permissionTxt}>Tap to grant permissions</Text>
        </TouchableOpacity>
      )}
      <View style={props.isPortrait ? styles.rowitem : styles.rowItemLandScape}>
        <Text style={styles.profileItem}>Profile</Text>
        <View style={styles.topItem}>
          <View style={styles.avaliableContainer}>
            <Text style={styles.profiletwoItem}>
              {permission === 'granted' && isAvailable
                ? 'Avaliable'
                : 'Not avaliable'}
            </Text>
          </View>
          <TouchableOpacity
            activeOpacity={1}
            onPress={() => {
              permission === 'granted' ? null : showToast();
              // console.log(permission);
              // UpdateAgentStatusApi();
            }}>
            <Switch
              trackColor={{true: '#00ff00', false: '#767577'}}
              thumbColor={isAvailable ? '#f4f3f4' : '#f4f3f4'}
              ios_backgroundColor="#3e3e3e"
              onValueChange={async () => {
                toggleSwitch();
                // console.log('toggle', toggle);
                // UpdateAgentStatusApi2(toggle);
              }}
              // onChange={UpdateAgentStatusApi}
              style={{transform: [{scaleX: 1.3}, {scaleY: 1.3}]}}
              disabled={permission === 'granted' ? false : true}
              value={isAvailable && permission === 'granted' ? true : false}
            />
          </TouchableOpacity>
        </View>
      </View>
      <View
        style={
          props.isPortrait ? styles.middleItem : styles.middleItemsLandScape
        }>
        <View
          style={
            props.isPortrait
              ? styles.secondmiddleitem
              : styles.secondMiddleitemLandScape
          }>
          <Image
            source={require('../../Resources/Images/demoProfile.jpg')}
            style={styles.ImageItem}
          />
          <Text style={{...styles.textcolour, ...{fontWeight: 'bold'}}}>
            John Michaels
          </Text>
        </View>
        <View style={props.isPortrait ? null : styles.detailsLandScape}>
          <View style={styles.thirdmiddleitem}>
            <Text style={styles.textbold}>Location</Text>
            <Text style={styles.textcolour}>
              510, Gulfgate Centre Mall, Houston ,TX 77098
            </Text>
          </View>
          <View style={styles.thirdmiddleitem}>
            <Text style={styles.textbold}>Skills & competencies</Text>
            <Text style={styles.textcolour}>Windows Surface</Text>
            <Text style={styles.textcolour}>HP Laptops</Text>
            <Text style={styles.textcolour}>System processors</Text>
          </View>
          <TouchableOpacity style={styles.button} onPress={props.onPress}>
            <Text style={styles.text}>Logout</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View
        style={
          props.isPortrait ? styles.bottomLogo : styles.bottomLogoLandScape
        }>
        <Image
          source={require('../../Resources/Images/Logo.png')}
          style={styles.BelowImage}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  rowitem: {
    flexDirection: 'row',
    marginVertical: 50,
    paddingBottom: 10,
    justifyContent: 'space-between',
  },
  textcolour: {
    color: '#606060',
    fontWeight: '600',
    lineHeight: 20,
  },
  textbold: {
    fontWeight: 'bold',
  },
  topItem: {
    flexDirection: 'row',
  },
  avaliableContainer: {
    width: 100,
  },
  permissionContainer: {
    // backgroundColor: 'red',
    height: 40,
    // width: '100%',
    position: 'absolute',
    top: 10,
    justifyContent: 'center',
    right: 0,
  },
  permissionTxt: {
    fontSize: 20,
    color: 'red',
  },
  BelowImage: {
    alignSelf: 'center',
    position: 'absolute',
    height: 70,
    width: 60,
  },
  profileItem: {
    paddingRight: 150,
    fontSize: 18,
    color: '#606060',
    fontWeight: 'bold',
  },
  ImageItem: {
    marginBottom: 10,
    width: 90,
    height: 90,
  },
  profiletwoItem: {
    color: '#ABB4BD',
    position: 'relative',
    top: 4,
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    width: '30%',
    height: '10%',
    marginBottom: 50,
    borderWidth: 2,
    borderColor: 'orange',
    backgroundColor: 'white',
  },
  text: {
    fontSize: 12,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.4,
    color: 'orange',
  },
  secondmiddleitem: {
    paddingBottom: 20,
  },
  thirdmiddleitem: {
    paddingBottom: 40,
  },
  middleItem: {
    flexDirection: 'column',
  },
  mainitem: {
    flex: 1,
    // marginLeft: 200,
  },
  bottomLogo: {
    position: 'absolute',
    bottom: 80,
    height: 80,
    width: 80,
    alignSelf: 'center',
  },
  /////////////////////////////////////////////////////////
  mainItemLandScape: {
    // backgroundColor: 'yellow',
    flex: 1,
    width: '80%',
    height: '100%',
    position: 'absolute',
    left: 120,
  },
  rowItemLandScape: {
    // backgroundColor: 'red',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
  },
  middleItemsLandScape: {
    // backgroundColor: 'green',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    width: '80%',
  },
  secondMiddleitemLandScape: {
    // position: 'absolute',
    marginRight: 120,
  },
  detailsLandScape: {
    // backgroundColor: 'red',
    marginTop: 10,
  },
  bottomLogoLandScape: {
    position: 'absolute',
    alignSelf: 'center',
    bottom: 80,
  },
});

// const AsyncPermissionData = async () => {
//   try {
//     const JsonCameraPermission = await AsyncStorage.getItem(
//       'Camera_Permission',
//     );
//     const Camera_Permission =
//       JsonCameraPermission != null ? JSON.parse(JsonCameraPermission) : null;
//     const JsonMicPermission = await AsyncStorage.getItem('Mic_Permission');
//     const Mic_Permission =
//       JsonMicPermission != null ? JSON.parse(JsonMicPermission) : null;

//     setCameraPermission(Camera_Permission);
//     setMicPermission(Mic_Permission);
//     console.log('Camera_Permission', cameraPermission);
//     console.log('Mic_Permission', MicPermission);
//   } catch (e) {
//     console.log(e);
//   }
// };
// console.log('Permissionmnnnnnnnnn', permission);

// };
