/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState} from 'react';
import NetInfo from '@react-native-community/netinfo';
import {ScaledSheet} from 'react-native-size-matters';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Switch,
  ToastAndroid,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {checkPermission} from '../../Helper/PermissionHelper';
import {updateAgentStatus} from '../../API/ApiCalls';

export const ProfileScreen = ({
  isPortrait,
  LogoutHandler,
  binary,
  networkBanner,
  homePermission,
  toggleFunction,
  isAvailable,
}) => {
  const [permission, setPermission] = useState();
  const [loginData, setLoginData] = useState([]);

  useEffect(() => {
    getAgentData();
  }, []);

  const getAgentData = async () => {
    try {
      const JsonLOGINDATA = await AsyncStorage.getItem('LOGIN_DATA');
      const asyncLoginData =
        JsonLOGINDATA != null ? JSON.parse(JsonLOGINDATA) : null;
      setLoginData(asyncLoginData.data);
      return asyncLoginData;
    } catch (e) {
      console.log(e);
    }
  };
  const showToast = () => {
    ToastAndroid.show(
      'Please allow all the permisions required',
      ToastAndroid.SHORT,
    );
  };

  const UpdateAgentStatusApi = async () => {
    try {
      // const JsonLOGINDATA = await AsyncStorage.getItem('LOGIN_DATA');
      // const asyncLoginData =
      //   JsonLOGINDATA != null ? JSON.parse(JsonLOGINDATA) : null;

      const asyncLoginData2 = await getAgentData();
      // console.log('?>?????>?>?>?>?>?>?>?>', asyncLoginData2);
      // console.log('?>?????>?>?>?>?>?>?>?>', asyncLoginData2.data.RetailerId);
      // console.log(
      //   '?>?????>?>?>?>?>?>?>?>',
      //   asyncLoginData2.data.RetailerUserId,
      // );
      // console.log('?>?????>?>?>?>?>?>?>?>', asyncLoginData2.agentSessionID);
      await updateAgentStatus(
        asyncLoginData2.data.RetailerId,
        asyncLoginData2.data.RetailerUserId,
        asyncLoginData2.agentSessionID,
        isAvailable ? 'NotAvailable' : 'Available',
      );
    } catch (e) {
      console.log(e);
      toggleSwitch();
      Alert.alert('Error', e.message);
    }
  };

  const AsyncFunction = async () => {
    const PermissionResult = await checkPermission();
    // console.log('Permission in useEffect', PermissionResult);
    setPermission(PermissionResult);
    return PermissionResult;
  };

  const ExtraFunction = async () => {
    const permissionResult = await AsyncFunction();
    // console.log('permissionResult', permissionResult);
    if (permissionResult === 'granted') {
      await UpdateAgentStatusApi();
    }
  };

  // const toggleSwitch = () => {
  //   setIsAvailable(prev => !prev);
  //   return isAvailable;
  // };

  return (
    <View style={isPortrait ? styles.mainitem : styles.mainItemLandScape}>
      {networkBanner && (
        <View style={styles.banner}>
          <Text style={styles.bannertext}>
            Please check internet connection...
          </Text>
        </View>
      )}
      {homePermission === 'granted' || permission === 'granted' ? null : (
        <TouchableOpacity
          style={styles.permissionContainer}
          onPress={ExtraFunction}>
          <Text style={styles.permissionTxt}>Tap to grant permissions</Text>
        </TouchableOpacity>
      )}
      <View style={isPortrait ? styles.rowitem : styles.rowItemLandScape}>
        <Text style={styles.profileItem}>Profile</Text>
        <View style={styles.topItem}>
          <View style={styles.avaliableContainer}>
            <Text style={styles.profiletwoItem}>
              {homePermission === 'granted' && isAvailable
                ? 'Avaliable'
                : 'Not avaliable'}
            </Text>
          </View>
          <TouchableOpacity
            activeOpacity={1}
            onPress={() => {
              homePermission === 'granted' ? null : showToast();
            }}>
            <Switch
              trackColor={{true: '#00ff00', false: '#767577'}}
              thumbColor={isAvailable ? '#f4f3f4' : '#f4f3f4'}
              ios_backgroundColor="#3e3e3e"
              onChange={() => {
                toggleFunction();
                ExtraFunction();
              }}
              style={{transform: [{scaleX: 1.3}, {scaleY: 1.3}]}}
              disabled={homePermission === 'granted' ? false : true}
              value={binary && isAvailable ? true : false}
            />
          </TouchableOpacity>
        </View>
      </View>
      <View
        style={isPortrait ? styles.middleItem : styles.middleItemsLandScape}>
        <View
          style={
            isPortrait
              ? styles.secondmiddleitem
              : styles.secondMiddleitemLandScape
          }>
          <Image
            source={require('../../Resources/Images/demoProfile.jpg')}
            style={styles.ImageItem}
          />
          <Text style={{...styles.textcolour, ...{fontWeight: 'bold'}}}>
            {loginData.FirstName} {loginData.LastName}
          </Text>
        </View>
        <View style={isPortrait ? null : styles.detailsLandScape}>
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
          <TouchableOpacity style={styles.button} onPress={LogoutHandler}>
            <Text style={styles.text}>Logout</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={isPortrait ? styles.bottomLogo : styles.bottomLogoLandScape}>
        <Image
          source={require('../../Resources/Images/Logo.png')}
          style={styles.BelowImage}
        />
      </View>
    </View>
  );
};

const styles = ScaledSheet.create({
  rowitem: {
    flexDirection: 'row',
    marginVertical: '40@s',
    paddingBottom: '10@s',
    justifyContent: 'space-between',
  },
  textcolour: {
    color: '#606060',
    fontWeight: '600',
    lineHeight: '20@s',
    fontSize: '13@s',
  },
  textbold: {
    fontWeight: 'bold',
    fontSize: '15@s',
  },
  topItem: {
    flexDirection: 'row',
    // backgroundColor: 'yellow',
  },
  avaliableContainer: {
    // backgroundColor: 'yellow',
    width: '90@s',
  },
  permissionContainer: {
    // backgroundColor: 'red',
    height: '40@s',
    // width: '100%',
    position: 'absolute',
    top: '10@s',
    justifyContent: 'center',
    right: 0,
  },
  permissionTxt: {
    fontSize: '18@s',
    color: 'red',
  },
  BelowImage: {
    // backgroundColor: 'yellow',
    alignSelf: 'center',
    position: 'absolute',
    height: '70@s',
    width: '60@s',
  },
  profileItem: {
    // backgroundColor: 'yellow',
    // paddingRight: '1@s',
    fontSize: '18@s',
    color: '#606060',
    fontWeight: 'bold',
  },
  ImageItem: {
    // backgroundColor: 'yellow',
    marginBottom: '14@s',
    width: '90@s',
    height: '90@s',
  },
  profiletwoItem: {
    color: '#ABB4BD',
    // position: 'relative',
    marginTop: '4@s',
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '20@s',
    width: '30%',
    height: '10%',
    marginBottom: '50@s',
    borderWidth: 2,
    borderColor: 'orange',
    backgroundColor: 'white',
  },
  text: {
    fontSize: '12@s',
    lineHeight: '21@s',
    fontWeight: 'bold',
    letterSpacing: '0.4@s',
    color: 'orange',
  },
  secondmiddleitem: {
    paddingBottom: '20@s',
  },
  thirdmiddleitem: {
    paddingBottom: '40@s',
  },
  middleItem: {
    flexDirection: 'column',
  },
  mainitem: {
    flex: 1,
    // padding: '0@s',
    // backgroundColor: 'teal',
    // marginLeft: 200,
    width: '320@s',
  },
  bottomLogo: {
    position: 'absolute',
    bottom: '40@s',
    height: '80@s',
    width: '80@s',
    alignSelf: 'center',
  },
  bannertext: {
    textAlign: 'left',
    color: 'red',
    fontSize: '18@s',
  },
  bannerbox: {
    color: '#ff8c00',
    width: '50@s',
    height: '100@s',
    alignSelf: 'center',
  },
  banner: {
    position: 'absolute',
    top: '5@s',
    height: '4%',
    marginRight: '50@s',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  /////////////////////////////////////////////////////////
  mainItemLandScape: {
    // backgroundColor: 'yellow',
    flex: 1,
    width: '80%',
    height: '100%',
    position: 'absolute',
    left: '120@s',
  },
  rowItemLandScape: {
    // backgroundColor: 'red',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: '10@s',
  },
  middleItemsLandScape: {
    // backgroundColor: 'green',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    width: '80%',
  },
  secondMiddleitemLandScape: {
    // position: 'absolute',
    marginRight: '120@s',
  },
  detailsLandScape: {
    // backgroundColor: 'red',
    marginTop: '10@s',
  },
  bottomLogoLandScape: {
    position: 'absolute',
    alignSelf: 'center',
    bottom: '80@s',
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
