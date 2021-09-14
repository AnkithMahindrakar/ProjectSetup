/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Switch,
  Dimensions,
} from 'react-native';
import Orientation from 'react-native-orientation';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export const ProfileScreen = () => {
  const [isEnabled, setIsEnabled] = useState(false);
  const [isPortrait, setIsPortrait] = useState();
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);
  useEffect(() => {
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
    };
    Orientation.addOrientationListener(_orientationDidChange);

    return () => Orientation.removeOrientationListener(_orientationDidChange);
  }, []);
  return (
    <View style={isPortrait ? styles.mainitem : styles.mainItemLandScape}>
      <View style={isPortrait ? styles.rowitem : styles.rowItemLandScape}>
        <Text style={styles.profileItem}>Profile</Text>
        <View style={styles.topItem}>
          <View style={styles.avaliableContainer}>
            <Text style={styles.profiletwoItem}>
              {isEnabled ? 'Avaliable' : 'Not avaliable'}
            </Text>
          </View>
          <Switch
            trackColor={{false: '#767577', true: '#81b0ff'}}
            thumbColor={isEnabled ? '#f4f3f4' : '#f4f3f4'}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleSwitch}
            style={{transform: [{scaleX: 1.3}, {scaleY: 1.3}]}}
            value={isEnabled}
          />
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
            John Michaels
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
          <TouchableOpacity style={styles.button}>
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
